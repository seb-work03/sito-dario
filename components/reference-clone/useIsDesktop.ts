"use client";

import { useEffect, useState } from "react";

/**
 * True on desktop-sized viewports (>= 768px). Starts false so SSR + first
 * paint match the mobile-first markup, then flips after mount. Used to gate
 * the blur filter in entry animations: blur promotes elements to their own
 * compositor layer, which causes a one-frame jump on mobile — so we only
 * enable it on desktop where it stays smooth.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handle = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  return isDesktop;
}
