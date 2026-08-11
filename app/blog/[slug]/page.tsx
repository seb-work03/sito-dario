import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { db } from "@/lib/db";
import { articles, media } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getLogoUrl(): Promise<string | null> {
  try {
    const rows = await db
      .select({ url: media.url })
      .from(media)
      .where(or(ilike(media.filename, "%marchio%dario%"), ilike(media.filename, "%marchio%tana%")))
      .orderBy(desc(media.createdAt))
      .limit(1);
    return rows[0]?.url ?? null;
  } catch {
    return null;
  }
}

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
    title: article
      ? (article.seoTitle ?? `${article.title} — Dario Tana`)
      : "Articolo non trovato",
    description: article?.seoDescription ?? article?.excerpt ?? undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [logoUrl, article] = await Promise.all([getLogoUrl(), getArticle(slug)]);

  if (!article) notFound();

  const readingTime = readingTimeMinutes(article.content);
  const categories = article.articleCategories.map((ac) => ac.category);
  const tags = article.articleTags.map((at) => at.tag);

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />

      <main>
        {/* Hero image */}
        {article.coverMedia ? (
          <div className="relative w-full h-72 md:h-[480px] overflow-hidden bg-[#0D1218] mt-20 md:mt-24">
            <Image
              src={article.coverMedia.url}
              alt={article.coverMedia.altText ?? article.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218] via-[#0D1218]/30 to-transparent" />

            {/* Category pills overlaid on image */}
            {categories.length > 0 && (
              <div className="absolute bottom-6 left-5 md:left-[calc((100%-896px)/2+20px)] flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog/categoria/${c.slug}`}
                    className="inline-flex items-center rounded-full border border-[#00e5ff]/50 bg-[#00e5ff]/15 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-medium text-[#00e5ff] hover:bg-[#00e5ff]/25 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-20 md:h-24" />
        )}

        {/* Article header */}
        <div className="mx-auto max-w-[896px] px-5 pt-10 pb-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[#93A6BB] text-sm hover:text-[#00e5ff] transition-colors mb-8"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Tutti gli articoli
          </Link>

          {/* Categories (shown only when no hero image) */}
          {!article.coverMedia && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/categoria/${c.slug}`}
                  className="inline-flex items-center rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-medium text-[#00e5ff] hover:bg-[#00e5ff]/20 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-[#EDF2F7] font-medium text-[28px] md:text-[48px] leading-[1.1] tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#93A6BB] pb-8 border-b border-white/8">
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(article.publishedAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {readingTime} min di lettura
            </span>
            {article.author && (
              <div className="flex items-center gap-2.5 ml-auto">
                {article.author.avatar && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 shrink-0">
                    <Image
                      src={article.author.avatar.url}
                      alt={article.author.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="text-[#EDF2F7] font-medium">{article.author.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt / lead */}
        {article.excerpt && (
          <div className="mx-auto max-w-[896px] px-5 pb-10">
            <p className="text-[#dddddd] text-lg md:text-xl leading-relaxed border-l-[3px] border-[#00e5ff]/50 pl-5 italic">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Article body */}
        <div className="mx-auto max-w-[896px] px-5 pb-16">
          <ArticleContent content={article.content} />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mx-auto max-w-[896px] px-5 pb-10">
            <div className="flex flex-wrap gap-2 pt-8 border-t border-white/8">
              {tags.map((t) => (
                <Link
                  key={t.slug}
                  href={`/blog/tag/${t.slug}`}
                  className="rounded-full border border-white/12 px-3 py-1 text-xs text-[#93A6BB] hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-colors duration-300"
                >
                  #{t.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author card */}
        {article.author && (
          <div className="mx-auto max-w-[896px] px-5 pb-24">
            <Link
              href={`/blog/autore/${article.author.slug}`}
              className="group flex items-center gap-5 rounded-2xl border border-white/8 bg-[#17222F] p-6 hover:border-[#00e5ff]/30 transition-all duration-300"
            >
              {article.author.avatar && (
                <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-[#00e5ff]/20">
                  <Image
                    src={article.author.avatar.url}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[11px] text-[#93A6BB] uppercase tracking-[0.12em]">
                  Scritto da
                </span>
                <span className="text-[#EDF2F7] font-medium text-lg group-hover:text-[#00e5ff] transition-colors duration-300">
                  {article.author.name}
                </span>
                {article.author.bio && (
                  <span className="text-[#93A6BB] text-sm leading-relaxed line-clamp-2">
                    {article.author.bio}
                  </span>
                )}
              </div>
              <ArrowRight
                size={18}
                className="ml-auto shrink-0 text-[#4F6577] group-hover:text-[#00e5ff] transition-colors duration-300"
              />
            </Link>
          </div>
        )}
      </main>

      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
    </div>
  );
}
