import Link from "next/link";
import type { Metadata } from "next";
import { and, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "@/components/reference-clone/reference-clone.css";
import { Header } from "@/components/reference-clone/Header";
import { Footer } from "@/components/reference-clone/Footer";
import { ScrollToTop } from "@/components/reference-clone/ScrollToTop";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { db } from "@/lib/db";
import { articleCategories, articles, categories, media } from "@/lib/db/schema";
import { formatDate, readingTimeMinutes } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
  if (!category) return { title: "Categoria non trovata", robots: { index: false } };

  const title = `${category.name} — Blog di Dario Tana`;
  const description =
    category.description ?? `Articoli di Dario Tana dedicati a ${category.name}.`;
  const url = `${SITE_URL}/blog/categoria/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "it_IT",
      type: "website",
      images: [{ url: DEFAULT_SOCIAL_IMAGE, alt: "Dario Tana" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

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

export default async function CategoryArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [logoUrl, [category]] = await Promise.all([
    getLogoUrl(),
    db.select().from(categories).where(eq(categories.slug, slug)),
  ]);

  if (!category) notFound();

  const matches = await db
    .select({ id: articles.id })
    .from(articleCategories)
    .innerJoin(articles, eq(articleCategories.articleId, articles.id))
    .where(
      and(eq(articleCategories.categoryId, category.id), eq(articles.status, "published")),
    );

  const articleIds = matches.map((m) => m.id);

  const raw = articleIds.length
    ? await db.query.articles.findMany({
        where: inArray(articles.id, articleIds),
        orderBy: desc(articles.publishedAt),
        with: {
          coverMedia: true,
          articleCategories: { with: { category: true } },
        },
      })
    : [];

  const items = raw.map((a) => {
    return {
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? "",
      coverUrl: a.coverMedia?.url ?? null,
      coverAlt: a.coverMedia?.altText ?? a.title,
      publishedAt: a.publishedAt ? formatDate(a.publishedAt) : null,
      publishedAtIso: a.publishedAt?.toISOString() ?? null,
      readingTime: readingTimeMinutes(a.content),
      categories: a.articleCategories
        .map((ac) => ({ name: ac.category.name, slug: ac.category.slug }))
        .sort((x, y) => x.name.localeCompare(y.name, "it")),
    };
  });
  const archiveUrl = `${SITE_URL}/blog/categoria/${category.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: category.name, path: `/blog/categoria/${category.slug}` },
      ]),
      {
        "@type": "CollectionPage",
        "@id": `${archiveUrl}#collection`,
        url: archiveUrl,
        name: `${category.name} — Blog di Dario Tana`,
        description: category.description ?? `Articoli dedicati a ${category.name}.`,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: raw.length,
          itemListElement: raw.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/blog/${article.slug}`),
            name: article.title,
          })),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0D1218] text-[#EDF2F7] antialiased">
      <Header logoUrl={logoUrl} />
      <main className="pt-20 md:pt-24">
        {/* Category header band */}
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

            <span className="block text-[11px] uppercase tracking-[0.15em] text-[#ddd] mb-3">
              Categoria
            </span>
            <h1 className="text-[#EDF2F7] font-medium text-[28px] md:text-[48px] leading-tight tracking-tight mb-3">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-[#ddd] text-base leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}
            <span className="block mt-3 text-[#93A6BB] text-sm">
              {items.length} {items.length === 1 ? "articolo" : "articoli"}
            </span>
          </div>
        </section>

        {items.length === 0 ? (
          <div className="mx-auto max-w-[1240px] px-5 py-20 text-center text-[#ddd]">
            Nessun articolo in questa categoria.
          </div>
        ) : (
          <BlogIndex articles={items} categories={[]} hideFilter />
        )}
      </main>
      <Footer logoUrl={logoUrl} />
      <ScrollToTop />
      <JsonLd data={structuredData} />
    </div>
  );
}
