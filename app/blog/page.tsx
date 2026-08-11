import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Dario Tana",
  description:
    "Analisi, casi reali e riflessioni sulla consulenza e-commerce, la strategia digitale e la formazione. Aggiornato periodicamente.",
};

export default async function BlogPage() {
  const published = await db.query.articles.findMany({
    where: eq(articles.status, "published"),
    orderBy: desc(articles.publishedAt),
    with: {
      coverMedia: true,
      articleCategories: { with: { category: true } },
    },
  });

  const items = published.map((a) => ({
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
      <Header />
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
                <span className="font-normal">Qui trovi metodo prima che teoria: come leggere i numeri di un negozio online, come scegliere una piattaforma senza pentirsene, come costruire team che sanno decidere e cosa cambia davvero quando un progetto e-commerce inizia a generare valore misurabile.</span>
              </>
            </AnimatedText>
          </div>
        </section>

        <BlogIndex articles={items} categories={categories} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
