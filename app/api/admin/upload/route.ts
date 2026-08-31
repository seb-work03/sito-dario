import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
// sharp 0.35 ships declarations, but its ESM exports map does not expose them to TS bundler resolution.
// @ts-expect-error Runtime and bundled declarations are both present in the package.
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_INPUT_PIXELS = 40_000_000;
const ALLOWED_FORMATS = new Map([
  ["jpeg", { extension: "jpg", mimeType: "image/jpeg" }],
  ["png", { extension: "png", mimeType: "image/png" }],
  ["webp", { extension: "webp", mimeType: "image/webp" }],
  ["avif", { extension: "avif", mimeType: "image/avif" }],
]);

type ImageMetadata = {
  format?: string;
  width?: number;
  height?: number;
  pages?: number;
};

function safeFilename(originalName: string, extension: string): string {
  const source = originalName.split(/[\\/]/).pop() ?? "immagine";
  const withoutExtension = source.replace(/\.[^.]+$/, "");
  const normalized = withoutExtension
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
  return `${normalized || "immagine"}.${extension}`;
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nessun file ricevuto" }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: "L'immagine deve pesare al massimo 8 MB" },
      { status: 413 },
    );
  }

  const sourceBuffer = Buffer.from(await file.arrayBuffer());
  let metadata: ImageMetadata;

  try {
    metadata = await sharp(sourceBuffer, {
      failOn: "warning",
      limitInputPixels: MAX_INPUT_PIXELS,
    }).metadata();
  } catch {
    return NextResponse.json({ error: "File immagine non valido o troppo grande" }, { status: 400 });
  }

  const format = metadata.format ? ALLOWED_FORMATS.get(metadata.format) : undefined;
  if (!format || !metadata.width || !metadata.height || (metadata.pages ?? 1) > 1) {
    return NextResponse.json(
      { error: "Sono supportate immagini JPG, PNG, WebP e AVIF non animate" },
      { status: 400 },
    );
  }

  const pipeline = sharp(sourceBuffer, {
    failOn: "warning",
    limitInputPixels: MAX_INPUT_PIXELS,
  }).rotate();

  if (metadata.format === "jpeg") pipeline.jpeg({ quality: 88, mozjpeg: true });
  if (metadata.format === "png") pipeline.png({ compressionLevel: 9 });
  if (metadata.format === "webp") pipeline.webp({ quality: 88 });
  if (metadata.format === "avif") pipeline.avif({ quality: 55 });

  const { data: normalizedBuffer, info } = await pipeline.toBuffer({ resolveWithObject: true });
  const filename = safeFilename(file.name, format.extension);
  const blob = await put(`media/${filename}`, normalizedBuffer, {
    access: "public",
    addRandomSuffix: true,
    contentType: format.mimeType,
  });

  const [row] = await db
    .insert(media)
    .values({
      url: blob.url,
      pathname: blob.pathname,
      filename,
      mimeType: format.mimeType,
      size: normalizedBuffer.length,
      width: info.width,
      height: info.height,
    })
    .returning();

  return NextResponse.json(row);
}
