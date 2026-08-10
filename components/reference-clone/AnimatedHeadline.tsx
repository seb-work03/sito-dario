"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  delay?: number;
};

/**
 * Section headline reveal. Splits the text into words, then staggers each
 * one from top with a blur that clears, giving a left-to-right sweep with
 * a single consistent "blur from above" style across the whole site.
 *
 * Also auto-inserts a <br/> after any word that ends in a period (except
 * the very last word), so multi-sentence titles like "3 ambiti. Un'unica
 * regia." break onto a new line after each period.
 */
export function AnimatedHeadline({ children, className, as = "h2", delay = 0 }: Props) {
  const text = typeof children === "string" ? children : null;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.055, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: -18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
    },
  };

  // Non-string children (with inline JSX): animate the whole node.
  if (!text) {
    const Tag = as === "h3" ? motion.h3 : motion.h2;
    return (
      <Tag
        className={className}
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </Tag>
    );
  }

  const words = text.split(" ");
  const Tag = as === "h3" ? motion.h3 : motion.h2;

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((w, i) => {
        const isLast = i === words.length - 1;
        const endsSentence = /\.$/.test(w) && !isLast;
        const trailingSpace = !isLast && !endsSentence ? " " : "";
        return (
          <Fragment key={i}>
            <motion.span
              variants={word}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {w}
              {trailingSpace}
            </motion.span>
            {endsSentence && <br />}
          </Fragment>
        );
      })}
    </Tag>
  );
}
