"use client";

import { motion } from "framer-motion";
import { forwardRef, type CSSProperties, type ReactNode, type Ref } from "react";

type Props = {
  as?: "div" | "li";
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Shared Framer reveal for cards, rows and supporting interface elements. */
export const Reveal = forwardRef<HTMLElement, Props>(function Reveal(
  {
    as = "div",
    y = 20,
    delay = 0,
    duration = 0.8,
    amount = 0.15,
    className,
    style,
    children,
  },
  forwardedRef,
) {
  const animation = {
    initial: { opacity: 0, y, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount, margin: "0px 0px -8% 0px" },
    transition: { duration, delay, ease: [0.19, 1, 0.22, 1] as const },
    className,
    style,
  };

  if (as === "li") {
    return (
      <motion.li ref={forwardedRef as Ref<HTMLLIElement>} {...animation}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div ref={forwardedRef as Ref<HTMLDivElement>} {...animation}>
      {children}
    </motion.div>
  );
});

Reveal.displayName = "Reveal";
