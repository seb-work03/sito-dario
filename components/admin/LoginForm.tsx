"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: undefined });

  return (
    <form action={action} className="flex flex-col gap-3">
      <input
        type="text"
        name="username"
        autoComplete="username"
        required
        placeholder="Username"
        className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
        placeholder="Password"
        className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
      >
        {pending ? "Accesso in corso…" : "Accedi"}
      </button>
      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
