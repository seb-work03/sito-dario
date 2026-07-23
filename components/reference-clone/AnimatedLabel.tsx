"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Animated section label: brackets [ ] appear first, then the inner text reveals left-to-right.
 * Usage: <AnimatedLabel>IL METODO</AnimatedLabel>
 */
export function AnimatedLabel({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-0 font-mono text-sm tracking-widest text-[#77C0CF]/70 overflow-hidden"
    >
      {/* Left bracket */}
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        [
      </motion.span>

      {/* Text reveals left-to-right using clip-path */}
      <motion.span
        className="overflow-hidden inline-block mx-1"
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: "auto", opacity: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        style={{ whiteSpace: "nowrap" }}
      >
        {children}
      </motion.span>

      {/* Right bracket */}
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.75, ease: [0.19, 1, 0.22, 1] }}
      >
        ]
      </motion.span>
    </span>
  );
}
