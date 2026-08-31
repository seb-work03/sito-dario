"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { HoverArrow } from "@/components/reference-clone/HoverArrow";
import { ArticleAuthorMeta } from "@/components/blog/ArticleAuthorMeta";

type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  coverAlt: string;
  publishedAt: string | null;
  publishedAtIso: string | null;
  readingTime: number;
  categories: { name: string; slug: string }[];
  authorName?: string | null;
  authorSlug?: string | null;
};

type Category = { name: string; slug: string; count: number };

type Props = {
  articles: ArticleItem[];
  categories: Category[];
  hideFilter?: boolean;
};

const EASE = [0.19, 1, 0.22, 1] as const;

export function BlogIndex({ articles, categories, hideFilter = false }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeSlug) return articles;
    return articles.filter((a) =>
      a.categories.some((c) => c.slug === activeSlug),
    );
  }, [activeSlug, articles]);

  const totalCount = articles.length;

  return (
    <>
      {/* Category tabs */}
      {!hideFilter && (
        <section className="bg-[#0D1218] px-5 pt-10 md:pt-14 pb-2">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap gap-2 md:gap-3">
              <CategoryTab
                label="Tutti"
                count={totalCount}
                active={activeSlug === null}
                onClick={() => setActiveSlug(null)}
              />
              {categories.map((c) => (
                <CategoryTab
                  key={c.slug}
                  label={c.name}
                  count={c.count}
                  active={activeSlug === c.slug}
                  onClick={() => setActiveSlug(c.slug)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section className="bg-[#0D1218] px-5 pt-10 md:pt-14 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1240px]">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-[#17222F] p-10 text-center text-[#93A6BB]">
              Nessun articolo in questa categoria.
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              transition={{ layout: { duration: 0.5, ease: EASE } }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <ArticleCard key={item.slug} item={item} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

function CategoryTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
        active
          ? "bg-[#00e5ff] text-[#0D1218] border-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.35)]"
          : "bg-[#17222F] text-[#EDF2F7] border-[#253444] hover:border-[#00e5ff]/40 hover:text-[#00e5ff]"
      }`}
    >
      {label}
      <span
        className={`inline-flex items-center justify-center rounded-full text-[10px] font-semibold tabular-nums h-5 min-w-5 px-1.5 transition-colors duration-300 ${
          active
            ? "bg-[#0D1218]/15 text-[#0D1218]"
            : "bg-[#0D1218] text-[#dddddd] group-hover:text-[#00e5ff]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ArticleCard({ item, index }: { item: ArticleItem; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{
        opacity: { duration: 0.5, ease: EASE, delay: Math.min(index * 0.06, 0.3) },
        y: { duration: 0.5, ease: EASE, delay: Math.min(index * 0.06, 0.3) },
        scale: { duration: 0.35, ease: EASE },
        layout: { duration: 0.5, ease: EASE },
      }}
      className="group h-entry"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <ArticleAuthorMeta name={item.authorName} slug={item.authorSlug} />
      <Link
        href={`/blog/${item.slug}`}
        itemProp="url"
        className="u-url flex flex-col h-full rounded-2xl border border-white/8 bg-[#17222F] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#00e5ff]/55 hover:shadow-[0_0_32px_rgba(0,229,255,0.14)]"
      >
        <div className="relative aspect-[2/1] overflow-hidden bg-[#0D1218]">
          {item.coverUrl ? (
            <Image
              src={item.coverUrl}
              alt={item.coverAlt}
              fill
              unoptimized
              itemProp="image"
              className="u-photo object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#17222F] via-[#0D1218] to-[#005c66]/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218]/70 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="flex flex-col flex-1 p-7 gap-4">
          <div className="flex items-center gap-3 text-[#dddddd] text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {item.readingTime} min di lettura
              <meta itemProp="timeRequired" content={`PT${item.readingTime}M`} />
            </span>
            {item.publishedAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#93A6BB]" />
                <time
                  className="dt-published"
                  itemProp="datePublished"
                  dateTime={item.publishedAtIso ?? undefined}
                >
                  {item.publishedAt}
                </time>
              </>
            )}
          </div>

          {item.categories[0] && (
            <span
              itemProp="articleSection"
              className="p-category w-fit text-[10px] uppercase tracking-[0.14em] font-medium text-[#0D1218] bg-[#00e5ff] px-2.5 py-1 rounded-full"
            >
              {item.categories[0].name}
            </span>
          )}

          <h3
            itemProp="headline"
            className="p-name text-[#EDF2F7] text-[22px] font-medium tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300"
          >
            {item.title}
          </h3>

          <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/6">
            <span className="text-[#00e5ff] text-sm font-medium">Leggi l&apos;articolo</span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0D1218] text-[#00e5ff] transition-all duration-500 group-hover:bg-[#00e5ff] group-hover:text-[#0D1218] group-hover:shadow-[0_0_16px_rgba(0,229,255,0.5)]">
              <HoverArrow size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
