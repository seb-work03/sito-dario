import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateArticle } from "@/app/admin/actions/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { db } from "@/lib/db";
import { authors, categories, articles } from "@/lib/db/schema";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article, allCategories, allAuthors] = await Promise.all([
    db.query.articles.findFirst({
      where: eq(articles.id, Number(id)),
      with: {
        coverMedia: true,
        articleCategories: true,
        articleTags: { with: { tag: true } },
      },
    }),
    db.select().from(categories),
    db.select().from(authors),
  ]);

  if (!article) {
    notFound();
  }

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Modifica articolo</h1>
      <ArticleForm
        action={updateWithId}
        categories={allCategories}
        authors={allAuthors}
        article={{
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          coverMediaId: article.coverMediaId,
          coverMediaUrl: article.coverMedia?.url,
          authorId: article.authorId,
          status: article.status,
          seoTitle: article.seoTitle,
          seoDescription: article.seoDescription,
          categoryIds: article.articleCategories.map((ac) => ac.categoryId),
          tagNames: article.articleTags.map((at) => at.tag.name).join(", "),
        }}
      />
    </div>
  );
}
