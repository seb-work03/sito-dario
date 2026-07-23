import { createArticle } from "@/app/admin/actions/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { db } from "@/lib/db";
import { authors, categories } from "@/lib/db/schema";

export default async function NewArticlePage() {
  const [allCategories, allAuthors] = await Promise.all([
    db.select().from(categories),
    db.select().from(authors),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Nuovo articolo</h1>
      <ArticleForm action={createArticle} categories={allCategories} authors={allAuthors} />
    </div>
  );
}
