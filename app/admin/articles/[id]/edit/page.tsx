import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateArticle } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)));

  if (!article) {
    notFound();
  }

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Modifica articolo</h1>
      <ArticleForm action={updateWithId} article={article} />
    </div>
  );
}
