"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  delay?: number;
  duration?: number;
};

/**
 * Section headline reveal: slides up from below into an overflow-hidden
 * wrapper.
 *
 * A timeout fallback forces the visible state after 1.2s no matter what.
 * Without it, a missed IntersectionObserver callback (sticky ancestors and
 * transformed parents can swallow it) would leave the text parked at
 * y:115% inside the clipping wrapper — invisible, permanently.
 */
export function AnimatedHeadline({
  children,
  className,
  as = "h2",
  delay = 0,
  duration = 0.9,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const show = inView || fallback;

  const inner = (
    // pb/-mb pair keeps descenders (g, p, q) from being clipped by the wrapper
    <span ref={ref} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className="inline-block"
        initial={{ y: "115%", opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
        transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );

  if (as === "h3") return <h3 className={className}>{inner}</h3>;
  return <h2 className={className}>{inner}</h2>;
}
