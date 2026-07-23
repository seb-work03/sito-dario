import Link from "next/link";
import { deleteAuthor } from "@/app/admin/actions/authors";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { db } from "@/lib/db";

export default async function AuthorsPage() {
  const allAuthors = await db.query.authors.findMany({ with: { avatar: true } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Autori</h1>
        <Link
          href="/admin/authors/new"
          className="rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
        >
          Nuovo autore
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-ink-700 rounded-lg border border-ink-700">
        {allAuthors.length === 0 && (
          <p className="px-4 py-6 text-sm text-paper-400">Nessun autore ancora.</p>
        )}
        {allAuthors.map((author) => (
          <div key={author.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium text-paper-50">{author.name}</p>
              <p className="text-xs text-paper-400">/{author.slug}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/authors/${author.id}/edit`} className="text-celeste-400 hover:underline">
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
