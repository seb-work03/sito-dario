"use client";

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

/**
 * Standard reveal for body text and small labels: drops in from above with
 * a blur that clears. Same easing and shape as AnimatedHeadline so every
 * text on the site enters the same way.
 */
export function AnimatedText({
  children,
  className,
  as = "p",
  delay = 0,
  duration = 0.8,
  amount = 0.2,
}: Props) {
  const initial = { opacity: 0, y: -14, filter: "blur(8px)" };
  const whileInView = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = { duration, delay, ease: [0.19, 1, 0.22, 1] as const };
  const viewport = { once: true, amount };

  if (as === "span") {
    return (
      <motion.span className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
        {children}
      </motion.span>
    );
  }
  if (as === "div") {
    return (
      <motion.div className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.p className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
      {children}
    </motion.p>
  );
}
