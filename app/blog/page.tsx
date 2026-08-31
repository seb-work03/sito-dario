import type { Metadata } from "next";
import { desc, eq, ilike, or } from "drizzle-orm";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { db } from "@/lib/db";
import { articles, media } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const blogDescription =
  "Analisi, casi reali e guide su consulenza e-commerce, strategia digitale, piattaforme e formazione per aziende e professionisti, curate da Dario Tana.";

export const metadata: Metadata = {
  title: "Blog e-commerce: strategie e formazione | Dario Tana",
  description: blogDescription,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — Dario Tana",
    description: blogDescription,
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    locale: "it_IT",
    type: "website",
    images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: "Dario Tana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Dario Tana",
    description: blogDescription,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
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
        author: true,
        articleCategories: { with: { category: true } },
      },
    }),
  ]);

  const items = published.map((a) => {
    return {
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? "",
      coverUrl: a.coverMedia?.url ?? null,
      coverAlt: a.coverMedia?.altText ?? a.title,
      publishedAt: a.publishedAt ? formatDate(a.publishedAt) : null,
      publishedAtIso: a.publishedAt?.toISOString() ?? null,
      readingTime: readingTimeMinutes(a.content),
      authorName: a.author?.name ?? "Dario Tana",
      authorSlug: a.author?.slug ?? null,
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/blog#collection`,
        url: `${SITE_URL}/blog`,
        name: "Blog — Dario Tana",
        description: blogDescription,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${SITE_URL}/blog#articles` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/blog#articles`,
        name: "Articoli di Dario Tana",
        numberOfItems: published.length,
        itemListElement: published.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/blog/${article.slug}`),
          item: {
            "@type": "BlogPosting",
            headline: article.title,
            url: absoluteUrl(`/blog/${article.slug}`),
            datePublished: article.publishedAt?.toISOString(),
            image: article.coverMedia?.url,
            author: article.author
              ? {
                  "@type": "Person",
                  "@id":
                    article.author.name === "Dario Tana"
                      ? PERSON_ID
                      : `${SITE_URL}/blog/autore/${article.author.slug}#author`,
                  name: article.author.name,
                  url: `${SITE_URL}/blog/autore/${article.author.slug}`,
                }
              : { "@id": PERSON_ID },
          },
        })),
      },
    ],
  };

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
      <JsonLd data={structuredData} />
    </div>
  );
}
