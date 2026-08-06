"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const audiences = [
  {
    number: "01",
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
    number: "02",
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
    number: "03",
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
  return (
    <section id="insights" className="bg-[#0D1218] px-5 pt-20 md:pt-32 pb-16 md:pb-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl mb-4 tracking-tight">
          Progetti diversi, un metodo condiviso.
        </AnimatedHeadline>
        <AnimatedText className="text-[#94A9BE] max-w-lg mb-12 md:mb-16 leading-relaxed" delay={0.1}>
          Ogni contesto richiede uno sguardo dedicato, ma il modo di leggere i
          problemi resta lo stesso.
        </AnimatedText>

        {/* 3 vertical persona cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {audiences.map((a, i) => (
            <motion.article
              key={a.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group relative rounded-2xl border border-[#253444] bg-[#17222F] p-7 md:p-8 flex flex-col gap-5 transition-all duration-500 hover:border-[#00e5ff]/40 hover:-translate-y-1"
            >
              {/* Number badge */}
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#00e5ff] text-[#0D1218] text-sm font-semibold tabular-nums transition-shadow duration-500 group-hover:shadow-[0_0_16px_rgba(0,229,255,0.55)]">
                  {a.number}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-[#4F6577] group-hover:text-[#00e5ff] transition-all duration-500 group-hover:-rotate-45"
                />
              </div>

              {/* Label + intro */}
              <div>
                <h3 className="text-[#EDF2F7] text-2xl font-medium tracking-tight leading-[1.15] mb-2">
                  {a.label}
                </h3>
                <p className="text-[#94A9BE] text-sm leading-relaxed">{a.intro}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8" />

              {/* Bullet list */}
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
