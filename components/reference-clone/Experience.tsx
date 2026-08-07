"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Compass,
  MessagesSquare,
  Users,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const engagements: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Insegno e-commerce in aula",
    description:
      "Lezioni in master, corsi ITS e percorsi post-diploma. Porto in aula casi veri e numeri veri, non slide riciclate. Le persone escono con idee chiare su come funziona davvero un e-commerce.",
    icon: GraduationCap,
  },
  {
    title: "Affianco imprenditori nelle scelte importanti",
    description:
      "Quando serve decidere quale piattaforma usare, dove investire o quale fornitore scegliere, mi siedo accanto all'imprenditore e ragioniamo insieme. Nessuna soluzione preconfezionata.",
    icon: Compass,
  },
  {
    title: "Sono il consulente esterno degli e-commerce manager",
    description:
      "Chi gestisce l'e-commerce dentro un'azienda ha spesso bisogno di un confronto senior indipendente. Sono la persona con cui parlare quando le decisioni sono difficili e serve una seconda opinione onesta.",
    icon: MessagesSquare,
  },
  {
    title: "Formo team aziendali dall'interno",
    description:
      "Percorsi costruiti sull'azienda che ho davanti: si parte dalle basi operative e si arriva alle scelte strategiche, con esercitazioni sui casi reali del team.",
    icon: Users,
  },
  {
    title: "Intervengo in eventi e conferenze",
    description:
      "Keynote, talk e panel per eventi, associazioni di categoria e community verticali. Contenuti pratici, non teoria astratta.",
    icon: Mic,
  },
];

/** One row. Its dot flips filled the moment its top enters the top half
 *  of the viewport — which is when the rail line growing with scroll
 *  visually reaches it. The rail fill is a CSS transform driven by the
 *  same `inView` trigger, so both stay in sync without any math. */
function TimelineRow({
  number,
  title,
  description,
  Icon,
}: {
  number: number;
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -50% 0px",
  });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex items-start gap-6 md:gap-10"
      data-reached={inView ? "true" : "false"}
      data-index={number}
    >
      {/* Dot on the rail */}
      <span className="absolute -left-16 md:-left-24 top-1 flex justify-center w-11 md:w-14">
        <span
          className={
            "relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-[#00e5ff] transition-all duration-500 " +
            (inView
              ? "bg-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.6)]"
              : "bg-[#0D1218]")
          }
        >
          <span
            className={
              "text-sm md:text-lg font-semibold tabular-nums transition-colors duration-500 " +
              (inView ? "text-[#0D1218]" : "text-[#00e5ff]")
            }
          >
            {number}
          </span>
        </span>
      </span>

      <div className="flex-1 pt-1 pr-4 md:pr-6">
        <h3 className="text-white text-xl md:text-[32px] font-medium tracking-tight leading-[1.2] mb-3">
          {title}
        </h3>
        <p className="text-white text-[15px] md:text-base leading-relaxed max-w-[92%] md:max-w-[80%]">
          {description}
        </p>
      </div>

      {/* Icon on the right */}
      <div
        className={
          "shrink-0 mt-1 flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-2xl border transition-colors duration-500 " +
          (inView
            ? "border-[#00e5ff]/40 bg-[#00e5ff]/[0.06] text-[#00e5ff]"
            : "border-white/10 bg-white/[0.02] text-[#dddddd]")
        }
      >
        <Icon size={22} strokeWidth={1.6} className="md:hidden" aria-hidden />
        <Icon size={30} strokeWidth={1.4} className="hidden md:block" aria-hidden />
      </div>
    </motion.li>
  );
}

export function Experience() {
  // Track how many rows have entered — used to grow the rail fill in
  // sync with the just-reached dot.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // On every mount/layout tick, read `data-reached` on each row and set
  // rail height to the Y of the last reached row's dot. `useInView` on
  // each row already re-renders the whole component when a row enters.
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => {
      const wrap = wrapperRef.current;
      const rail = railRef.current;
      if (!wrap || !rail) return;
      const reached = wrap.querySelectorAll<HTMLElement>(
        'li[data-reached="true"]',
      );
      if (reached.length === 0) {
        rail.style.height = "0px";
        return;
      }
      const last = reached[reached.length - 1];
      const wrapTop = wrap.getBoundingClientRect().top;
      const dotRect = last.getBoundingClientRect();
      const y = dotRect.top + 22 - wrapTop; // dot center ≈ 22px below li top
      rail.style.height = `${Math.max(0, y)}px`;
    });
  }

  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px] md:w-4/5">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
            Come posso esserti utile?
          </AnimatedHeadline>
          <AnimatedText
            delay={0.12}
            className="text-[#dddddd] leading-relaxed mt-5 max-w-[80%] mx-auto"
          >
            5 modi in cui lavoro con aziende, team ed enti formativi.
          </AnimatedText>
        </div>

        <div ref={wrapperRef} className="relative pl-16 md:pl-24">
          {/* Base rail */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[22px] md:left-[28px] w-px bg-white/10"
          />
          {/* Fill rail — height driven imperatively when rows enter */}
          <div
            ref={railRef}
            aria-hidden
            className="absolute top-0 left-[22px] md:left-[28px] w-px bg-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.65)] transition-[height] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{ height: 0 }}
          />

          <ul className="flex flex-col gap-10 md:gap-14">
            {engagements.map((e, i) => (
              <TimelineRow
                key={e.title}
                number={i + 1}
                title={e.title}
                description={e.description}
                Icon={e.icon}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
