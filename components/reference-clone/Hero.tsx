"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  return (
    <section ref={ref} className="relative bg-[#0D1218] pt-[110px] pb-6 px-5">
      <div className="mx-auto max-w-[1240px] relative">
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-0 text-center font-bold text-[#EDF2F7] whitespace-nowrap select-none overflow-hidden mb-[10%]"
        >
          <span
            className="inline-block"
            style={{
              fontSize: "clamp(2.75rem, 12.8vw, 12.25rem)",
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
              Decisioni.
            </motion.span>
          </span>
        </motion.h1>

        {/* Gradient card — Adviest-style, sits above title, below photo */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 -mt-6 sm:-mt-16 md:-mt-24 lg:-mt-32 rounded-[40px] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(256deg, rgba(119, 192, 207, 0.92) 0%, rgba(44, 130, 150, 0.88) 35%, rgba(13, 18, 24, 0.96) 100%)",
            }}
          />
          {/* Animated ambient glow */}
          <motion.div
            aria-hidden
            className="absolute -top-1/2 -right-1/4 w-[60%] h-[200%] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(119,192,207,0.35), transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid grid-cols-[1fr_auto_1fr] items-end md:items-center gap-2 md:gap-4 min-h-[clamp(320px,55vw,521px)] px-5 sm:px-6 md:px-10 py-6 md:py-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-[#EDF2F7] font-normal text-[13px] sm:text-[20px] md:text-[40px] leading-[1.25] md:leading-[1.2] max-w-[140px] sm:max-w-[220px] md:max-w-[360px]"
            >
              Consulenza e formazione e-commerce indipendente.
            </motion.p>

            {/* Spacer per la foto che sborda */}
            <div className="w-[clamp(200px,34vw,410px)] shrink-0" aria-hidden="true" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="hidden md:block text-[#C1CEDF] text-[15px] md:text-[18px] leading-relaxed max-w-[320px] justify-self-end text-right"
            >
              Aiuto aziende, imprenditori e responsabili e-commerce ad analizzare
              i problemi, definire le priorità e prendere decisioni più
              consapevoli.
            </motion.p>
          </div>
        </motion.div>

        {/* Portrait — Dario, overflow on card */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="absolute z-20 left-1/2 -translate-x-1/2 bottom-0 w-[clamp(200px,34vw,410px)] aspect-[410/689] pointer-events-none"
        >
          <Image
            src="/reference-assets/adviest/i3hyvUzl7FhrcIR6gR2nigcrK0.png"
            alt="[RITRATTO DARIO TANA DA INSERIRE] — ritratto ambientato, luce laterale morbida"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 260px, 410px"
          />
        </motion.div>
      </div>
    </section>
  );
}
