import Image from "next/image";
import Link from "next/link";
import { desc, eq, ilike, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { db } from "@/lib/db";
import { articles, authors, media } from "@/lib/db/schema";
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

export default async function AuthorArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [logoUrl, author] = await Promise.all([
    getLogoUrl(),
    db.query.authors.findFirst({
      where: eq(authors.slug, slug),
      with: { avatar: true },
    }),
  ]);

  if (!author) notFound();

  const allArticles = await db.query.articles.findMany({
    where: eq(articles.authorId, author.id),
    orderBy: desc(articles.publishedAt),
    with: {
      coverMedia: true,
      articleCategories: { with: { category: true } },
    },
  });

  const items = allArticles
    .filter((a) => a.status === "published")
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? "",
      coverUrl: a.coverMedia?.url ?? null,
      coverAlt: a.coverMedia?.altText ?? a.title,
      publishedAt: a.publishedAt ? formatDate(a.publishedAt) : null,
      readingTime: readingTimeMinutes(a.content),
      categories: a.articleCategories
        .map((ac) => ({ name: ac.category.name, slug: ac.category.slug }))
        .sort((x, y) => x.name.localeCompare(y.name, "it")),
    }));

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        {/* Author header band */}
        <section className="bg-[#17222F] border-b border-white/8 px-5 py-14 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[#ddd] text-sm hover:text-[#00e5ff] transition-colors mb-8"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Tutti gli articoli
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12">
              {/* Avatar — large */}
              {author.avatar ? (
                <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-2 border-[#00e5ff]/30 shadow-xl shadow-[#00e5ff]/10">
                  <Image
                    src={author.avatar.url}
                    alt={author.name}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 md:w-48 md:h-48 shrink-0 rounded-full bg-[#0D1218] border-2 border-[#77C0CF]/40 flex items-center justify-center text-[#77C0CF] font-semibold text-4xl md:text-5xl">
                  {author.name.split(/\s+/).slice(0, 2).map((w: string) => w[0] ?? "").join("").toUpperCase()}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#ddd]">Autore</span>
                <h1 className="text-[#EDF2F7] font-medium text-[28px] md:text-[40px] leading-tight tracking-tight">
                  {author.name}
                </h1>
                {author.bio && (
                  <p className="text-[#ddd] text-base leading-relaxed max-w-xl">{author.bio}</p>
                )}
                <span className="text-[#93A6BB] text-sm">
                  {items.length} {items.length === 1 ? "articolo" : "articoli"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {items.length === 0 ? (
          <div className="mx-auto max-w-[1240px] px-5 py-20 text-center text-[#ddd]">
            Nessun articolo pubblicato da questo autore.
          </div>
        ) : (
          <BlogIndex articles={items} categories={[]} hideFilter />
        )}
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
    </div>
  );
}
