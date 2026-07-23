"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { tags } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

export async function createTag(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const slug = slugify(name);
  const [existing] = await db.select().from(tags).where(eq(tags.slug, slug));
  if (!existing) {
    await db.insert(tags).values({ name, slug });
  }

  revalidatePath("/admin/tags");
}

export async function deleteTag(id: number) {
  await requireAdmin();
  await db.delete(tags).where(eq(tags.id, id));

  revalidatePath("/admin/tags");
  revalidatePath("/blog");
}

/** Trova o crea i tag a partire da una lista di nomi (dal form articolo), restituisce gli id. */
export async function resolveTagIds(names: string[]): Promise<number[]> {
  const ids: number[] = [];

  for (const rawName of names) {
    const name = rawName.trim();
    if (!name) continue;
    const slug = slugify(name);

    const [existing] = await db.select().from(tags).where(eq(tags.slug, slug));
    if (existing) {
      ids.push(existing.id);
      continue;
    }

    const [created] = await db.insert(tags).values({ name, slug }).returning();
    ids.push(created.id);
  }

  return ids;
}
