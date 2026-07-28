"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  delay?: number;
  duration?: number;
};

/**
 * Section headline with a left-to-right clip-path reveal.
 * Works for wrapping multi-line text (unlike a width animation).
 */
export function AnimatedHeadline({
  children,
  className,
  as = "h2",
  delay = 0,
  duration = 1.1,
}: Props) {
  const commonProps = {
    className,
    initial: { clipPath: "inset(0 100% 0 0)" },
    whileInView: { clipPath: "inset(0 0 0 0)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay, ease: [0.19, 1, 0.22, 1] as const },
  };

  if (as === "h3") {
    return <motion.h3 {...commonProps}>{children}</motion.h3>;
  }
  return <motion.h2 {...commonProps}>{children}</motion.h2>;
}
