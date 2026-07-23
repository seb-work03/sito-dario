import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const rows = await db.select().from(media).orderBy(desc(media.createdAt));
  return NextResponse.json(rows);
}
