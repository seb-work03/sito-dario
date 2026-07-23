import Link from "next/link";
import { deleteCategory } from "@/app/admin/actions/categories";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export default async function CategoriesPage() {
  const allCategories = await db.select().from(categories);
  const byId = new Map(allCategories.map((c) => [c.id, c]));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Categorie</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
        >
          Nuova categoria
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-ink-700 rounded-lg border border-ink-700">
        {allCategories.length === 0 && (
          <p className="px-4 py-6 text-sm text-paper-400">Nessuna categoria ancora.</p>
        )}
        {allCategories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium text-paper-50">{cat.name}</p>
              <p className="text-xs text-paper-400">
                /{cat.slug}
                {cat.parentId && byId.get(cat.parentId) && ` · sotto ${byId.get(cat.parentId)!.name}`}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/categories/${cat.id}/edit`} className="text-celeste-400 hover:underline">
                Modifica
              </Link>
              <DeleteEntityButton
                id={cat.id}
                action={deleteCategory}
                confirmMessage="Eliminare questa categoria? Gli articoli collegati resteranno senza categoria."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
