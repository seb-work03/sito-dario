import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Estimate reading time in minutes for Italian prose. Handles both new
 * block-JSON articles (extracting the plain text of every block) and
 * legacy markdown. Strips markdown syntax before counting words, then
 * divides by an average adult reading rate of 200 wpm. Always returns
 * at least 1.
 */
export function readingTimeMinutes(content: string): number {
  const trimmed = content.trim();
  let source = content;
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed) as Array<Record<string, unknown>>;
      if (Array.isArray(parsed)) {
        source = parsed
          .map((b) => {
            if (typeof b.text === "string") return b.text;
            if (Array.isArray(b.items)) return b.items.join(" ");
            if (typeof b.caption === "string") return b.caption;
            return "";
          })
          .join(" ");
      }
    } catch {
      // fall through to raw string
    }
  }
  const plain = source
    // Remove code fences and their content
    .replace(/```[\s\S]*?```/g, " ")
    // Remove inline code
    .replace(/`[^`]*`/g, " ")
    // Remove image markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    // Turn link markdown into just the visible text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // Strip remaining markdown punctuation
    .replace(/[#>*_~`>|-]/g, " ")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return 1;
  const words = plain.split(" ").length;
  return Math.max(1, Math.round(words / 200));
}
