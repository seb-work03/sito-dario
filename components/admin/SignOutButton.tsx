"use client";

import { useEffect, useState } from "react";

export function SignOutButton() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  return (
    <form method="POST" action="/api/auth/signout">
      <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
      <input type="hidden" name="callbackUrl" value="/admin/login" />
      <button
        type="submit"
        disabled={!csrfToken}
        className="text-sm text-paper-400 hover:text-paper-200 disabled:opacity-50"
      >
        Esci
      </button>
    </form>
  );
}
