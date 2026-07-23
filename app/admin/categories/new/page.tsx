import { createCategory } from "@/app/admin/actions/categories";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export default async function NewCategoryPage() {
  const allCategories = await db.select().from(categories);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Nuova categoria</h1>
      <CategoryForm action={createCategory} categories={allCategories} />
    </div>
  );
}
