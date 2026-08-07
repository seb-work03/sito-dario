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

/** One entry: alternating left/right editorial spread, with a giant cyan
 *  number that breaks the horizontal separator line above the row. */
function Entry({
  number,
  title,
  description,
  align,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  align: "left" | "right";
  isLast: boolean;
}) {
  const contentLeft = align === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="relative"
    >
      {/* Vertical timeline segment that connects to the next row (desktop only) */}
      {!isLast && (
        <div
          aria-hidden
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full h-14 w-px bg-gradient-to-b from-[#00e5ff]/40 via-[#00e5ff]/15 to-transparent"
        />
      )}

      {/* Desktop: 2-column editorial layout */}
      <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-16 md:py-14 relative">
        {/* Content side */}
        <div className={contentLeft ? "md:order-1 md:pr-12" : "md:order-2 md:pl-12"}>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              aria-hidden
              className="h-px w-10 bg-[#00e5ff]/60 shrink-0 translate-y-[-6px]"
            />
            <span className="text-[#00e5ff] text-[11px] uppercase tracking-[0.2em] font-medium">
              {`Ambito ${parseInt(number, 10)}`}
            </span>
          </div>
          <h3 className="text-[#EDF2F7] text-[28px] lg:text-[36px] font-medium tracking-tight leading-[1.15] mb-4">
            {title}
          </h3>
          <p className="text-[#dddddd] text-[15px] lg:text-base leading-relaxed max-w-[92%]">
            {description}
          </p>
        </div>

        {/* Giant number side */}
        <div className={contentLeft ? "md:order-2" : "md:order-1"}>
          <div
            className={
              "relative flex items-center " +
              (contentLeft ? "justify-start md:justify-end" : "justify-end md:justify-start")
            }
          >
            <span
              className="font-bold tabular-nums leading-none tracking-[-0.08em] select-none"
              style={{
                fontSize: "clamp(9rem, 15vw, 15rem)",
                background:
                  "linear-gradient(180deg, #00e5ff 0%, rgba(0,229,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {number}
            </span>
            {/* Soft cyan bloom behind the number */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 pointer-events-none opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,229,255,0.22), transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile: compact stacked layout */}
      <div className="md:hidden flex items-start gap-5 py-8">
        <span
          className="font-bold tabular-nums leading-none tracking-[-0.06em] text-[64px] shrink-0"
          style={{
            background: "linear-gradient(180deg, #00e5ff 0%, rgba(0,229,255,0.4) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {number}
        </span>
        <div>
          <h3 className="text-[#EDF2F7] text-lg font-medium tracking-tight leading-[1.25] mb-2">
            {title}
          </h3>
          <p className="text-[#dddddd] text-[15px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25 overflow-hidden">
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

        {/* Editorial rows — alternating sides, timeline connector between them */}
        <div className="divide-y divide-white/[0.06] md:divide-y-0">
          {engagements.map((e, i) => (
            <Entry
              key={e.number}
              number={e.number}
              title={e.title}
              description={e.description}
              align={i % 2 === 0 ? "left" : "right"}
              isLast={i === engagements.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
