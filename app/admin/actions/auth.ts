"use server";

import { signIn, signOut } from "@/auth";
import { ensureBootstrapAdmin } from "@/lib/admin-users";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import {
  getClientIp,
  getRateLimitStatus,
  loginRateLimitKeys,
  signClientIp,
} from "@/lib/security-rate-limit";

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  await ensureBootstrapAdmin();

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const requestHeaders = await headers();
  const ipAddress = getClientIp(requestHeaders);
  const rateLimitKeys = loginRateLimitKeys(username, ipAddress);
  const currentLimit = await getRateLimitStatus(rateLimitKeys);

  if (currentLimit.blocked) {
    return { error: "Troppi tentativi. Riprova tra 15 minuti." };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      ipAddress,
      ipSignature: signClientIp(ipAddress),
      redirectTo: "/admin",
    });
    return { error: undefined };
  } catch (err) {
    if (err instanceof AuthError) {
      const limitAfterAttempt = await getRateLimitStatus(rateLimitKeys);
      if (limitAfterAttempt.blocked) {
        return { error: "Troppi tentativi. Riprova tra 15 minuti." };
      }
      return { error: "Credenziali non valide." };
    }
    throw err;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}
