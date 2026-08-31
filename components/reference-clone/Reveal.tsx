import {
  forwardRef,
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

/** Lightweight CSS scroll reveal that keeps forwarded refs for timelines. */
export const Reveal = forwardRef<HTMLElement, Props>(function Reveal(
  {
    as: Tag = "div",
    y = 20,
    delay = 0,
    duration = 0.8,
    className = "",
    style,
    children,
  },
  forwardedRef,
) {
  const TagAny = Tag as ElementType;
  const mergedStyle = {
    "--reveal-y": `${y}px`,
    "--view-reveal-delay": `${delay}s`,
    "--view-reveal-duration": `${duration}s`,
    ...(style ?? {}),
  } as CSSProperties;

  return (
    <TagAny
      ref={forwardedRef as Ref<HTMLElement>}
      className={`view-reveal${className ? ` ${className}` : ""}`}
      style={mergedStyle}
    >
      {children}
    </TagAny>
  );
});

Reveal.displayName = "Reveal";
