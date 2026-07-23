import Image from "next/image";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article] = await db.select().from(articles).where(eq(articles.slug, slug));

  return {
    title: article ? `${article.title} — Dario Tana` : "Articolo non trovato",
    description: article?.excerpt ?? undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article] = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.published, true)));

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-24">
        <p className="text-xs text-paper-400">
          {article.publishedAt ? formatDate(article.publishedAt) : ""}
        </p>
        <h1 className="mb-6 mt-2 text-4xl font-medium text-paper-50">{article.title}</h1>

        {article.coverImageUrl && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={article.coverImageUrl}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="rich-text">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
