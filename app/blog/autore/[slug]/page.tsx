import Image from "next/image";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ArticleListItem } from "@/components/blog/ArticleListItem";
import { db } from "@/lib/db";
import { articles, authors } from "@/lib/db/schema";

export default async function AuthorArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await db.query.authors.findFirst({
    where: eq(authors.slug, slug),
    with: { avatar: true },
  });

  if (!author) {
    notFound();
  }

  const matchingArticles = await db.query.articles.findMany({
    where: eq(articles.authorId, author.id),
    orderBy: desc(articles.publishedAt),
    with: {
      coverMedia: true,
      author: true,
      articleCategories: { with: { category: true } },
    },
  });

  const publishedArticles = matchingArticles.filter((a) => a.status === "published");

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-12 flex items-center gap-4">
          {author.avatar && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image src={author.avatar.url} alt="" fill className="object-cover" unoptimized />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-medium text-paper-50">{author.name}</h1>
            {author.bio && <p className="mt-1 text-paper-300">{author.bio}</p>}
          </div>
        </div>

        {publishedArticles.length === 0 && (
          <p className="text-paper-400">Nessun articolo pubblicato da questo autore.</p>
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
