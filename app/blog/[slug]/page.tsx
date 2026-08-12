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
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { db } from "@/lib/db";
import { articles, media } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";
import { tryParseBlocks, serializeBlocks } from "@/lib/blocks";
import { slugify } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Table of Contents extraction
// ---------------------------------------------------------------------------

interface TocEntry { text: string; id: string; description: string }

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function firstSentence(text: string): string {
  const clean = stripHtml(text).replace(/\s+/g, " ").trim();
  const m = clean.match(/^.{0,120}?[.!?]/);
  return m ? m[0].trim() : clean.slice(0, 100);
}

function extractToc(content: string): TocEntry[] {
  const trimmed = content.trim();

  // JSON blocks
  const blocks = tryParseBlocks(content);
  if (blocks) {
    const entries: TocEntry[] = [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.type === "heading" && b.level === 2) {
        const text = stripHtml(b.text);
        const id = slugify(text);
        const next = blocks[i + 1];
        const desc = next?.type === "paragraph" ? firstSentence(next.text) : "";
        entries.push({ text, id, description: desc });
      }
    }
    return entries;
  }

  // HTML
  if (trimmed.startsWith("<")) {
    const entries: TocEntry[] = [];
    const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>(?:[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>)?/gi;
    let m: RegExpExecArray | null;
    while ((m = h2Re.exec(content)) !== null) {
      const text = stripHtml(m[1]);
      if (!text) continue;
      const id = slugify(text);
      const desc = m[2] ? firstSentence(m[2]) : "";
      entries.push({ text, id, description: desc });
    }
    return entries;
  }

  // Legacy markdown
  const lines = content.split("\n");
  const entries: TocEntry[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.+)$/);
    if (!m) continue;
    const text = m[1].trim();
    const id = slugify(text);
    let desc = "";
    for (let j = i + 1; j < lines.length && j < i + 8; j++) {
      const l = lines[j].trim();
      if (l && !l.startsWith("#")) { desc = firstSentence(l); break; }
    }
    entries.push({ text, id, description: desc });
  }
  return entries;
}

