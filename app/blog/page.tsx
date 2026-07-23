import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ArticleListItem } from "@/components/blog/ArticleListItem";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Blog — Dario Tana",
};

export default async function BlogPage() {
  const publishedArticles = await db.query.articles.findMany({
    where: eq(articles.status, "published"),
    orderBy: desc(articles.publishedAt),
    with: {
      coverMedia: true,
      author: true,
      articleCategories: { with: { category: true } },
    },
  });

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-12 text-4xl font-medium text-paper-50">Blog</h1>

        {publishedArticles.length === 0 && (
          <p className="text-paper-400">Nessun articolo pubblicato ancora.</p>
        )}

        <div className="flex flex-col gap-10">
          {publishedArticles.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
