import Link from "next/link";
import { deleteAuthor } from "@/app/admin/actions/authors";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { db } from "@/lib/db";
import { requireAdminPage } from "@/lib/admin";

export default async function AuthorsPage() {
  await requireAdminPage();
  const allAuthors = await db.query.authors.findMany({ with: { avatar: true } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Autori</h1>
          <p className="text-sm text-gray-500 mt-0.5">{allAuthors.length} autori totali</p>
        </div>
        <Link
          href="/admin/authors/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          + Nuovo autore
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {allAuthors.length === 0 && (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">Nessun autore ancora.</p>
        )}
        {allAuthors.map((author, i) => (
          <div
            key={author.id}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i < allAuthors.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{author.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">/{author.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/authors/${author.id}/edit`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Modifica
              </Link>
              <DeleteEntityButton
                id={author.id}
                action={deleteAuthor}
                confirmMessage="Eliminare questo autore? Gli articoli collegati resteranno senza autore."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
