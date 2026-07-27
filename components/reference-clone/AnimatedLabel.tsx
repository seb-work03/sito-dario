"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated section label: text reveals left-to-right via width animation.
 * Usage: <AnimatedLabel>IL METODO</AnimatedLabel>
 */
export function AnimatedLabel({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span
      ref={ref}
      className="inline-flex items-center text-sm tracking-widest text-[#00e5ff]/70 overflow-hidden"
    >
      <motion.span
        className="overflow-hidden inline-block"
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: "auto", opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        style={{ whiteSpace: "nowrap" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
