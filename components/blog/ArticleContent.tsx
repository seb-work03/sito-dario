"use client";

import ReactMarkdown from "react-markdown";
import { tryParseBlocks } from "@/lib/blocks";
import { slugify } from "@/lib/utils";
import { BlocksRenderer } from "./BlocksRenderer";

// ---------------------------------------------------------------------------
// Legacy markdown parser (kept for backward compat with pre-blocks articles)
// ---------------------------------------------------------------------------

type LegacyBlock =
  | { type: "md"; content: string }
  | { type: "img-full"; url: string; alt: string }
  | { type: "img-left"; url: string; alt: string; text: string }
  | { type: "img-right"; url: string; alt: string; text: string };

const SHORTCODE_RE =
  /<!--\s*(foto(?:-sinistra|-destra)?)\s*:\s*(https?:\/\/\S+?)(?:\s*\|\s*([^\n>]*?))?\s*-->/;

function parseLegacyBlocks(raw: string): LegacyBlock[] {
  const blocks: LegacyBlock[] = [];
  let remaining = raw;

  while (remaining.length > 0) {
    const m = SHORTCODE_RE.exec(remaining);
    if (!m) {
      const trimmed = remaining.trim();
      if (trimmed) blocks.push({ type: "md", content: trimmed });
      break;
    }

    const before = remaining.slice(0, m.index).trim();
    if (before) blocks.push({ type: "md", content: before });

    const [fullMatch, kind, url, alt = ""] = m;
    const after = remaining.slice(m.index + fullMatch.length);

    if (kind === "foto") {
      blocks.push({ type: "img-full", url: url.trim(), alt: alt.trim() });
      remaining = after.trim();
    } else {
      const stripped = after.replace(/^\n+/, "");
      const blankIdx = stripped.search(/\n\n/);
      const paraText =
        blankIdx === -1 ? stripped.trim() : stripped.slice(0, blankIdx).trim();
      const rest = blankIdx === -1 ? "" : stripped.slice(blankIdx + 2).trim();
      blocks.push({
        type: kind === "foto-sinistra" ? "img-left" : "img-right",
        url: url.trim(),
        alt: alt.trim(),
        text: paraText,
      });
      remaining = rest;
    }
  }

  return blocks;
}

function MdBlock({ content }: { content: string }) {
  return (
    <div className="rich-text article-rich-text">
      <ReactMarkdown
        components={{
          h2: ({ children }) => {
            const text = String(children ?? "");
            return <h2 id={slugify(text)}>{children}</h2>;
          },
          img: ({ src, alt }) => (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt ?? ""} className="w-full rounded-xl object-cover" />
              {alt && (
                <figcaption className="mt-2 text-center text-[13px] text-[#93A6BB] italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function LegacyRenderer({ content }: { content: string }) {
  const blocks = parseLegacyBlocks(content);

  return (
    <div className="flex flex-col gap-10">
      {blocks.map((block, i) => {
        if (block.type === "md") {
          return <MdBlock key={i} content={block.content} />;
        }

        if (block.type === "img-full") {
          return (
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.url}
                alt={block.alt}
                className="w-full rounded-xl object-cover"
              />
              {block.alt && (
                <figcaption className="mt-2 text-center text-[13px] text-[#93A6BB] italic">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        const isLeft = block.type === "img-left";
        return (
          <div
            key={i}
            className={`flex flex-col gap-6 items-start md:flex-row${isLeft ? "" : " md:flex-row-reverse"}`}
          >
            <div className="w-full md:w-[42%] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.url}
                alt={block.alt}
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="flex-1 rich-text">
              <ReactMarkdown>{block.text}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// HTML renderer (Tiptap output)
// ---------------------------------------------------------------------------

function addH2Ids(html: string): string {
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    if (!id) return `<h2${attrs}>${inner}</h2>`;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
}

function HtmlRenderer({ content }: { content: string }) {
  return (
    <div
      className="rich-text article-rich-text prose max-w-none text-[#EDF2F7] [&_h2]:font-semibold [&_h2]:text-[#EDF2F7] [&_h3]:font-semibold [&_h3]:text-[#EDF2F7] [&_h4]:font-semibold [&_h4]:text-[#EDF2F7] [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#00e5ff] [&_blockquote]:pl-5 [&_blockquote]:italic [&_a]:text-[#00e5ff] [&_a]:underline [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_code]:rounded [&_pre]:overflow-x-auto [&_strong]:text-white"
      dangerouslySetInnerHTML={{ __html: addH2Ids(content) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Dispatch: HTML → HtmlRenderer, JSON blocks → BlocksRenderer, else legacy
// ---------------------------------------------------------------------------

export function ArticleContent({ content }: { content: string }) {
  const trimmed = content.trim();
  // Tiptap HTML output
  if (trimmed.startsWith("<")) return <HtmlRenderer content={content} />;
  // Old JSON block format
  const blocks = tryParseBlocks(content);
  if (blocks) return <BlocksRenderer blocks={blocks} />;
  // Legacy markdown
  return <LegacyRenderer content={content} />;
}
