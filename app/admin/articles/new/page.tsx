import { createArticle } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Nuovo articolo</h1>
      <ArticleForm action={createArticle} />
    </div>
  );
}
