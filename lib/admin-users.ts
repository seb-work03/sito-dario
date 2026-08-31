import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { ensureSecuritySchema } from "@/lib/security-schema";

const BCRYPT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

/**
 * Ensures at least one admin user exists. If the `admin_user` table is empty,
 * a bootstrap user is created using `ADMIN_BOOTSTRAP_USERNAME` and
 * `ADMIN_BOOTSTRAP_PASSWORD` env vars. Safe to call on every request — only
 * touches the DB when the table is empty.
 */
export async function ensureBootstrapAdmin(): Promise<{ created: boolean; username?: string }> {
  await ensureSecuritySchema();
  const [existing] = await db.select({ id: adminUsers.id }).from(adminUsers).limit(1);
  if (existing) return { created: false };

  const username = normalizeUsername(process.env.ADMIN_BOOTSTRAP_USERNAME ?? "");
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "";
  const email = normalizeUsername(process.env.ADMIN_BOOTSTRAP_EMAIL ?? "") || null;
  if (!username || password.length < 8) return { created: false };

  const passwordHash = await hashPassword(password);
  await db.insert(adminUsers).values({ username, email, passwordHash });
  return { created: true, username };
}
