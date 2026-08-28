"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { HoverArrow } from "./HoverArrow";

type Item = {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  coverAlt: string;
  publishedAt: string | null;
  readingTime: number;
  categoryName: string | null;
};

export function LatestArticlesGrid({ items }: { items: Item[] }) {
  return (
    <>
      {/* Desktop: three compact cards; tablet: two columns. */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.article
            key={item.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="group"
          >
            <Link
              href={`/blog/${item.slug}`}
              className="flex flex-col h-full rounded-2xl border border-white/8 bg-[#17222F] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#00e5ff]/55 hover:shadow-[0_0_32px_rgba(0,229,255,0.14)]"
            >
              <div className="relative aspect-[2/1] overflow-hidden bg-[#0D1218]">
                {item.coverUrl ? (
                  <Image
                    src={item.coverUrl}
                    alt={item.coverAlt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
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
                  </span>
                  {item.publishedAt && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#4F6577]" />
                      <span>{item.publishedAt}</span>
                    </>
                  )}
                </div>

                {item.categoryName && (
                  <span className="w-fit text-[10px] uppercase tracking-[0.14em] font-medium text-[#0D1218] bg-[#00e5ff] px-2.5 py-1 rounded-full">
                    {item.categoryName}
                  </span>
                )}

                <h3 className="text-[#EDF2F7] text-[22px] font-medium tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300">
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
        ))}
      </div>

      {/* Mobile: horizontal scroll list — cover thumbnail + meta + title, no excerpt */}
      <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory scrollbar-none">
        <ul className="flex gap-4 pb-2">
          {items.map((item) => (
            <li
              key={item.slug}
              className="snap-start shrink-0 w-[78vw] max-w-[320px]"
            >
              <Link
                href={`/blog/${item.slug}`}
                className="flex flex-col h-full rounded-2xl border border-white/8 bg-[#17222F] overflow-hidden active:border-[#00e5ff]/40"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-[#0D1218]">
                  {item.coverUrl ? (
                    <Image
                      src={item.coverUrl}
                      alt={item.coverAlt}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="80vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#17222F] via-[#0D1218] to-[#005c66]/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218]/70 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-3 text-[#dddddd] text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} />
                      {item.readingTime} min
                    </span>
                    {item.publishedAt && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-[#4F6577]" />
                        <span>{item.publishedAt}</span>
                      </>
                    )}
                  </div>
                  {item.categoryName && (
                    <span className="w-fit text-[10px] uppercase tracking-[0.14em] font-medium text-[#0D1218] bg-[#00e5ff] px-2.5 py-1 rounded-full">
                      {item.categoryName}
                    </span>
                  )}
                  <h3 className="text-[#EDF2F7] text-lg font-medium tracking-tight leading-[1.25]">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[#00e5ff] text-sm font-medium mt-1">
                    Leggi
                    <HoverArrow size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
