"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsDesktop } from "./useIsDesktop";

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
  return parts.map((p, i) => {
    const isLast = i === parts.length - 1;
    return (
      <Fragment key={i}>
        {p}
        {!isLast && "."}
        {!isLast && <br />}
      </Fragment>
    );
  });
}

/**
 * Standard reveal for body text and small labels: drops in from above with
 * a blur that clears. Same easing and shape as AnimatedHeadline so every
 * text on the site enters the same way.
 *
 * When children is a plain string, sentence-ending periods insert a line
 * break so subtitles like "Foo bar. Baz qux." land on two lines.
 */
export function AnimatedText({
  children,
  className,
  as = "p",
  delay = 0,
  duration = 0.8,
  amount = 0.2,
}: Props) {
  const rendered =
    typeof children === "string" ? withSentenceBreaks(children) : children;

  const isDesktop = useIsDesktop();
  const initial = isDesktop
    ? { opacity: 0, y: -14, filter: "blur(8px)" }
    : { opacity: 0, y: -14 };
  const whileInView = isDesktop
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 1, y: 0 };
  const transition = { duration, delay, ease: [0.19, 1, 0.22, 1] as const };
  const viewport = { once: true, amount, margin: "0px 0px 80px 0px" as const };

  if (as === "span") {
    return (
      <motion.span className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
        {rendered}
      </motion.span>
    );
  }
  if (as === "div") {
    return (
      <motion.div className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
        {rendered}
      </motion.div>
    );
  }
  return (
    <motion.p className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
      {rendered}
    </motion.p>
  );
}
