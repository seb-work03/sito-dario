import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { authConfig } from "@/auth.config";
import { ensureSecuritySchema } from "@/lib/security-schema";
import {
  clearRateLimits,
  getClientIp,
  getRateLimitStatus,
  LOGIN_RATE_LIMIT,
  loginRateLimitKeys,
  recordRateLimitFailure,
  verifySignedClientIp,
} from "@/lib/security-rate-limit";

const DUMMY_PASSWORD_HASH = "$2b$10$TFfdDulQXupAziU6Lm.sh.geiR.SLzYMYTNi6fX76KUcwKTs6g/Y6";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        ipAddress: { label: "IP", type: "hidden" },
        ipSignature: { label: "IP signature", type: "hidden" },
      },
      async authorize(credentials, request) {
        const username = String(credentials?.username ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        const claimedIp = String(credentials?.ipAddress ?? "");
        const ipSignature = String(credentials?.ipSignature ?? "");
        const ipAddress = verifySignedClientIp(claimedIp, ipSignature)
          ? claimedIp
          : getClientIp(request.headers);
        if (!username || !password) return null;

        const rateLimitKeys = loginRateLimitKeys(username, ipAddress);
        const currentLimit = await getRateLimitStatus(rateLimitKeys);
        if (currentLimit.blocked) return null;

        await ensureSecuritySchema();

        const [user] = await db
          .select({
            id: adminUsers.id,
            username: adminUsers.username,
            passwordHash: adminUsers.passwordHash,
            sessionVersion: adminUsers.sessionVersion,
          })
          .from(adminUsers)
          .where(eq(adminUsers.username, username))
          .limit(1);

        if (!user) {
          // Equalize the expensive password check to reduce username enumeration.
          await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
          await recordRateLimitFailure(rateLimitKeys, LOGIN_RATE_LIMIT);
          return null;
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          await recordRateLimitFailure(rateLimitKeys, LOGIN_RATE_LIMIT);
          return null;
        }

        await clearRateLimits(rateLimitKeys);

        return {
          id: String(user.id),
          name: user.username,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
  ],
});
