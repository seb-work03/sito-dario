import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default async function AdminDashboardPage() {
  const allArticles = await db.select().from(articles).orderBy(desc(articles.updatedAt));

  return (
    <div className="flex flex-col gap-10">
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
                {article.published ? "Pubblicato" : "Bozza"} · Aggiornato il{" "}
                {formatDate(article.updatedAt)}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/articles/${article.id}/edit`} className="text-celeste-400 hover:underline">
                Modifica
              </Link>
              <DeleteArticleButton id={article.id} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-ink-700 p-4">
        <h2 className="mb-3 text-sm font-medium text-paper-200">
          Carica un&apos;immagine (per usarla nel testo di un articolo)
        </h2>
        <ImageUploader label="Immagine" />
      </div>
    </div>
  );
}
