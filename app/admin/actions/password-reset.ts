"use server";

import { createHash, randomBytes } from "node:crypto";
import { and, eq, gt, isNull, lt, or, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { hashPassword, normalizeUsername } from "@/lib/admin-users";
import { db } from "@/lib/db";
import { adminPasswordResetTokens, adminUsers } from "@/lib/db/schema";
import { sendPasswordResetEmail } from "@/lib/email";
import {
  getClientIp,
  getRateLimitStatus,
  PASSWORD_RESET_RATE_LIMIT,
  passwordResetRateLimitKeys,
  recordRateLimitFailure,
} from "@/lib/security-rate-limit";
import { ensureSecuritySchema } from "@/lib/security-schema";

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;
const GENERIC_REQUEST_MESSAGE =
  "Se i dati corrispondono a un account con email di recupero, riceverai un link valido per 30 minuti.";

export type PasswordResetRequestState = {
  submitted?: boolean;
  message?: string;
  error?: string;
};

export type PasswordResetState = {
  success?: boolean;
  error?: string;
};

function tokenDigest(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(
  _previous: PasswordResetRequestState,
  formData: FormData,
): Promise<PasswordResetRequestState> {
  const identifier = normalizeUsername(String(formData.get("identifier") ?? "")).slice(0, 254);
  if (!identifier) return { error: "Inserisci username o email." };

  const requestHeaders = await headers();
  const keys = passwordResetRateLimitKeys(identifier, getClientIp(requestHeaders));

  try {
    const currentLimit = await getRateLimitStatus(keys);
    if (currentLimit.blocked) {
      return { submitted: true, message: GENERIC_REQUEST_MESSAGE };
    }

    // A request counts regardless of whether the account exists, preventing
    // repeated email delivery and avoiding account-enumeration differences.
    await recordRateLimitFailure(keys, PASSWORD_RESET_RATE_LIMIT);
    await db
      .delete(adminPasswordResetTokens)
      .where(lt(adminPasswordResetTokens.expiresAt, new Date()));

    const [user] = await db
      .select({ id: adminUsers.id, username: adminUsers.username, email: adminUsers.email })
      .from(adminUsers)
      .where(or(eq(adminUsers.username, identifier), eq(adminUsers.email, identifier)))
      .limit(1);

    if (user?.email) {
      const token = randomBytes(32).toString("base64url");
      const tokenHash = tokenDigest(token);

      await db.delete(adminPasswordResetTokens).where(eq(adminPasswordResetTokens.userId, user.id));
      await db.insert(adminPasswordResetTokens).values({
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      });

      const delivery = await sendPasswordResetEmail({
        email: user.email,
        username: user.username,
        token,
      });
      if (!delivery.sent) {
        await db
          .delete(adminPasswordResetTokens)
          .where(eq(adminPasswordResetTokens.tokenHash, tokenHash));
        console.error("Password reset email not delivered:", delivery.reason, delivery.message);
      }
    }
  } catch (error) {
    // The response deliberately remains identical for existing and unknown
    // accounts. Operational details stay in server logs.
    console.error("Password reset request failed:", error);
  }

  return { submitted: true, message: GENERIC_REQUEST_MESSAGE };
}

export async function resetPassword(
  _previous: PasswordResetState,
  formData: FormData,
): Promise<PasswordResetState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (!token || token.length > 256) {
    return { error: "Il link non è valido o è scaduto." };
  }
  if (password.length < 8) {
    return { error: "La password deve contenere almeno 8 caratteri." };
  }
  if (password !== confirmation) {
    return { error: "Le due password non coincidono." };
  }

  try {
    await ensureSecuritySchema();
    const digest = tokenDigest(token);
    const [validToken] = await db
      .select({ userId: adminPasswordResetTokens.userId })
      .from(adminPasswordResetTokens)
      .where(
        and(
          eq(adminPasswordResetTokens.tokenHash, digest),
          isNull(adminPasswordResetTokens.usedAt),
          gt(adminPasswordResetTokens.expiresAt, new Date()),
        ),
      )
      .limit(1);

    if (!validToken) return { error: "Il link non è valido o è scaduto." };

    const passwordHash = await hashPassword(password);

    // Claim the token atomically before changing the password, so two
    // simultaneous submissions cannot reuse the same link.
    const [claimed] = await db
      .update(adminPasswordResetTokens)
      .set({ usedAt: new Date() })
      .where(
        and(
          eq(adminPasswordResetTokens.tokenHash, digest),
          isNull(adminPasswordResetTokens.usedAt),
          gt(adminPasswordResetTokens.expiresAt, new Date()),
        ),
      )
      .returning({ userId: adminPasswordResetTokens.userId });

    if (!claimed) return { error: "Il link non è valido o è scaduto." };

    const updated = await db
      .update(adminUsers)
      .set({
        passwordHash,
        sessionVersion: sql`${adminUsers.sessionVersion} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, claimed.userId))
      .returning({ id: adminUsers.id });

    if (updated.length === 0) return { error: "Il link non è valido o è scaduto." };

    // Invalidate every outstanding link for the account. Incrementing
    // sessionVersion above also revokes all sessions created before the reset.
    await db
      .delete(adminPasswordResetTokens)
      .where(eq(adminPasswordResetTokens.userId, claimed.userId));

    return { success: true };
  } catch (error) {
    console.error("Password reset failed:", error);
    return { error: "Non è stato possibile aggiornare la password. Riprova." };
  }
}
