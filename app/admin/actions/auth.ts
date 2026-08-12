"use server";

import { signIn, signOut } from "@/auth";
import { ensureBootstrapAdmin } from "@/lib/admin-users";
import { AuthError } from "next-auth";

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  await ensureBootstrapAdmin();

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/admin",
    });
    return { error: undefined };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Credenziali non valide." };
    }
    throw err;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}
