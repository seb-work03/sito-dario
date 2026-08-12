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
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Categorie</h1>
          <p className="text-sm text-gray-500 mt-0.5">{allCategories.length} categorie totali</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          + Nuova categoria
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {allCategories.length === 0 && (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">Nessuna categoria ancora.</p>
        )}
        {allCategories.map((cat, i) => (
          <div
            key={cat.id}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i < allCategories.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {cat.parentId && <span className="text-gray-400">— </span>}
                {cat.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                /{cat.slug}
                {cat.parentId && byId.get(cat.parentId) && (
                  <> · sotto {byId.get(cat.parentId)!.name}</>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/categories/${cat.id}/edit`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
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
