/**
 * Block-based article content model.
 *
 * Articles are stored in `articles.content` as one of two formats:
 *   1. Legacy markdown (backward compat) — anything that doesn't start with `[`
 *   2. JSON array of Block objects — new block editor output
 *
 * The frontend detects the format at render time via `tryParseBlocks`.
 */

export type ParagraphBlock = { id: string; type: "paragraph"; text: string };
export type HeadingBlock = { id: string; type: "heading"; level: 2 | 3; text: string };
export type ListBlock = {
  id: string;
  type: "list";
  ordered: boolean;
  items: string[];
};
export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
  alt: string;
  caption?: string;
};
export type ImageTextBlock = {
  id: string;
  type: "image-text";
  align: "left" | "right";
  url: string;
  alt: string;
  text: string;
};
export type QuoteBlock = { id: string; type: "quote"; text: string; cite?: string };
export type SeparatorBlock = { id: string; type: "separator" };

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | ImageBlock
  | ImageTextBlock
  | QuoteBlock
  | SeparatorBlock;

export type BlockType = Block["type"];

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

/**
 * Parse a stored `content` string as blocks. Returns null when the string is
 * not a valid JSON array of blocks — callers should fall back to markdown.
 */
export function tryParseBlocks(content: string): Block[] | null {
  const trimmed = content.trim();
  if (!trimmed.startsWith("[")) return null;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as Block[];
  } catch {
    return null;
  }
}

export function serializeBlocks(blocks: Block[]): string {
  return JSON.stringify(blocks);
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `b_${Math.random().toString(36).slice(2, 11)}`;
}

export function newBlock(type: BlockType): Block {
  const id = newId();
  switch (type) {
    case "paragraph":
      return { id, type, text: "" };
    case "heading":
      return { id, type, level: 2, text: "" };
    case "list":
      return { id, type, ordered: false, items: [""] };
    case "image":
      return { id, type, url: "", alt: "", caption: "" };
    case "image-text":
      return { id, type, align: "left", url: "", alt: "", text: "" };
    case "quote":
      return { id, type, text: "" };
    case "separator":
      return { id, type };
  }
}

// ---------------------------------------------------------------------------
// Plain-text extraction (for reading time, excerpt fallback)
// ---------------------------------------------------------------------------

export function blocksToPlainText(blocks: Block[]): string {
  const parts: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "paragraph":
      case "heading":
      case "quote":
        parts.push(b.text);
        break;
      case "list":
        parts.push(b.items.join(" "));
        break;
      case "image":
        if (b.caption) parts.push(b.caption);
        break;
      case "image-text":
        parts.push(b.text);
        break;
    }
  }
  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// Legacy markdown → blocks (best-effort auto-import when opening a legacy article)
// ---------------------------------------------------------------------------

const SHORTCODE_RE =
  /^<!--\s*(foto(?:-sinistra|-destra)?)\s*:\s*(https?:\/\/\S+?)(?:\s*\|\s*([^\n>]*?))?\s*-->\s*$/;

export function markdownToBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const chunks = markdown.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean);

  let i = 0;
  while (i < chunks.length) {
    const chunk = chunks[i];

    // Shortcode: foto | foto-sinistra | foto-destra
    const scMatch = SHORTCODE_RE.exec(chunk);
    if (scMatch) {
      const [, kind, url, alt = ""] = scMatch;
      if (kind === "foto") {
        blocks.push({ id: newId(), type: "image", url, alt, caption: alt });
      } else {
        const next = chunks[i + 1] ?? "";
        blocks.push({
          id: newId(),
          type: "image-text",
          align: kind === "foto-sinistra" ? "left" : "right",
          url,
          alt,
          text: next,
        });
        if (next) i += 1;
      }
      i += 1;
      continue;
    }

    // Headings
    if (chunk.startsWith("### ")) {
      blocks.push({ id: newId(), type: "heading", level: 3, text: chunk.slice(4) });
      i += 1;
      continue;
    }
    if (chunk.startsWith("## ")) {
      blocks.push({ id: newId(), type: "heading", level: 2, text: chunk.slice(3) });
      i += 1;
      continue;
    }

    // Blockquote
    if (chunk.startsWith("> ")) {
      const text = chunk
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join("\n");
      blocks.push({ id: newId(), type: "quote", text });
      i += 1;
      continue;
    }

    // Separator
    if (/^---+$/.test(chunk)) {
      blocks.push({ id: newId(), type: "separator" });
      i += 1;
      continue;
    }

    // Lists
    const listLines = chunk.split("\n");
    const isUnordered = listLines.every((l) => /^[-*]\s+/.test(l));
    const isOrdered = listLines.every((l) => /^\d+\.\s+/.test(l));
    if (isUnordered || isOrdered) {
      blocks.push({
        id: newId(),
        type: "list",
        ordered: isOrdered,
        items: listLines.map((l) => l.replace(/^([-*]|\d+\.)\s+/, "")),
      });
      i += 1;
      continue;
    }

    // Default: paragraph
    blocks.push({ id: newId(), type: "paragraph", text: chunk });
    i += 1;
  }

  return blocks;
}
