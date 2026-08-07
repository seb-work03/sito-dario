"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const engagements = [
  {
    number: "01",
    title: "Insegno e-commerce in aula",
    description:
      "Lezioni in master, corsi ITS e percorsi post-diploma. Porto in aula casi veri e numeri veri, non slide riciclate. Le persone escono con idee chiare su come funziona davvero un e-commerce.",
    tags: ["Master", "ITS", "Università"],
  },
  {
    number: "02",
    title: "Affianco imprenditori nelle scelte importanti",
    description:
      "Quando serve decidere quale piattaforma usare, dove investire o quale fornitore scegliere, mi siedo accanto all'imprenditore e ragioniamo insieme. Nessuna soluzione preconfezionata.",
    tags: ["PMI", "Strategia", "Audit"],
  },
  {
    number: "03",
    title: "Sono il consulente esterno degli e-commerce manager",
    description:
      "Chi gestisce l'e-commerce dentro un'azienda ha spesso bisogno di un confronto senior indipendente. Sono la persona con cui parlare quando le decisioni sono difficili e serve una seconda opinione onesta.",
    tags: ["Manager", "Confronto", "Indipendenza"],
  },
  {
    number: "04",
    title: "Formo team aziendali dall'interno",
    description:
      "Percorsi costruiti sull'azienda che ho davanti: si parte dalle basi operative e si arriva alle scelte strategiche, con esercitazioni sui casi reali del team.",
    tags: ["Corporate", "In-house", "Workshop"],
  },
  {
    number: "05",
    title: "Intervengo in eventi e conferenze",
    description:
      "Keynote, talk e panel per eventi, associazioni di categoria e community verticali. Contenuti pratici, non teoria astratta.",
    tags: ["Keynote", "Panel", "Fiere"],
  },
];

export function Experience() {
  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px] md:w-4/5">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
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

        {/* Numbered rows */}
        <div className="divide-y divide-white/[0.08]">
          {engagements.map((e, i) => (
            <motion.div
              key={e.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
              className="group grid grid-cols-[48px_1fr] md:grid-cols-[96px_1fr] gap-x-5 md:gap-x-10 py-8 md:py-10 items-center"
            >
              {/* Number */}
              <span className="text-[#00e5ff] font-bold text-[32px] md:text-[56px] tabular-nums leading-none transition-opacity duration-300 group-hover:opacity-70">
                {e.number}
              </span>

              {/* Title + description */}
              <div>
                <h3 className="text-[#EDF2F7] text-lg md:text-[28px] font-medium tracking-tight leading-[1.25] mb-2 group-hover:text-white transition-colors duration-300">
                  {e.title}
                </h3>
                <p className="text-[#dddddd] text-[15px] md:text-base leading-relaxed max-w-[80%]">
                  {e.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
