"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const audiences = [
  {
    label: "Imprenditori",
    intro: "Chi guida un'azienda e deve decidere in autonomia strategica.",
    bullets: [
      "Scelte di piattaforma e stack",
      "Priorità di investimento",
      "Valutazione di fornitori",
      "Piani di crescita realistici",
    ],
  },
  {
    label: "Responsabili e-commerce",
    intro: "Chi gestisce operativamente il canale e cerca un confronto senior.",
    bullets: [
      "Audit indipendente del progetto",
      "Supporto nelle decisioni difficili",
      "Revisione dei processi interni",
      "Coordinamento tra fornitori",
    ],
  },
  {
    label: "Enti formativi e docenti",
    intro: "Chi progetta percorsi e cerca contenuti verticali con casi reali.",
    bullets: [
      "Docenza in master e executive",
      "Interventi in eventi",
      "Percorsi formativi custom",
      "Workshop verticali",
    ],
  },
];

export function Insights() {
  // A ref on the grid triggers the sequential card animation only once the
  // grid enters view, so all three cards enter one at a time with a stagger.
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section id="insights" className="bg-[#0D1218] px-5 pt-20 md:pt-32 pb-16 md:pb-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px]">
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
            A chi mi rivolgo
          </AnimatedHeadline>
          <AnimatedText
            className="text-[#dddddd] mt-5 leading-relaxed text-base md:text-lg mx-auto max-w-xl"
            delay={0.1}
          >
            Tre profili ricorrenti nel mio lavoro. Se ti riconosci in uno di questi, probabilmente possiamo parlarci.
          </AnimatedText>
        </div>

        {/* 3 vertical persona cards — enter one at a time */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-5 md:gap-6">
          {audiences.map((a, i) => (
            <motion.article
              key={a.label}
              initial={{ opacity: 0, y: 24 }}
              animate={
                gridInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.7,
                delay: i * 0.18,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group relative rounded-2xl border border-[#253444] bg-[#17222F] p-7 md:p-8 flex flex-col gap-5 transition-all duration-500 hover:border-[#00e5ff]/40 hover:-translate-y-1"
            >
              <div>
                <h3 className="text-[#EDF2F7] text-2xl font-medium tracking-tight leading-[1.15] mb-2">
                  {a.label}
                </h3>
                <p className="text-[#dddddd] text-sm leading-relaxed">{a.intro}</p>
              </div>

              <div className="h-px bg-white/8" />

              <ul className="flex flex-col gap-2.5">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[#DDE5EF] text-sm leading-snug">
                    <span
                      aria-hidden
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
