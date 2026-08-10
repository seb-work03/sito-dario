"use client";

import { useEffect, useState } from "react";

type RevealOptions = {
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
};

/**
 * Returns Framer Motion props for a scroll-triggered entry animation that
 * never flashes.
 *
 * The flash ("element appears, then disappears for a frame, then animates in")
 * happens because `whileInView` is evaluated during the hydration window: the
 * element can paint in its natural state before Framer takes control. To
 * avoid it, we keep the element pinned to its hidden state (`animate` = hidden)
 * and only attach `whileInView` after the component has mounted on the client.
 *
 * Result: hidden from the very first paint (SSR + hydration) straight through
 * to the moment it scrolls into view — no visible/hidden flicker.
 *
 * Spread the return value onto any `motion.*` element; it leaves `ref`,
 * `className`, `style`, `href`, etc. untouched so refs keep working.
 */
export function useReveal({
  y = 20,
  delay = 0,
  duration = 0.8,
  amount = 0.2,
}: RevealOptions = {}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return {
    initial: { opacity: 0, y },
    animate: ready ? undefined : { opacity: 0, y },
    whileInView: ready ? { opacity: 1, y: 0 } : undefined,
    viewport: { once: true, amount, margin: "0px 0px 80px 0px" },
    transition: { duration, delay, ease: [0.19, 1, 0.22, 1] as const },
  };
}
