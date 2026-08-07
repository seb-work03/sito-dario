type Props = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

/**
 * Horizontal right arrow that rotates -45° (up-right) on parent hover.
 * Requires the parent to have the `group` class.
 */
export function HoverArrow({ size = 16, className = "", strokeWidth = 2 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45 ${className}`}
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
