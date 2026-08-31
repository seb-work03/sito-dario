import { Fragment, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "p" | "div" | "span";
  delay?: number;
  duration?: number;
  amount?: number;
};

function withSentenceBreaks(text: string): ReactNode {
  const parts = text.split(/\.\s+/);
  if (parts.length <= 1) return text;
  return parts.map((part, index) => {
    const isLast = index === parts.length - 1;
    return (
      <Fragment key={index}>
        {part}
        {!isLast && "."}
        {!isLast && <br />}
      </Fragment>
    );
  });
}

/** CSS-only body-copy reveal with a readable no-animation fallback. */
export function AnimatedText({
  children,
  className = "",
  as = "p",
  delay = 0,
}: Props) {
  const Tag = as;
  const rendered = typeof children === "string" ? withSentenceBreaks(children) : children;

  return (
    <Tag
      className={`view-reveal-copy ${className}`}
      style={{ "--view-reveal-delay": `${delay}s` } as CSSProperties}
    >
      {rendered}
    </Tag>
  );
}
