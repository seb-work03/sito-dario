import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { securityRateLimits } from "@/lib/db/schema";
import { ensureSecuritySchema } from "@/lib/security-schema";

export type RateLimitPolicy = {
  maxAttempts: number;
  windowSeconds: number;
  blockSeconds: number;
};

export type RateLimitStatus = {
  blocked: boolean;
  retryAfterSeconds: number;
};

export const LOGIN_RATE_LIMIT: RateLimitPolicy = {
  maxAttempts: 5,
  windowSeconds: 15 * 60,
  blockSeconds: 15 * 60,
};

export const CONTACT_RATE_LIMIT: RateLimitPolicy = {
  maxAttempts: 5,
  windowSeconds: 60 * 60,
  blockSeconds: 60 * 60,
};

function bucket(namespace: string, value: string): string {
  const digest = createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
  return `${namespace}:${digest}`;
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (headers.get("cf-connecting-ip") || forwarded || headers.get("x-real-ip") || "unknown")
    .slice(0, 128);
}

export function signClientIp(ip: string): string {
  const secret = process.env.AUTH_SECRET ?? "";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export function verifySignedClientIp(ip: string, signature: string): boolean {
  if (!process.env.AUTH_SECRET || !signature) return false;
  const expected = signClientIp(ip);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(providedBuffer, expectedBuffer);
}

export function loginRateLimitKeys(username: string, ip: string): string[] {
  return [bucket("login-ip", ip), bucket("login-user", username || "empty")];
}

export function contactRateLimitKeys(email: string, ip: string): string[] {
  return [bucket("contact-ip", ip), bucket("contact-email", email || "empty")];
}

export async function getRateLimitStatus(keys: string[]): Promise<RateLimitStatus> {
  await ensureSecuritySchema();
  const rows = await db
    .select({ blockedUntil: securityRateLimits.blockedUntil })
    .from(securityRateLimits)
    .where(inArray(securityRateLimits.key, keys));

  const now = Date.now();
  const latestBlock = rows.reduce((latest, row) => {
    const value = row.blockedUntil?.getTime() ?? 0;
    return value > latest ? value : latest;
  }, 0);

  return {
    blocked: latestBlock > now,
    retryAfterSeconds: latestBlock > now ? Math.max(1, Math.ceil((latestBlock - now) / 1000)) : 0,
  };
}

export async function recordRateLimitFailure(
  keys: string[],
  policy: RateLimitPolicy,
): Promise<RateLimitStatus> {
  await ensureSecuritySchema();
  let latestBlock = 0;

  for (const key of keys) {
    const reset = sql<boolean>`(
      (${securityRateLimits.blockedUntil} IS NOT NULL AND ${securityRateLimits.blockedUntil} <= now())
      OR ${securityRateLimits.windowStartedAt} <= now() - make_interval(secs => ${policy.windowSeconds})
    )`;
    const [row] = await db
      .insert(securityRateLimits)
      .values({
        key,
        attemptCount: 1,
        windowStartedAt: new Date(),
        blockedUntil: policy.maxAttempts <= 1
          ? new Date(Date.now() + policy.blockSeconds * 1000)
          : null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: securityRateLimits.key,
        set: {
          attemptCount: sql`CASE WHEN ${reset} THEN 1 ELSE ${securityRateLimits.attemptCount} + 1 END`,
          windowStartedAt: sql`CASE WHEN ${reset} THEN now() ELSE ${securityRateLimits.windowStartedAt} END`,
          blockedUntil: sql`CASE
            WHEN ${reset} THEN NULL
            WHEN ${securityRateLimits.attemptCount} + 1 >= ${policy.maxAttempts}
              THEN now() + make_interval(secs => ${policy.blockSeconds})
            ELSE NULL
          END`,
          updatedAt: sql`now()`,
        },
      })
      .returning({ blockedUntil: securityRateLimits.blockedUntil });

    latestBlock = Math.max(latestBlock, row?.blockedUntil?.getTime() ?? 0);
  }

  const now = Date.now();
  return {
    blocked: latestBlock > now,
    retryAfterSeconds: latestBlock > now ? Math.max(1, Math.ceil((latestBlock - now) / 1000)) : 0,
  };
}

export async function clearRateLimits(keys: string[]): Promise<void> {
  await ensureSecuritySchema();
  await db.delete(securityRateLimits).where(inArray(securityRateLimits.key, keys));
}
