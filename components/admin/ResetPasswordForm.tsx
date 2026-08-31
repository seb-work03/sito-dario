"use client";

import Link from "next/link";
import { useActionState } from "react";
import { resetPassword, type PasswordResetState } from "@/app/admin/actions/password-reset";

const initialState: PasswordResetState = {};

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
          Password aggiornata. Tutte le sessioni precedenti sono state disconnesse.
        </div>
        <Link
          href="/admin/login"
          className="rounded bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
        >
          Accedi con la nuova password
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="token" value={token} />
      <label htmlFor="password" className="text-sm font-medium text-gray-700">
        Nuova password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        autoComplete="new-password"
        minLength={8}
        required
        placeholder="Almeno 8 caratteri"
        className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
      />
      <label htmlFor="confirmation" className="text-sm font-medium text-gray-700">
        Conferma password
      </label>
      <input
        id="confirmation"
        type="password"
        name="confirmation"
        autoComplete="new-password"
        minLength={8}
        required
        placeholder="Ripeti la password"
        className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
      >
        {pending ? "Aggiornamento…" : "Aggiorna password"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
