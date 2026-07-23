import { and, desc, eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ArticleListItem } from "@/components/blog/ArticleListItem";
import { db } from "@/lib/db";
import { articleTags, articles, tags } from "@/lib/db/schema";

export default async function TagArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [tag] = await db.select().from(tags).where(eq(tags.slug, slug));

  if (!tag) {
    notFound();
  }

  const matches = await db
    .select({ id: articles.id })
    .from(articleTags)
    .innerJoin(articles, eq(articleTags.articleId, articles.id))
    .where(and(eq(articleTags.tagId, tag.id), eq(articles.status, "published")));

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
        <p className="text-xs uppercase tracking-wide text-paper-400">Tag</p>
        <h1 className="mb-12 mt-1 text-4xl font-medium text-paper-50">#{tag.name}</h1>

        {matchingArticles.length === 0 && (
          <p className="text-paper-400">Nessun articolo con questo tag.</p>
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
