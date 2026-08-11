import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { generateAndSaveArticle } from "@/lib/auto-generate/generate";
import { pickTopicForMonth } from "@/lib/auto-generate/topics";

// Vercel Cron adds `Authorization: Bearer <CRON_SECRET>` automatically.
// The endpoint refuses any request without a matching secret.
function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const topic = pickTopicForMonth();
  try {
    const result = await generateAndSaveArticle(topic);
    revalidatePath("/admin");
    revalidatePath("/blog");
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("Auto-generate cron error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Errore sconosciuto" },
      { status: 500 },
    );
  }
}

// Vercel Cron uses GET by default; keep POST as a stub for compat.
export const POST = GET;

// Article generation can take 30-60 seconds. Give the function room.
export const maxDuration = 300;
