"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

function readFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const parentIdRaw = String(formData.get("parentId") ?? "").trim();

  return {
    name,
    slug: slugify(slugInput || name),
    description: description || null,
    parentId: parentIdRaw ? Number(parentIdRaw) : null,
  };
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  await db.insert(categories).values(readFields(formData));

  revalidatePath("/admin/categories");
  revalidatePath("/blog");
  redirect("/admin/categories");
}

export async function updateCategory(id: number, formData: FormData) {
  await requireAdmin();
  await db.update(categories).set(readFields(formData)).where(eq(categories.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/blog");
  redirect("/admin/categories");
}

export async function deleteCategory(id: number) {
  await requireAdmin();
  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/blog");
}
