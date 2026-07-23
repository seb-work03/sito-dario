"use client";

import { useTransition } from "react";
import { deleteArticle } from "@/app/admin/actions";

export function DeleteArticleButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("Eliminare questo articolo?")) {
          startTransition(() => deleteArticle(id));
        }
      }}
      className="text-red-400 hover:underline disabled:opacity-50"
    >
      Elimina
    </button>
  );
}
