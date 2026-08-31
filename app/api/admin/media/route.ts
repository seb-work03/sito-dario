import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const rows = await db.select().from(media).orderBy(desc(media.createdAt));
  return NextResponse.json(rows, { headers: { "Cache-Control": "private, no-store" } });
}
