"use client";

import { useTransition } from "react";

export function DeleteEntityButton({
  id,
  action,
  confirmMessage = "Eliminare?",
}: {
  id: number;
  action: (id: number) => void;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(() => action(id));
        }
      }}
      className="text-red-400 hover:underline disabled:opacity-50"
    >
      Elimina
    </button>
  );
}
