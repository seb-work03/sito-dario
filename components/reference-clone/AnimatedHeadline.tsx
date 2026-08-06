"use client";

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
    hidden: { opacity: 0, y: -18, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
    },
  };

  // Non-string children (with inline JSX): animate the whole node.
  if (!text) {
    const Tag = as === "h3" ? motion.h3 : motion.h2;
    return (
      <Tag
        className={className}
        initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
