"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-20 md:top-24 left-0 right-0 z-40 h-[2px] bg-white/5 pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-0 bg-[#00e5ff]"
        style={{ boxShadow: "0 0 6px rgba(0,229,255,0.7)" }}
      />
    </div>
  );
}
