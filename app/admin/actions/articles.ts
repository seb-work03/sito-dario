"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { articleCategories, articles, articleTags } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { resolveTagIds } from "./tags";

function readArticleFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverMediaIdRaw = String(formData.get("coverMediaId") ?? "").trim();
  const authorIdRaw = String(formData.get("authorId") ?? "").trim();
  const status = formData.get("status") === "published" ? "published" : "draft";
  const seoTitle = String(formData.get("seoTitle") ?? "").trim();
  const seoDescription = String(formData.get("seoDescription") ?? "").trim();

  return {
    title,
    slug: slugify(slugInput || title),
    excerpt: excerpt || null,
    content,
    coverMediaId: coverMediaIdRaw ? Number(coverMediaIdRaw) : null,
    authorId: authorIdRaw ? Number(authorIdRaw) : null,
    status: status as "draft" | "published",
    seoTitle: seoTitle || null,
    seoDescription: seoDescription || null,
  };
}

async function syncTaxonomies(articleId: number, formData: FormData) {
  const categoryIds = formData.getAll("categoryIds").map(Number).filter(Boolean);
  const tagNames = String(formData.get("tagNames") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const tagIds = await resolveTagIds(tagNames);

  await db.delete(articleCategories).where(eq(articleCategories.articleId, articleId));
  if (categoryIds.length > 0) {
    await db
      .insert(articleCategories)
      .values(categoryIds.map((categoryId) => ({ articleId, categoryId })));
  }

  await db.delete(articleTags).where(eq(articleTags.articleId, articleId));
  if (tagIds.length > 0) {
    await db.insert(articleTags).values(tagIds.map((tagId) => ({ articleId, tagId })));
  }
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const fields = readArticleFields(formData);

  const [created] = await db
    .insert(articles)
    .values({
      ...fields,
      publishedAt: fields.status === "published" ? new Date() : null,
    })
    .returning();

  await syncTaxonomies(created.id, formData);

  revalidatePath("/admin");
  revalidatePath("/blog");
  redirect("/admin");
}

export async function updateArticle(id: number, formData: FormData) {
  await requireAdmin();
  const fields = readArticleFields(formData);

  const [existing] = await db.select().from(articles).where(eq(articles.id, id));

  await db
    .update(articles)
    .set({
      ...fields,
      publishedAt:
        fields.status === "published" ? (existing?.publishedAt ?? new Date()) : null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id));

  await syncTaxonomies(id, formData);

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect("/admin");
}

export async function deleteArticle(id: number) {
  await requireAdmin();
  await db.delete(articles).where(eq(articles.id, id));

  revalidatePath("/admin");
  revalidatePath("/blog");
}
