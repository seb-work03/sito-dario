import Anthropic from "@anthropic-ai/sdk";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles, articleCategories, media, categories } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { serializeBlocks } from "@/lib/blocks";
import type { Block } from "@/lib/blocks";
import type { TopicConfig } from "./topics";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ---------------------------------------------------------------------------
// 1. Generate article content via Claude
// ---------------------------------------------------------------------------

type GeneratedArticle = {
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  blocks: Block[];
};

async function generateArticleContent(topic: TopicConfig): Promise<GeneratedArticle> {
  const message = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Sei Dario Tana, consulente ecommerce con sede a Rimini. Scrivi un articolo professionale sul seguente argomento per il tuo blog:

ARGOMENTO: ${topic.topic}
FOCUS SEO: ${topic.seoFocus ?? topic.topic}

L'articolo deve essere:
- In italiano, tono professionale ma diretto e concreto
- Strutturato con un'introduzione, 3-4 sezioni con sottotitoli H2, e una conclusione con call-to-action
- Lungo circa 600-800 parole
- Utile per imprenditori e responsabili ecommerce italiani
- Con consigli pratici e actionable, non teoria generica

Rispondi SOLO con un oggetto JSON valido (nessun testo prima o dopo), con questa struttura esatta:
{
  "title": "Titolo dell'articolo (max 70 caratteri)",
  "excerpt": "Estratto breve di 1-2 frasi per le anteprime (max 160 caratteri)",
  "seoTitle": "Titolo SEO (max 60 caratteri)",
  "seoDescription": "Meta description SEO (max 155 caratteri)",
  "blocks": [
    { "id": "b1", "type": "paragraph", "text": "Testo introduttivo..." },
    { "id": "b2", "type": "heading", "level": 2, "text": "Prima sezione" },
    { "id": "b3", "type": "paragraph", "text": "..." },
    ...
  ]
}

Usa solo questi tipi di blocchi: paragraph, heading (con level 2 o 3), list (con ordered boolean e items array), quote (con text e cite opzionale), separator.
NON usare blocchi image o image-text — le immagini le gestiamo separatamente.
Ogni blocco deve avere un id univoco (b1, b2, b3, ecc.).`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude non ha restituito JSON valido");

  const parsed = JSON.parse(jsonMatch[0]) as GeneratedArticle;
  return parsed;
}

// ---------------------------------------------------------------------------
// 2. Fetch and upload cover image from Unsplash
// ---------------------------------------------------------------------------

async function fetchAndUploadCoverImage(
  keywords: string,
  title: string,
): Promise<number | null> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!unsplashKey) {
    console.warn("UNSPLASH_ACCESS_KEY non configurata — articolo senza immagine");
    return null;
  }

  const query = encodeURIComponent(keywords);
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&content_filter=high`,
    { headers: { Authorization: `Client-ID ${unsplashKey}` } },
  );

  if (!res.ok) {
    console.warn("Unsplash API error:", res.status, await res.text());
    return null;
  }

  const photo = (await res.json()) as {
    id: string;
    urls: { full: string; regular: string };
    user: { name: string };
    alt_description: string | null;
  };

  const imageRes = await fetch(photo.urls.regular);
  if (!imageRes.ok) return null;
  const imageBuffer = Buffer.from(await imageRes.arrayBuffer());

  const filename = `auto-${photo.id}.jpg`;
  const blob = await put(`media/${filename}`, imageBuffer, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/jpeg",
  });

  const [row] = await db
    .insert(media)
    .values({
      url: blob.url,
      pathname: blob.pathname,
      filename,
      mimeType: "image/jpeg",
      size: imageBuffer.length,
      altText: photo.alt_description ?? title,
    })
    .returning();

  return row.id;
}

// ---------------------------------------------------------------------------
// 3. Resolve category by slug
// ---------------------------------------------------------------------------

async function resolveCategoryId(slug: string): Promise<number | null> {
  const rows = await db.select().from(categories).where(eq(categories.slug, slug));
  return rows[0]?.id ?? null;
}

// ---------------------------------------------------------------------------
// 4. Main orchestrator
// ---------------------------------------------------------------------------

export type GenerateResult = {
  articleId: number;
  title: string;
  slug: string;
};

export async function generateAndSaveArticle(topic: TopicConfig): Promise<GenerateResult> {
  const [generated, categoryId] = await Promise.all([
    generateArticleContent(topic),
    resolveCategoryId(topic.categorySlug),
  ]);

  const coverMediaId = await fetchAndUploadCoverImage(topic.imageKeywords, generated.title);

  const slug = slugify(generated.title);
  const content = serializeBlocks(generated.blocks);

  const [article] = await db
    .insert(articles)
    .values({
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content,
      coverMediaId,
      authorId: null,
      status: "draft",
      seoTitle: generated.seoTitle,
      seoDescription: generated.seoDescription,
      publishedAt: null,
    })
    .returning();

  if (categoryId) {
    await db.insert(articleCategories).values({
      articleId: article.id,
      categoryId,
    });
  }

  return { articleId: article.id, title: article.title, slug: article.slug };
}
