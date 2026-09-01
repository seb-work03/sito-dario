import { desc, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [favicon] = await db
      .select({ url: media.url })
      .from(media)
      .where(ilike(media.filename, "%favicon-dario-tana-ok-1%"))
      .orderBy(desc(media.id))
      .limit(1);

    if (!favicon) {
      return new NextResponse("Favicon non trovata nella libreria media.", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.redirect(favicon.url, {
      status: 307,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Unable to resolve favicon from media library:", error);
    return new NextResponse("Favicon temporaneamente non disponibile.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
