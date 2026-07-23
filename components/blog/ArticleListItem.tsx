import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type ArticleListItemProps = {
  article: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    publishedAt: Date | null;
    coverMedia: { url: string; altText: string | null } | null;
    author: { name: string } | null;
    articleCategories: { category: { id: number; name: string } }[];
  };
};

export function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <article className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
      {article.coverMedia && (
        <Link
          href={`/blog/${article.slug}`}
          className="relative h-40 w-full shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-40"
        >
          <Image
            src={article.coverMedia.url}
            alt={article.coverMedia.altText ?? ""}
            fill
            className="object-cover"
            unoptimized
          />
        </Link>
      )}
      <div>
        <p className="text-xs text-paper-400">
          {article.publishedAt ? formatDate(article.publishedAt) : ""}
          {article.author && ` · ${article.author.name}`}
          {article.articleCategories.length > 0 &&
            ` · ${article.articleCategories.map((ac) => ac.category.name).join(", ")}`}
        </p>
        <h2 className="text-xl font-medium text-paper-50">
          <Link href={`/blog/${article.slug}`} className="hover:text-celeste-400">
            {article.title}
          </Link>
        </h2>
        {article.excerpt && <p className="mt-1 text-sm text-paper-300">{article.excerpt}</p>}
      </div>
    </article>
  );
}
