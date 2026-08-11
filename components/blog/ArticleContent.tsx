"use client";

import ReactMarkdown from "react-markdown";

type Block =
  | { type: "md"; content: string }
  | { type: "img-full"; url: string; alt: string }
  | { type: "img-left"; url: string; alt: string; text: string }
  | { type: "img-right"; url: string; alt: string; text: string };

// Matches: <!-- foto: URL | alt --> or <!-- foto-sinistra: URL | alt --> etc.
const SHORTCODE_RE =
  /<!--\s*(foto(?:-sinistra|-destra)?)\s*:\s*(https?:\/\/\S+?)(?:\s*\|\s*([^\n>]*?))?\s*-->/;

function parseBlocks(raw: string): Block[] {
  const blocks: Block[] = [];
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
      // Consume next paragraph (up to first blank line) as the paired text
      const stripped = after.replace(/^\n+/, "");
      const blankIdx = stripped.search(/\n\n/);
      const paraText = blankIdx === -1 ? stripped.trim() : stripped.slice(0, blankIdx).trim();
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
    <div className="rich-text">
      <ReactMarkdown
        components={{
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

export function ArticleContent({ content }: { content: string }) {
  const blocks = parseBlocks(content);

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

        // img-left or img-right
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
