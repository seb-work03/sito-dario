"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const MotionTag = as === "h3" ? motion.h3 : motion.h2;

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={inView ? { clipPath: "inset(0 0 0 0)" } : {}}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </MotionTag>
  );
}
