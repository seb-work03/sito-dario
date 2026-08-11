"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { generateAndSaveArticle } from "@/lib/auto-generate/generate";
import { AUTO_GENERATE_TOPICS, pickTopicForMonth } from "@/lib/auto-generate/topics";

export type GenerateActionResult =
  | { success: true; articleId: number; title: string; slug: string }
  | { success: false; error: string };

export async function generateArticleNow(topicIndex: number | "auto"): Promise<GenerateActionResult> {
  await requireAdmin();

  const topic =
    topicIndex === "auto" || !AUTO_GENERATE_TOPICS[topicIndex]
      ? pickTopicForMonth()
      : AUTO_GENERATE_TOPICS[topicIndex];

  try {
    const result = await generateAndSaveArticle(topic);
    revalidatePath("/admin");
    revalidatePath("/blog");
    return { success: true, ...result };
  } catch (err) {
    console.error("Auto-generate error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Errore sconosciuto",
    };
  }
}
