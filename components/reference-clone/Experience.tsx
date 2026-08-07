"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const engagements = [
  {
    number: "01",
    title: "Docenza in master ed executive program",
    description:
      "Interventi in percorsi universitari e post-laurea. E-commerce raccontato attraverso casi reali, dati verificabili e decisioni prese sul campo.",
    tags: ["Master", "Executive", "Università"],
    stat: { value: "50+", label: "edizioni" },
  },
  {
    number: "02",
    title: "Consulenza a imprenditori e founder",
    description:
      "Affiancamento a chi deve decidere direzioni strategiche: piattaforma, canali, priorità di investimento, valutazione di fornitori.",
    tags: ["PMI", "Strategia", "Audit"],
    stat: { value: "20+", label: "anni" },
  },
  {
    number: "03",
    title: "Supporto ai responsabili e-commerce",
    description:
      "Un confronto senior indipendente per e-commerce manager, marketing manager e digital manager alle prese con decisioni difficili.",
    tags: ["Manager", "Mentoring", "Advisory"],
    stat: { value: "30+", label: "clienti" },
  },
  {
    number: "04",
    title: "Formazione aziendale continuativa",
    description:
      "Percorsi tarati sul team interno: dai fondamenti operativi alle scelte strategiche, con esercitazioni sui casi dell'azienda.",
    tags: ["Corporate", "In-house", "Workshop"],
    stat: { value: "4.9★", label: "rating" },
  },
  {
    number: "05",
    title: "Interventi in eventi e conferenze",
    description:
      "Keynote e talk per organizzatori di eventi, enti di categoria, associazioni e community verticali dell'e-commerce.",
    tags: ["Keynote", "Panel", "Fiere"],
    stat: { value: "100+", label: "talk" },
  },
];

export function Experience() {
  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight max-w-2xl">
            Cinque ambiti, un unico metodo.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.12}
            className="text-[#B8C7D9] max-w-xs md:text-right leading-relaxed shrink-0"
          >
            Consulenza, formazione, eventi: ogni contesto con il suo approccio, ogni decisione basata sui dati.
          </AnimatedText>
        </div>

        {/* Numbered rows */}
        <div className="divide-y divide-white/[0.06]">
          {engagements.map((e, i) => (
            <motion.div
              key={e.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
              className="group grid grid-cols-[56px_1fr] md:grid-cols-[96px_1fr_160px] gap-x-6 md:gap-x-10 py-9 md:py-10 items-start md:items-center"
            >
              {/* Number */}
              <span className="text-[#00e5ff] font-bold text-[40px] md:text-[56px] tabular-nums leading-none mt-1 transition-opacity duration-300 group-hover:opacity-70">
                {e.number}
              </span>

              {/* Title + description + tags */}
              <div>
                <h3 className="text-[#EDF2F7] text-xl md:text-[28px] font-medium tracking-tight leading-[1.2] mb-2 group-hover:text-white transition-colors duration-300">
                  {e.title}
                </h3>
                <p className="text-[#B8C7D9] text-[15px] md:text-base leading-relaxed max-w-2xl mb-3">
                  {e.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-[0.12em] text-[#93A6BB] border border-[#253444] rounded-full px-2.5 py-1 transition-colors duration-300 group-hover:border-[#00e5ff]/30 group-hover:text-[#B8C7D9]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stat — desktop only, right column */}
              <div className="hidden md:flex flex-col items-end gap-0.5 shrink-0">
                <span className="text-[#EDF2F7] text-3xl font-semibold tabular-nums tracking-tight">
                  {e.stat.value}
                </span>
                <span className="text-[#93A6BB] text-xs uppercase tracking-widest">
                  {e.stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-16 md:mt-24 border-t border-white/8 pt-12 md:pt-14">
          <AnimatedHeadline
            as="h3"
            className="text-[#EDF2F7] font-medium text-[26px] md:text-[38px] tracking-tight max-w-2xl leading-[1.2]"
          >
            Il lavoro di consulenza e quello di docenza si alimentano a vicenda.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.2}
            className="text-[#B8C7D9] mt-4 max-w-lg leading-relaxed"
          >
            Ogni caso reale diventa esempio per l&apos;aula. Ogni domanda in
            aula affina il modo di leggere i problemi in consulenza.
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
