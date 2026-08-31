import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

let schemaPromise: Promise<void> | null = null;

/**
 * Zero-downtime security migration for the existing Neon database.
 * It is idempotent and cached per server instance, so a deploy can safely run
 * before a manual `drizzle-kit push` without exposing or breaking the admin.
 */
export function ensureSecuritySchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await db.execute(sql`
        ALTER TABLE admin_user
        ADD COLUMN IF NOT EXISTS session_version integer NOT NULL DEFAULT 0
      `);
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS security_rate_limit (
          key text PRIMARY KEY,
          attempt_count integer NOT NULL DEFAULT 0,
          window_started_at timestamptz NOT NULL DEFAULT now(),
          blocked_until timestamptz,
          updated_at timestamptz NOT NULL DEFAULT now()
        )
      `);
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }

  return schemaPromise;
}
