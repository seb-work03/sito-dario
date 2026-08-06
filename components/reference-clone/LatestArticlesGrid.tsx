"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";

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
    <div className="grid md:grid-cols-3 gap-5 md:gap-6">
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
            className="flex flex-col h-full rounded-2xl border border-white/8 bg-[#17222F] overflow-hidden transition-all duration-500 hover:border-[#00e5ff]/40 hover:-translate-y-1"
          >
            {/* Cover image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1218]">
              {item.coverUrl ? (
                <Image
                  src={item.coverUrl}
                  alt={item.coverAlt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#17222F] via-[#0D1218] to-[#005c66]/40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218]/70 via-transparent to-transparent pointer-events-none" />
              {item.categoryName && (
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.14em] font-medium text-[#0D1218] bg-[#00e5ff] px-2.5 py-1 rounded-full">
                  {item.categoryName}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 md:p-7 gap-4">
              {/* Meta row */}
              <div className="flex items-center gap-3 text-[#6A84A0] text-xs">
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

              {/* Title */}
              <h3 className="text-[#EDF2F7] text-xl md:text-[22px] font-medium tracking-tight leading-[1.2] group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>

              {/* Excerpt */}
              {item.excerpt && (
                <p className="text-[#94A9BE] text-sm leading-relaxed flex-1">
                  {item.excerpt}
                </p>
              )}

              {/* Bottom row: read arrow */}
              <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/6">
                <span className="text-[#00e5ff] text-sm font-medium">Leggi l&apos;articolo</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0D1218] text-[#00e5ff] transition-all duration-500 group-hover:bg-[#00e5ff] group-hover:text-[#0D1218] group-hover:shadow-[0_0_16px_rgba(0,229,255,0.5)]">
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45"
                  />
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
