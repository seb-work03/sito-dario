"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";

type Props = {
  as?: ElementType;
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * CSS-only scroll reveal. The hidden state comes from the `.reveal` class in
 * reference-clone.css, so it's present from the first paint (no Framer, no
 * hydration flash). JS only flips `.is-visible` once the element scrolls into
 * view, which triggers the CSS transition.
 *
 * ref is forwarded to the underlying DOM element so callers can measure the
 * position of the revealed row (e.g. Experience's timeline dots).
 */
export const Reveal = forwardRef<HTMLElement, Props>(function Reveal(
  {
    as: Tag = "div",
    y = 20,
    delay = 0,
    duration = 0.8,
    amount = 0.15,
    className = "",
    style,
    children,
  },
  forwardedRef,
) {
  const innerRef = useRef<HTMLElement | null>(null);
  useImperativeHandle(forwardedRef, () => innerRef.current as HTMLElement);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
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

  const TagAny = Tag as ElementType;
  const mergedStyle = {
    "--reveal-y": `${y}px`,
    "--reveal-delay": `${delay}s`,
    "--reveal-dur": `${duration}s`,
    ...(style ?? {}),
  } as CSSProperties;

  return (
    <TagAny
      ref={innerRef as Ref<HTMLElement>}
      className={`reveal${shown ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
    >
      {children}
    </TagAny>
  );
});
Reveal.displayName = "Reveal";
