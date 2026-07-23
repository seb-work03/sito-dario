import Image from "next/image";
import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

async function getArticle(slug: string) {
  return db.query.articles.findFirst({
    where: and(eq(articles.slug, slug), eq(articles.status, "published")),
    with: {
      coverMedia: true,
      author: { with: { avatar: true } },
      articleCategories: { with: { category: true } },
      articleTags: { with: { tag: true } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article ? (article.seoTitle ?? `${article.title} — Dario Tana`) : "Articolo non trovato",
    description: article?.seoDescription ?? article?.excerpt ?? undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-24">
        <p className="flex flex-wrap gap-x-2 text-xs text-paper-400">
          {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
          {article.articleCategories.map((ac) => (
            <Link
              key={ac.category.id}
              href={`/blog/categoria/${ac.category.slug}`}
              className="hover:text-celeste-400"
            >
              · {ac.category.name}
            </Link>
          ))}
        </p>
        <h1 className="mb-6 mt-2 text-4xl font-medium text-paper-50">{article.title}</h1>

        {article.coverMedia && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={article.coverMedia.url}
              alt={article.coverMedia.altText ?? ""}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="rich-text">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {article.articleTags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {article.articleTags.map((at) => (
              <Link
                key={at.tag.id}
                href={`/blog/tag/${at.tag.slug}`}
                className="rounded-full border border-ink-600 px-3 py-1 text-xs text-paper-300 hover:border-celeste-500 hover:text-celeste-400"
              >
                #{at.tag.name}
              </Link>
            ))}
          </div>
        )}

        {article.author && (
          <Link
            href={`/blog/autore/${article.author.slug}`}
            className="mt-12 flex items-center gap-3 rounded-md border border-ink-700 p-4 hover:border-ink-600"
          >
            {article.author.avatar && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={article.author.avatar.url}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div>
              <p className="text-sm text-paper-400">Scritto da</p>
              <p className="font-medium text-paper-50">{article.author.name}</p>
            </div>
          </Link>
        )}
      </main>
      <Footer />
    </div>
  );
}
