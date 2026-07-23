import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Dario Tana",
};

export default async function BlogPage() {
  const publishedArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.publishedAt));

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
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
            >
              {article.coverImageUrl && (
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-40">
                  <Image
                    src={article.coverImageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div>
                <p className="text-xs text-paper-400">
                  {article.publishedAt ? formatDate(article.publishedAt) : ""}
                </p>
                <h2 className="text-xl font-medium text-paper-50">{article.title}</h2>
                {article.excerpt && (
                  <p className="mt-1 text-sm text-paper-300">{article.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
