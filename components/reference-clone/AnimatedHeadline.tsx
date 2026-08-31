import type { CSSProperties, ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

type Props = {
  children: ReactNode;
  className?: string;
  as?: HeadingTag;
  delay?: number;
};

/**
 * Progressive CSS-only heading reveal. It preserves the visual entrance
 * without per-word DOM nodes, React state or animation-library JavaScript.
 */
export function AnimatedHeadline({ children, className = "", as = "h2", delay = 0 }: Props) {
  const Tag = as;
  return (
    <Tag
      className={`view-reveal-heading ${className}`}
      style={{ "--view-reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
