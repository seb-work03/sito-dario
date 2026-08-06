"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

/**
 * A full-width cyan CTA section before the footer.
 * Strong contrast, minimal, just a headline and a call to action.
 */
export function AccentCta() {
  return (
    <section
      className="px-5 py-20 md:py-28"
      style={{
        background: "linear-gradient(135deg, #00e5ff 0%, #008a99 100%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] text-center flex flex-col items-center gap-8">
        <AnimatedText
          className="text-[#0D1218]/60 text-xs uppercase tracking-[0.2em]"
        >
          Inizia da qui
        </AnimatedText>

        <AnimatedHeadline
          delay={0.1}
          className="text-[#0D1218] font-medium text-[32px] md:text-[56px] leading-[1.05] tracking-tight max-w-3xl text-balance"
        >
          Pronto a costruire qualcosa che funziona davvero?
        </AnimatedHeadline>

        <motion.a
          initial={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          href="/contatti"
          className="group inline-flex items-center gap-2 rounded-full bg-[#0D1218] text-[#00e5ff] font-medium pl-6 pr-2 py-2 text-[16px] transition-all duration-500 hover:shadow-[0_0_32px_rgba(13,18,24,0.4)]"
        >
          Parliamone
          <span className="flex items-center justify-center rounded-full bg-[#00e5ff] text-[#0D1218] w-10 h-10 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
