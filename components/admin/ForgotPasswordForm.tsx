"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  requestPasswordReset,
  type PasswordResetRequestState,
} from "@/app/admin/actions/password-reset";

const initialState: PasswordResetRequestState = {};

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);

  if (state.submitted) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
          {state.message}
        </div>
        <p className="text-xs leading-5 text-gray-500">
          Controlla anche la cartella spam. Per sicurezza non indichiamo se l’account è presente.
        </p>
        <Link href="/admin/login" className="text-sm font-medium text-gray-700 hover:text-gray-950">
          Torna all’accesso
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-3">
      <label htmlFor="identifier" className="text-sm font-medium text-gray-700">
        Username o email di recupero
      </label>
      <input
        id="identifier"
        type="text"
        name="identifier"
        autoComplete="username"
        required
        maxLength={254}
        placeholder="Username o email"
        className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
      >
        {pending ? "Invio in corso…" : "Invia il link"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <Link href="/admin/login" className="mt-1 text-sm text-gray-500 hover:text-gray-900">
        Torna all’accesso
      </Link>
    </form>
  );
}