function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <div className="mx-auto max-w-[896px] px-5 pb-10">
      <div className="rounded-xl border border-[#77C0CF]/30 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#17222F] border-b border-[#77C0CF]/20">
              <th className="text-left px-5 py-3 text-[#EDF2F7] font-medium text-xs uppercase tracking-wider">
                Sezione
              </th>
              <th className="text-left px-5 py-3 text-[#EDF2F7] font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                Argomento
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr
                key={entry.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3">
                  <a
                    href={`#${entry.id}`}
                    className="text-[#77C0CF] hover:text-[#8fd3e1] transition-colors"
                  >
                    {i + 1}. {entry.text}
                  </a>
                </td>
                <td className="px-5 py-3 text-[#93A6BB] leading-snug hidden sm:table-cell">
                  {entry.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dario portrait used in CTA banners
// ---------------------------------------------------------------------------

const DARIO_PORTRAIT_URL =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/media/Dario%20tana-VPnb7FSkCeuXKwy4rdEsImphyzlhbs.png";

// ---------------------------------------------------------------------------
// Split content string into 3 parts for CTA injection
// ---------------------------------------------------------------------------

function splitContent(content: string): [string, string, string] {
  const trimmed = content.trim();

  // JSON blocks
  if (!trimmed.startsWith("<")) {
    const blocks = tryParseBlocks(content);
    if (blocks && blocks.length >= 3) {
      const t1 = Math.floor(blocks.length / 3);
      const t2 = Math.floor((blocks.length * 2) / 3);
      return [
        serializeBlocks(blocks.slice(0, t1)),
        serializeBlocks(blocks.slice(t1, t2)),
        serializeBlocks(blocks.slice(t2)),
      ];
    }
  }

  // HTML: split at closing block-level tags
  if (trimmed.startsWith("<")) {
    // Find all positions right after closing block tags
    const re = /(<\/(?:p|h[1-6]|blockquote|ul|ol|pre|figure|div)>)/g;
    const segs: string[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(content)) !== null) {
      segs.push(content.slice(last, m.index + m[0].length));
      last = m.index + m[0].length;
    }
    if (last < content.length) segs.push(content.slice(last));
    if (segs.length >= 3) {
      const t1 = Math.floor(segs.length / 3);
      const t2 = Math.floor((segs.length * 2) / 3);
      return [
        segs.slice(0, t1).join(""),
        segs.slice(t1, t2).join(""),
        segs.slice(t2).join(""),
      ];
    }
  }

  // Legacy markdown: split at double newlines
  const paras = content.split(/\n\n+/);
  if (paras.length >= 3) {
    const t1 = Math.floor(paras.length / 3);
    const t2 = Math.floor((paras.length * 2) / 3);
    return [
      paras.slice(0, t1).join("\n\n"),
      paras.slice(t1, t2).join("\n\n"),
      paras.slice(t2).join("\n\n"),
    ];
  }

  // Short content — don't split
  return [content, "", ""];
}

// ---------------------------------------------------------------------------
// CTA banner component (teal themed, matches testimonials section)
// ---------------------------------------------------------------------------

interface ArticleCtaProps {
  question: string;
  paragraph: string;
  buttonLabel: string;
}

function ArticleCta({ question, paragraph, buttonLabel }: ArticleCtaProps) {
  return (
    <div className="my-16 mx-auto max-w-[896px] px-5">
      <div className="relative overflow-hidden rounded-2xl bg-[#0A2A3A] border border-[#77C0CF]/30 px-7 py-8 md:px-12 md:py-10">
        {/* Teal glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #77C0CF 0%, transparent 70%)" }}
        />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
          {/* Portrait */}
          <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#77C0CF]/50 shadow-lg shadow-[#77C0CF]/20">
            <Image
              src={DARIO_PORTRAIT_URL}
              alt="Dario Tana"
              width={80}
              height={80}
              unoptimized
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col gap-2">
            <h4 className="text-[#EDF2F7] font-semibold text-lg md:text-xl leading-snug">
              {question}
            </h4>
            <p className="text-[#93A6BB] text-sm leading-relaxed max-w-lg">
              {paragraph}
            </p>
          </div>

          {/* CTA button */}
          <div className="shrink-0">
            <Link
              href="/contatti"
              className="group inline-flex items-center gap-2 rounded-full bg-[#77C0CF] text-[#0D1218] font-medium pl-5 pr-1.5 py-1.5 text-sm transition-all duration-500 hover:bg-[#8fd3e1] hover:shadow-[0_0_24px_rgba(119,192,207,0.5)]"
            >
              {buttonLabel}
              <span className="flex items-center justify-center rounded-full bg-[#0D1218] text-[#77C0CF] w-7 h-7 shrink-0">
                <ArrowRight size={12} className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <ReadingProgress />

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
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 shrink-0">
                  <Image
                    src={article.author.avatar?.url ?? DARIO_PORTRAIT_URL}
                    alt={article.author.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <span className="text-[#EDF2F7] font-medium">{article.author.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt / lead */}
        {article.excerpt && (
          <div className="mx-auto max-w-[896px] px-5 pb-8">
            <p className="text-[#dddddd] text-lg md:text-xl leading-relaxed border-l-[3px] border-[#00e5ff]/50 pl-5 italic">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Table of contents */}
        <TableOfContents entries={extractToc(article.content)} />

        {/* Article body — split into thirds with CTA banners */}
        {(() => {
          const [part1, part2, part3] = splitContent(article.content);
          const hasSplit = part2.trim().length > 0;
          return (
            <>
              <div className="mx-auto max-w-[896px] px-5 pb-2">
                <ArticleContent content={part1} />
              </div>
              {hasSplit && (
                <>
                  <ArticleCta
                    question="Vuoi portare il tuo e-commerce al livello successivo?"
                    paragraph="Strategia, tecnologia e CRO: ti aiuto a scalare il tuo shop online con metodo e dati."
                    buttonLabel="Parliamo del tuo progetto"
                  />
                  <div className="mx-auto max-w-[896px] px-5 pb-2">
                    <ArticleContent content={part2} />
                  </div>
                  <ArticleCta
                    question="Cerchi formazione per il tuo team?"
                    paragraph="Workshop, percorsi aziendali e docenze: costruiamo insieme il programma più adatto alle tue esigenze."
                    buttonLabel="Richiedi un briefing"
                  />
                  <div className="mx-auto max-w-[896px] px-5 pb-16">
                    <ArticleContent content={part3} />
                  </div>
                </>
              )}
              {!hasSplit && (
                <div className="pb-16" />
              )}
            </>
          );
        })()}


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
