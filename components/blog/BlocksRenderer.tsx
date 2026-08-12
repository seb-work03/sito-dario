import ReactMarkdown from "react-markdown";
import type { Block } from "@/lib/blocks";
import { slugify } from "@/lib/utils";

/**
 * Renders an array of Block objects on the frontend article page. Inline
 * text (in paragraph, list item, image-text) is treated as markdown so
 * users can still write **bold**, *italic*, [link](url).
 */
export function BlocksRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-10">
      {blocks.map((block) => (
        <BlockView key={block.id} block={block} />
      ))}
    </div>
  );
}

function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <>{children}</>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      if (block.text.trim().startsWith("<")) {
        return (
          <div
            className="rich-text prose prose-sm max-w-none text-[#EDF2F7] [&_h2]:text-2xl [&_h2]:font-semibold [[&_h2]:mt-8_h2]:mt-5 [&_h2]:mb-3 [&_h2]:text-[#EDF2F7] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-[#EDF2F7] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-2 [&_blockquote]:border-[#77C0CF] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#93A6BB] [&_a]:text-[#77C0CF] [&_a]:underline [&_strong]:text-white [&_em]:text-[#B8C8D8]"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        );
      }
      return (
        <div className="rich-text">
          <p>
            <InlineMarkdown>{block.text}</InlineMarkdown>
          </p>
        </div>
      );

    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      const id = block.level === 2 ? slugify(block.text.replace(/<[^>]+>/g, "")) : undefined;
      return (
        <div className="rich-text">
          <Tag id={id}>{block.text}</Tag>
        </div>
      );
    }

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <div className="rich-text">
          <Tag>
            {block.items.map((item, i) => (
              <li key={i}>
                <InlineMarkdown>{item}</InlineMarkdown>
              </li>
            ))}
          </Tag>
        </div>
      );
    }

    case "image":
      if (!block.url) return null;
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt}
            className="w-full rounded-xl object-cover"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-[13px] text-[#93A6BB] italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "image-text":
      if (!block.url) return null;
      return (
        <div
          className={`flex flex-col gap-6 items-start md:flex-row${
            block.align === "left" ? "" : " md:flex-row-reverse"
          }`}
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
            <p>
              <InlineMarkdown>{block.text}</InlineMarkdown>
            </p>
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="rich-text">
          <blockquote>
            {block.text.trim().startsWith("<") ? (
              <span dangerouslySetInnerHTML={{ __html: block.text }} />
            ) : (
              <InlineMarkdown>{block.text}</InlineMarkdown>
            )}
            {block.cite && (
              <footer className="mt-2 text-[13px] text-[#93A6BB] not-italic">
                — {block.cite}
              </footer>
            )}
          </blockquote>
        </div>
      );

    case "separator":
      return (
        <hr className="border-t border-white/8 my-2" />
      );
  }
}
