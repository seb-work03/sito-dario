/**
 * Lightweight label reveal. The animation is delegated to CSS so the label
 * does not create React state or an IntersectionObserver.
 * Usage: <AnimatedLabel>IL METODO</AnimatedLabel>
 */
export function AnimatedLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center overflow-hidden text-sm tracking-widest text-[#00e5ff]/70">
      <span className="view-reveal-label inline-block whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}
