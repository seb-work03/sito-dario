"use client";

import { useState, useTransition } from "react";
import { createAdminUser, updateAdminPassword, deleteAdminUser } from "@/app/admin/actions/users";

type AdminUserRow = { id: number; username: string; createdAt: Date };

export function UsersManager({ users, currentUsername }: { users: AdminUserRow[]; currentUsername: string }) {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ message: string; warning: boolean } | null>(null);
  const [pending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);

  function handleCreate(formData: FormData) {
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        const result = await createAdminUser(formData);
        (document.getElementById("new-user-form") as HTMLFormElement | null)?.reset();
        setNotice({ message: result.message, warning: !result.emailSent });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Errore imprevisto");
      }
    });
  }

  function handleUpdate(id: number, formData: FormData) {
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await updateAdminPassword(id, formData);
        setEditingId(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Errore imprevisto");
      }
    });
  }

  function handleDelete(id: number, username: string) {
    if (!confirm(`Eliminare l'utente "${username}"?`)) return;
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await deleteAdminUser(id);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Errore imprevisto");
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {notice && (
        <div className={`rounded-md border px-4 py-3 text-sm ${notice.warning ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {notice.message}
        </div>
      )}

      {/* New user */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">Nuovo utente</h2>
        <p className="text-xs text-gray-500 mb-4">
          Crea un nuovo account amministratore. La password deve essere di almeno 8 caratteri.
        </p>
        <form
          id="new-user-form"
          action={handleCreate}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            autoComplete="off"
            className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email destinatario"
            autoComplete="email"
            className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            required
            minLength={8}
            placeholder="Password (min. 8 caratteri)"
            autoComplete="new-password"
            className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 sm:col-span-2"
          >
            Aggiungi
          </button>
        </form>
      </div>

      {/* User list */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">Username</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">Creato</th>
              <th className="text-right px-5 py-3 font-medium text-gray-600 text-xs uppercase tracking-wider">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-3 text-gray-900 font-medium">
                  {u.username}
                  {u.username === currentUsername && (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-gray-400">(tu)</span>
                  )}
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">
                  {new Date(u.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="px-5 py-3">
                  {editingId === u.id ? (
                    <form
                      action={(fd) => handleUpdate(u.id, fd)}
                      className="flex items-center gap-2 justify-end"
                    >
                      <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        autoFocus
                        placeholder="Nuova password"
                        className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-900 focus:outline-none focus:border-gray-500"
                      />
                      <button
                        type="submit"
                        disabled={pending}
                        className="rounded bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-gray-700 disabled:opacity-50"
                      >
                        Salva
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="text-xs text-gray-400 hover:text-gray-700"
                      >
                        Annulla
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingId(u.id)}
                        className="text-xs text-gray-500 hover:text-gray-900"
                      >
                        Cambia password
                      </button>
                      {u.username !== currentUsername && (
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id, u.username)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Elimina
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
