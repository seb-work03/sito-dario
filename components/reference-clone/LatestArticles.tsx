import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ArrowUpRight } from "lucide-react";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";
import { LatestArticlesGrid } from "./LatestArticlesGrid";

async function getLatestArticles() {
  try {
    return await db.query.articles.findMany({
      where: eq(articles.status, "published"),
      orderBy: desc(articles.publishedAt),
      limit: 3,
      with: {
        coverMedia: true,
        articleCategories: { with: { category: true } },
      },
    });
  } catch {
    return [];
  }
}

export async function LatestArticles() {
  const latest = await getLatestArticles();

  const items = latest.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? "",
    coverUrl: a.coverMedia?.url ?? null,
    coverAlt: a.coverMedia?.altText ?? a.title,
    publishedAt: a.publishedAt ? formatDate(a.publishedAt) : null,
    readingTime: readingTimeMinutes(a.content),
    categoryName: a.articleCategories[0]?.category.name ?? null,
  }));

  return (
    <section
      id="blog"
      className="bg-[#0D1218] px-5 pt-20 md:pt-32 pb-16 md:pb-28 border-t border-white/5"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl mb-4 tracking-tight">
              Gli ultimi articoli.
            </AnimatedHeadline>
            <AnimatedText className="text-[#94A9BE] max-w-lg leading-relaxed" delay={0.1}>
              Analisi, riflessioni e casi reali dal mondo dell&apos;e-commerce.
              Aggiornati man mano che pubblico.
            </AnimatedText>
          </div>
          <Link
            href="/blog"
            className="group hidden md:inline-flex items-center gap-2 text-[#00e5ff] text-sm font-medium hover:text-[#33ecff] transition-colors shrink-0"
          >
            Tutti gli articoli
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45"
            />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-[#17222F] p-8 text-center text-[#6A84A0]">
            Nessun articolo pubblicato al momento.
          </div>
        ) : (
          <LatestArticlesGrid items={items} />
        )}

        <div className="mt-10 md:hidden">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[#00e5ff] text-sm font-medium"
          >
            Tutti gli articoli
            <ArrowUpRight size={16} className="group-hover:-rotate-45 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

