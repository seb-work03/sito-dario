import { auth } from "@/auth";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { ensureSecuritySchema } from "@/lib/security-schema";

export class UnauthorizedAdminError extends Error {
  constructor() {
    super("Non autorizzato");
    this.name = "UnauthorizedAdminError";
  }
}

export async function requireAdmin() {
  const session = await auth();
  const id = Number(session?.user?.id);
  const sessionVersion = Number(session?.user?.sessionVersion);

  if (!session?.user || !Number.isInteger(id) || !Number.isInteger(sessionVersion)) {
    throw new UnauthorizedAdminError();
  }

  await ensureSecuritySchema();
  const [activeUser] = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(and(eq(adminUsers.id, id), eq(adminUsers.sessionVersion, sessionVersion)))
    .limit(1);

  if (!activeUser) throw new UnauthorizedAdminError();
  return session;
}

export async function requireAdminPage() {
  try {
    return await requireAdmin();
  } catch (error) {
    if (error instanceof UnauthorizedAdminError) redirect("/admin/login");
    throw error;
  }
}
