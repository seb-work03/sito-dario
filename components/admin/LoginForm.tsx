"use client";

import { useEffect, useState } from "react";

export function LoginForm() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  return (
    <form method="POST" action="/api/auth/signin/resend" className="flex flex-col gap-3">
      <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
      <input type="hidden" name="callbackUrl" value="/admin" />
      <input
        type="email"
        name="email"
        required
        placeholder="tu@esempio.it"
        className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!csrfToken}
        className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
      >
        Invia link di accesso
      </button>
    </form>
  );
}
