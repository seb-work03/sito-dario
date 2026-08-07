"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const engagements = [
  {
    title: "Insegno e-commerce in aula",
    description:
      "Lezioni in master, corsi ITS e percorsi post-diploma. Porto in aula casi veri e numeri veri, non slide riciclate. Le persone escono con idee chiare su come funziona davvero un e-commerce.",
  },
  {
    title: "Affianco imprenditori nelle scelte importanti",
    description:
      "Quando serve decidere quale piattaforma usare, dove investire o quale fornitore scegliere, mi siedo accanto all'imprenditore e ragioniamo insieme. Nessuna soluzione preconfezionata.",
  },
  {
    title: "Sono il consulente esterno degli e-commerce manager",
    description:
      "Chi gestisce l'e-commerce dentro un'azienda ha spesso bisogno di un confronto senior indipendente. Sono la persona con cui parlare quando le decisioni sono difficili e serve una seconda opinione onesta.",
  },
  {
    title: "Formo team aziendali dall'interno",
    description:
      "Percorsi costruiti sull'azienda che ho davanti: si parte dalle basi operative e si arriva alle scelte strategiche, con esercitazioni sui casi reali del team.",
  },
  {
    title: "Intervengo in eventi e conferenze",
    description:
      "Keynote, talk e panel per eventi, associazioni di categoria e community verticali. Contenuti pratici, non teoria astratta.",
  },
];

function TimelineDot({
  number,
  threshold,
  progress,
}: {
  number: number;
  threshold: number;
  progress: MotionValue<number>;
}) {
  // 0 → empty, 1 → filled — hard-clamped, tiny transition band around threshold
  const fill = useTransform(progress, (v) => (v >= threshold ? 1 : 0));
  const bg = useTransform(fill, (v) => (v ? "#00e5ff" : "transparent"));
  const numberColor = useTransform(fill, (v) => (v ? "#0D1218" : "#00e5ff"));
  const shadow = useTransform(fill, (v) =>
    v ? "0 0 20px rgba(0,229,255,0.65)" : "0 0 0 rgba(0,229,255,0)",
  );

  return (
    <motion.span
      aria-hidden
      style={{ background: bg, boxShadow: shadow }}
      className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-[#00e5ff] transition-[background,box-shadow] duration-500"
    >
      <motion.span
        style={{ color: numberColor }}
        className="text-sm md:text-lg font-semibold tabular-nums transition-colors duration-500"
      >
        {number}
      </motion.span>
    </motion.span>
  );
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 45%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Each dot fills when the scroll fill passes its center. With 5 evenly
  // spaced rows, the centers sit roughly at (i + 0.5) / N of the timeline.
  const total = engagements.length;

  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px] md:w-4/5">
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
        <div ref={timelineRef} className="relative pl-16 md:pl-24">
          {/* Base rail */}
          <div
            aria-hidden
            className="absolute top-6 bottom-6 left-[22px] md:left-[28px] w-px bg-white/10"
          />
          {/* Fill rail — grows with scroll */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute top-6 left-[22px] md:left-[28px] w-px bg-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.65)]"
          />

          <ul className="flex flex-col gap-10 md:gap-14">
            {engagements.map((e, i) => {
              const threshold = (i + 0.5) / total;
              return (
                <motion.li
                  key={e.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="relative flex items-start gap-6 md:gap-10"
                >
                  {/* Dot on the rail — centered on the 22/28 px x position */}
                  <span className="absolute -left-16 md:-left-24 top-1 flex justify-center w-11 md:w-14">
                    <TimelineDot
                      number={i + 1}
                      threshold={threshold}
                      progress={scrollYProgress}
                    />
                  </span>

                  <div className="flex-1 pt-1">
                    <h3 className="text-white text-xl md:text-[32px] font-medium tracking-tight leading-[1.2] mb-3">
                      {e.title}
                    </h3>
                    <p className="text-white text-[15px] md:text-base leading-relaxed max-w-[92%] md:max-w-[80%]">
                      {e.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
