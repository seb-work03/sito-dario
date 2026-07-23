import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const [row] = await db.select().from(media).where(eq(media.id, Number(id)));

  if (!row) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }

  await del(row.url).catch(() => {});
  await db.delete(media).where(eq(media.id, Number(id)));

  return NextResponse.json({ ok: true });
}
