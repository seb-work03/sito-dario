"use server";

import { eq, count, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { hashPassword, normalizeUsername } from "@/lib/admin-users";
import { sendAdminAccountEmail } from "@/lib/email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createAdminUser(formData: FormData) {
  await requireAdmin();

  const username = normalizeUsername(String(formData.get("username") ?? ""));
  const password = String(formData.get("password") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!username || password.length < 8) {
    throw new Error("Username obbligatorio e password minimo 8 caratteri.");
  }
  if (!EMAIL_PATTERN.test(email)) throw new Error("Inserisci un indirizzo email valido.");

  const existing = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Username già esistente.");
  }

  const passwordHash = await hashPassword(password);
  await db.insert(adminUsers).values({ username, passwordHash });
  revalidatePath("/admin/users");

  const emailResult = await sendAdminAccountEmail({ email, username });
  return {
    emailSent: emailResult.sent,
    message: emailResult.sent
      ? `Utente creato. Email inviata a ${email}.`
      : `Utente creato, ma l'email non è stata inviata: ${emailResult.message}`,
  };
}

export async function updateAdminPassword(id: number, formData: FormData) {
  await requireAdmin();
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) throw new Error("Password minimo 8 caratteri.");

  const passwordHash = await hashPassword(password);
  await db
    .update(adminUsers)
    .set({
      passwordHash,
      sessionVersion: sql`${adminUsers.sessionVersion} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(adminUsers.id, id));
  revalidatePath("/admin/users");
}

export async function deleteAdminUser(id: number) {
  const session = await requireAdmin();

  if (Number(session.user.id) === id) {
    throw new Error("Non puoi eliminare l'account con cui hai effettuato l'accesso.");
  }

  const [{ total }] = await db.select({ total: count() }).from(adminUsers);
  if (total <= 1) {
    throw new Error("Impossibile eliminare l'ultimo utente admin.");
  }

  await db.delete(adminUsers).where(eq(adminUsers.id, id));
  revalidatePath("/admin/users");
}
