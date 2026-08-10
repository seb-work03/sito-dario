"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * CSS-only scroll reveal. The hidden state comes from the `.reveal` class in
 * reference-clone.css, so it's present from the first paint (no Framer, no
 * hydration flash). JS only flips `.is-visible` once the element scrolls into
 * view, which triggers the CSS transition.
 *
 * Use it as a wrapper around buttons/cards so their own hover transitions stay
 * independent from the entry animation.
 */
export function Reveal({
  as: Tag = "div",
  y = 20,
  delay = 0,
  duration = 0.8,
  amount = 0.15,
  className = "",
  style,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced-motion users are handled purely in CSS (the `.reveal` media
    // query shows the element up front), so JS only wires the observer.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
          "--reveal-dur": `${duration}s`,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
