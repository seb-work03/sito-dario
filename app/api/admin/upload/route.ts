import { put } from "@vercel/blob";
import { imageSize } from "image-size";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nessun file ricevuto" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Il file deve essere un'immagine" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let dimensions: { width?: number; height?: number } = {};
  try {
    const size = imageSize(buffer);
    dimensions = { width: size.width, height: size.height };
  } catch {
    // SVG or unrecognized format: skip dimensions
  }

  const blob = await put(`media/${file.name}`, buffer, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });

  const [row] = await db
    .insert(media)
    .values({
      url: blob.url,
      pathname: blob.pathname,
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      width: dimensions.width ?? null,
      height: dimensions.height ?? null,
    })
    .returning();

  return NextResponse.json(row);
}
