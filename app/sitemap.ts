import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const staticRoutes: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
  { url: absoluteUrl("/servizi"), changeFrequency: "monthly", priority: 0.9 },
  {
    url: absoluteUrl("/servizi/consulenza-ecommerce"),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/servizi/formazione"),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/servizi/speech-eventi"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { url: absoluteUrl("/chi-sono"), changeFrequency: "monthly", priority: 0.8 },
  { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
  { url: absoluteUrl("/contatti"), changeFrequency: "yearly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const published = await db.query.articles.findMany({
      where: eq(articles.status, "published"),
      with: {
        coverMedia: true,
        author: true,
        articleCategories: { with: { category: true } },
      },
    });

    const categorySlugs = new Set<string>();
    const authorSlugs = new Set<string>();

    const articleRoutes: MetadataRoute.Sitemap = published.map((article) => {
      article.articleCategories.forEach(({ category }) => categorySlugs.add(category.slug));
      if (article.author?.slug) authorSlugs.add(article.author.slug);

      return {
        url: absoluteUrl(`/blog/${article.slug}`),
        lastModified: article.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
        images: article.coverMedia?.url ? [article.coverMedia.url] : undefined,
      };
    });

    const archiveRoutes: MetadataRoute.Sitemap = [
      ...Array.from(categorySlugs).map((slug) => ({
        url: absoluteUrl(`/blog/categoria/${slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.55,
      })),
      ...Array.from(authorSlugs).map((slug) => ({
        url: absoluteUrl(`/blog/autore/${slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ];

    return [...staticRoutes, ...articleRoutes, ...archiveRoutes];
  } catch {
    return staticRoutes;
  }
}
