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
    <form
      method="POST"
      action="/api/auth/signin/resend"
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
      <input type="hidden" name="callbackUrl" value="/admin" />
      <input
        type="email"
        name="email"
        required
        placeholder="tu@esempio.it"
        className="rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-paper-50 placeholder:text-paper-500 focus:border-celeste-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!csrfToken}
        className="rounded-md bg-celeste-500 px-3 py-2 font-medium text-ink-950 hover:bg-celeste-400 disabled:opacity-50"
      >
        Invia link di accesso
      </button>
    </form>
  );
}
