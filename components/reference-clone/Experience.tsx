"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const engagements = [
  {
    number: "01",
    title: "Insegno e-commerce in aula",
    description:
      "Lezioni in master, corsi ITS e percorsi post-diploma. Porto in aula casi veri e numeri veri, non slide riciclate. Le persone escono con idee chiare su come funziona davvero un e-commerce.",
  },
  {
    number: "02",
    title: "Affianco imprenditori nelle scelte importanti",
    description:
      "Quando serve decidere quale piattaforma usare, dove investire o quale fornitore scegliere, mi siedo accanto all'imprenditore e ragioniamo insieme. Nessuna soluzione preconfezionata.",
  },
  {
    number: "03",
    title: "Sono il consulente esterno degli e-commerce manager",
    description:
      "Chi gestisce l'e-commerce dentro un'azienda ha spesso bisogno di un confronto senior indipendente. Sono la persona con cui parlare quando le decisioni sono difficili e serve una seconda opinione onesta.",
  },
  {
    number: "04",
    title: "Formo team aziendali dall'interno",
    description:
      "Percorsi costruiti sull'azienda che ho davanti: si parte dalle basi operative e si arriva alle scelte strategiche, con esercitazioni sui casi reali del team.",
  },
  {
    number: "05",
    title: "Intervengo in eventi e conferenze",
    description:
      "Keynote, talk e panel per eventi, associazioni di categoria e community verticali. Contenuti pratici, non teoria astratta.",
  },
];

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  // The line fills while the timeline block is between center-viewport and
  // its end passes center-viewport: reads naturally as "scroll = fill".
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px] md:w-4/5">
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
            Dove posso esserti utile.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.12}
            className="text-[#dddddd] leading-relaxed mt-5 max-w-[80%] mx-auto"
          >
            5 modi in cui lavoro con aziende, team ed enti formativi.
          </AnimatedText>
        </div>

        {/* Timeline rail */}
        <div ref={timelineRef} className="relative">
          {/* Base rail (dim) — sits behind the fill */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[28px] md:left-[70px] w-px bg-white/8"
          />
          {/* Fill rail — grows with scroll */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute top-0 left-[28px] md:left-[70px] w-px bg-gradient-to-b from-[#00e5ff] via-[#00e5ff] to-[#00e5ff]/70 shadow-[0_0_16px_rgba(0,229,255,0.65)]"
          />

          {/* Rows */}
          <ul className="flex flex-col">
            {engagements.map((e, i) => (
              <motion.li
                key={e.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="relative grid grid-cols-[56px_1fr] md:grid-cols-[140px_1fr] gap-x-5 md:gap-x-14 pl-0 py-10 md:py-14"
              >
                {/* Left column: number + node dot */}
                <div className="relative flex justify-start md:justify-end">
                  {/* Node dot centered on the rail */}
                  <span
                    aria-hidden
                    className="absolute left-[28px] md:left-[70px] top-[10px] -translate-x-1/2 w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.65)] ring-4 ring-[#0D1218]"
                  />
                  {/* Number */}
                  <span className="text-[#00e5ff] font-bold tabular-nums leading-none tracking-tight text-[40px] md:text-[80px] ml-0 md:ml-0 pl-14 md:pl-0 md:pr-6">
                    {e.number}
                  </span>
                </div>

                {/* Right column: title + description */}
                <div className="pt-1 md:pt-4">
                  <h3 className="text-[#EDF2F7] text-xl md:text-[32px] font-medium tracking-tight leading-[1.2] mb-3">
                    {e.title}
                  </h3>
                  <p className="text-[#dddddd] text-[15px] md:text-base leading-relaxed max-w-[92%] md:max-w-[80%]">
                    {e.description}
                  </p>
                </div>
                {/* Suppress unused var warning */}
                <span className="hidden" data-index={i} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
