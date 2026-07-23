"use server";

import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export async function deleteMedia(id: number) {
  await requireAdmin();

  const [existing] = await db.select().from(media).where(eq(media.id, id));
  if (existing) {
    await del(existing.url).catch(() => {});
  }

  await db.delete(media).where(eq(media.id, id));

  revalidatePath("/admin/media");
}

export async function updateMediaAltText(id: number, altText: string) {
  await requireAdmin();
  await db.update(media).set({ altText: altText || null }).where(eq(media.id, id));

  revalidatePath("/admin/media");
}
