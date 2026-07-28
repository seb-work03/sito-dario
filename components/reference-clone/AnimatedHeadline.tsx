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
 * Section headline reveal: slides up from below into an overflow-hidden
 * wrapper. Works reliably for multi-line text and never leaves the text
 * stuck at the initial (hidden) state.
 */
export function AnimatedHeadline({
  children,
  className,
  as = "h2",
  delay = 0,
  duration = 0.95,
}: Props) {
  const inner = (
    <motion.span
      className="inline-block"
      style={{ willChange: "transform, opacity" }}
      initial={{ y: "115%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] as const }}
    >
      {children}
    </motion.span>
  );

  const wrapperClass = `${className ?? ""} block overflow-hidden`;

  if (as === "h3") {
    return <h3 className={wrapperClass}>{inner}</h3>;
  }
  return <h2 className={wrapperClass}>{inner}</h2>;
}
