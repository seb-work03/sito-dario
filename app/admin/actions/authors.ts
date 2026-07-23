"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { authors } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

function readFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const avatarMediaIdRaw = String(formData.get("avatarMediaId") ?? "").trim();

  return {
    name,
    slug: slugify(slugInput || name),
    bio: bio || null,
    avatarMediaId: avatarMediaIdRaw ? Number(avatarMediaIdRaw) : null,
  };
}

export async function createAuthor(formData: FormData) {
  await requireAdmin();
  await db.insert(authors).values(readFields(formData));

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function updateAuthor(id: number, formData: FormData) {
  await requireAdmin();
  await db.update(authors).set(readFields(formData)).where(eq(authors.id, id));

  revalidatePath("/admin/authors");
  revalidatePath("/blog");
  redirect("/admin/authors");
}

export async function deleteAuthor(id: number) {
  await requireAdmin();
  await db.delete(authors).where(eq(authors.id, id));

  revalidatePath("/admin/authors");
  revalidatePath("/blog");
}
