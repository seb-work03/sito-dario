import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";
import { deleteArticle } from "@/app/admin/actions/articles";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminDashboardPage() {
  await requireAdminPage();
  const allArticles = await db.query.articles.findMany({
    orderBy: desc(articles.updatedAt),
    with: { author: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Articoli</h1>
          <p className="text-sm text-gray-500 mt-0.5">{allArticles.length} articoli totali</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          + Nuovo articolo
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {allArticles.length === 0 && (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">Nessun articolo ancora.</p>
        )}
        {allArticles.map((article, i) => (
          <div
            key={article.id}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i < allArticles.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <span
                className={`mt-0.5 shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  article.status === "published"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {article.status === "published" ? "Pubblicato" : "Bozza"}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {article.author && `${article.author.name} · `}Aggiornato il{" "}
                  {formatDate(article.updatedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <Link
                href={`/admin/articles/${article.id}/edit`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
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
