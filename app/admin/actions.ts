"use server";

import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session) {
    throw new Error("Non autorizzato");
  }
}

function readArticleFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const published = formData.get("published") === "on";

  return {
    title,
    slug: slugify(slugInput || title),
    excerpt: excerpt || null,
    content,
    coverImageUrl: coverImageUrl || null,
    published,
  };
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const fields = readArticleFields(formData);

  await db.insert(articles).values({
    ...fields,
    publishedAt: fields.published ? new Date() : null,
  });

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
      publishedAt: fields.published ? (existing?.publishedAt ?? new Date()) : null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id));

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect("/admin");
}

export async function deleteArticle(id: number) {
  await requireAdmin();

  const [existing] = await db.select().from(articles).where(eq(articles.id, id));

  if (existing?.coverImageUrl) {
    await del(existing.coverImageUrl).catch(() => {});
  }

  await db.delete(articles).where(eq(articles.id, id));

  revalidatePath("/admin");
  revalidatePath("/blog");
}
