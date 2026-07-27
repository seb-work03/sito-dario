"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FALLBACK_PORTRAIT_URL =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/media/Dario%20tana-VPnb7FSkCeuXKwy4rdEsImphyzlhbs.png";

export function Hero({ portraitUrl }: { portraitUrl?: string | null } = {}) {
  const portrait = portraitUrl ?? FALLBACK_PORTRAIT_URL;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  return (
    <section ref={ref} className="relative bg-[#0D1218] pt-[92px] md:pt-[108px]">
      {/* Big name title — inside max-width container */}
      <div className="mx-auto max-w-[1240px] px-5 relative">
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-0 text-center font-bold text-[#EDF2F7] whitespace-nowrap select-none overflow-hidden mb-[11%]"
        >
          <span
            className="inline-block"
            style={{
              fontSize: "clamp(3rem, min(14.5vw, 20vh), 14rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.07em",
            }}
          >
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="inline-block"
            >
              Dario Tana
            </motion.span>
          </span>
        </motion.h1>
      </div>

      {/* Card + portrait — card stretches full viewport width */}
      <motion.div style={{ y: cardY }} className="relative -mt-[11%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(256deg, rgba(0, 229, 255, 0.92) 0%, rgba(0, 138, 153, 0.88) 35%, rgba(13, 18, 24, 0.96) 100%)",
            }}
          />
          {/* Animated ambient glow */}
          <motion.div
            aria-hidden
            className="absolute -top-1/2 -right-1/4 w-[60%] h-[200%] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(0,229,255,0.35), transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Text grid — constrained to max-width */}
          <div className="relative mx-auto max-w-[1240px] grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4 min-h-[clamp(320px,min(55vw,56vh),521px)] px-5 sm:px-6 md:px-10 py-6 md:py-0">
            {/* Left: two-part tagline with bold keywords */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-white md:text-[#EDF2F7] font-normal text-[16px] sm:text-[18px] md:text-[32px] leading-[1.3] md:leading-[1.25] max-w-[140px] sm:max-w-[220px] md:max-w-[380px]"
            >
              <strong className="font-semibold">Consulenza strategica</strong> per PMI che rifiutano la mediocrità,{" "}
              <strong className="font-semibold">formazione avanzata</strong> per corporate ed eventi di settore.
            </motion.p>

            {/* Spacer for portrait overflow */}
            <div className="w-[clamp(252px,38vw,400px)] md:w-[clamp(264px,23.5vw,560px)] shrink-0" aria-hidden="true" />

            {/* Right: punchy headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="hidden md:block text-[#EDF2F7] text-[15px] md:text-[20px] leading-[1.3] max-w-[320px] justify-self-end text-right font-medium"
            >
              Non costruisco siti. Guido la crescita di E‑commerce che fanno la differenza.
            </motion.p>
          </div>
        </motion.div>

        {/* Portrait — overflows card top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="absolute z-20 left-[67%] -translate-x-1/2 md:left-1/2 bottom-0 w-[clamp(252px,38vw,400px)] md:w-[clamp(264px,23.5vw,560px)] aspect-[650/1080] pointer-events-none"
        >
          <Image
            src={portrait}
            alt="Ritratto di Dario Tana"
            fill
            priority
            unoptimized
            className="object-cover object-top"
            sizes="(max-width: 768px) 300px, 560px"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
