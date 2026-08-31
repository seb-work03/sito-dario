import { Fragment, type CSSProperties, type ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

type Props = {
  children: ReactNode;
  className?: string;
  as?: HeadingTag;
  delay?: number;
};

/** Lightweight word-by-word version of the original Framer headline reveal. */
export function AnimatedHeadline({ children, className = "", as = "h2", delay = 0 }: Props) {
  const Tag = as;
  const text = typeof children === "string" ? children : null;

  if (text) {
    const words = text.split(" ");

    return (
      <Tag
        className={`view-reveal-heading view-reveal-words ${className}`}
        style={{ "--view-reveal-delay": `${delay}s` } as CSSProperties}
      >
        {words.map((word, index) => {
          const isLast = index === words.length - 1;
          const endsSentence = /\.$/.test(word) && !isLast;

          return (
            <Fragment key={`${word}-${index}`}>
              <span
                className="view-reveal-word"
                style={{ "--word-index": index } as CSSProperties}
              >
                {word}
                {!isLast && !endsSentence ? "\u00a0" : ""}
              </span>
              {endsSentence ? <br /> : null}
            </Fragment>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag
      className={`view-reveal-heading ${className}`}
      style={{ "--view-reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
