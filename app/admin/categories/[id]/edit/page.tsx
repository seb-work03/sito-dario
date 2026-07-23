import { eq, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateCategory } from "@/app/admin/actions/categories";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = Number(id);

  const [[category], otherCategories] = await Promise.all([
    db.select().from(categories).where(eq(categories.id, categoryId)),
    db.select().from(categories).where(ne(categories.id, categoryId)),
  ]);

  if (!category) {
    notFound();
  }

  const updateWithId = updateCategory.bind(null, category.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium">Modifica categoria</h1>
      <CategoryForm action={updateWithId} category={category} categories={otherCategories} />
    </div>
  );
}
