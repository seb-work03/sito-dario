import type { Metadata } from "next";
import { desc, eq, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { applyCuratedArticleOverride } from "@/lib/blog/curated-articles";
import { db } from "@/lib/db";
import { articles, media } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Dario Tana",
  description:
    "Analisi, casi reali e riflessioni sulla consulenza e-commerce, la strategia digitale e la formazione. Aggiornato periodicamente.",
};

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

export default async function BlogPage() {
  const [logoUrl, published] = await Promise.all([
    getLogoUrl(),
    db.query.articles.findMany({
      where: eq(articles.status, "published"),
      orderBy: desc(articles.publishedAt),
      with: {
        coverMedia: true,
        articleCategories: { with: { category: true } },
      },
    }),
  ]);

  const items = published.map((row) => {
    const a = applyCuratedArticleOverride(row);
    return {
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
    };
  });

  // Build category list from published articles, with counts, sorted alpha.
  const categoryMap = new Map<string, { name: string; slug: string; count: number }>();
  for (const article of items) {
    for (const c of article.categories) {
      const existing = categoryMap.get(c.slug);
      if (existing) existing.count += 1;
      else categoryMap.set(c.slug, { name: c.name, slug: c.slug, count: 1 });
    }
  }
  const categories = Array.from(categoryMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "it"),
  );

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        {/* Cyan intro band */}
        <section
          className="px-5 py-20 md:py-28 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #00e5ff 0%, #008a99 100%)" }}
        >
          {/* Subtle grid + dots overlay for texture, matching the Process band. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(13,18,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,18,24,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(rgba(13,18,24,0.25) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
            <AnimatedHeadline
              as="h1"
              className="text-[#0D1218] font-medium text-[44px] md:text-[80px] leading-[0.95] tracking-tight"
            >
              Blog
            </AnimatedHeadline>
            <AnimatedText
              delay={0.15}
              className="text-[#0D1218] text-lg md:text-xl leading-relaxed max-w-3xl"
            >
              <>
                <strong className="font-bold">Un archivio di analisi, casi reali e riflessioni sulla consulenza e-commerce, la strategia digitale e la formazione.</strong>
                <br /><br />
                <span className="font-normal">Qui trovi metodo prima che teoria: come leggere i numeri di un negozio online, scegliere una piattaforma senza pentirsene e costruire team che sanno decidere quando conta davvero.</span>
              </>
            </AnimatedText>
          </div>
        </section>

        <BlogIndex articles={items} categories={categories} />
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
    </div>
  );
}
