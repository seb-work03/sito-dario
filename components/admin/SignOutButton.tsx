"use client";

import { logoutAction } from "@/app/admin/actions/auth";

export function SignOutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="text-xs text-gray-400 hover:text-gray-700">
        Esci
      </button>
    </form>
  );
}
