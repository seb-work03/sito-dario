import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";
import { deleteArticle } from "@/app/admin/actions/articles";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";

export default async function AdminDashboardPage() {
  const allArticles = await db.query.articles.findMany({
    orderBy: desc(articles.updatedAt),
    with: { author: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Articoli del blog</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400"
        >
          Nuovo articolo
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-ink-700 rounded-lg border border-ink-700">
        {allArticles.length === 0 && (
          <p className="px-4 py-6 text-sm text-paper-400">Nessun articolo ancora.</p>
        )}
        {allArticles.map((article) => (
          <div key={article.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium text-paper-50">{article.title}</p>
              <p className="text-xs text-paper-400">
                {article.status === "published" ? "Pubblicato" : "Bozza"}
                {article.author && ` · ${article.author.name}`} · Aggiornato il{" "}
                {formatDate(article.updatedAt)}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/articles/${article.id}/edit`} className="text-celeste-400 hover:underline">
                Modifica
              </Link>
              <DeleteEntityButton
                id={article.id}
                action={deleteArticle}
                confirmMessage="Eliminare questo articolo?"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
