"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
 * `will-change` is set while the element is animating so the browser
 * pre-promotes the compositor layer (transform + filter), which removes the
 * one-frame "jump" at the start of the animation. Once the animation
 * finishes we clear it so idle elements don't hold GPU layers.
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

  const [done, setDone] = useState(false);

  const common = {
    className,
    initial: { opacity: 0, y: -14, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration, delay, ease: [0.19, 1, 0.22, 1] as const },
    viewport: { once: true, amount, margin: "0px 0px 80px 0px" },
    style: { willChange: done ? "auto" : "transform, opacity, filter" },
    onAnimationComplete: () => setDone(true),
  };

  if (as === "span") {
    return <motion.span {...common}>{rendered}</motion.span>;
  }
  if (as === "div") {
    return <motion.div {...common}>{rendered}</motion.div>;
  }
  return <motion.p {...common}>{rendered}</motion.p>;
}
