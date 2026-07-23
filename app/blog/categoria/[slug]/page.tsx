import { and, desc, eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ArticleListItem } from "@/components/blog/ArticleListItem";
import { db } from "@/lib/db";
import { articleCategories, articles, categories } from "@/lib/db/schema";

export default async function CategoryArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category] = await db.select().from(categories).where(eq(categories.slug, slug));

  if (!category) {
    notFound();
  }

  const matches = await db
    .select({ id: articles.id })
    .from(articleCategories)
    .innerJoin(articles, eq(articleCategories.articleId, articles.id))
    .where(and(eq(articleCategories.categoryId, category.id), eq(articles.status, "published")));

  const articleIds = matches.map((m) => m.id);

  const matchingArticles = articleIds.length
    ? await db.query.articles.findMany({
        where: inArray(articles.id, articleIds),
        orderBy: desc(articles.publishedAt),
        with: {
          coverMedia: true,
          author: true,
          articleCategories: { with: { category: true } },
        },
      })
    : [];

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-wide text-paper-400">Categoria</p>
        <h1 className="mb-12 mt-1 text-4xl font-medium text-paper-50">{category.name}</h1>

        {matchingArticles.length === 0 && (
          <p className="text-paper-400">Nessun articolo in questa categoria.</p>
        )}

        <div className="flex flex-col gap-10">
          {matchingArticles.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
