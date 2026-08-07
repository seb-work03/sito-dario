"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

function TimelineRow({
  number,
  title,
  description,
  Icon,
  liRef,
  fillPx,
  threshold,
}: {
  number: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  liRef: (el: HTMLLIElement | null) => void;
  fillPx: MotionValue<number>;
  threshold: number;
}) {
  // Lit as soon as the line's current pixel height >= this dot's top pixel.
  const lit = useTransform(fillPx, (v) => (v >= threshold ? 1 : 0));
  const bg = useTransform(lit, (v) => (v ? "#00e5ff" : "#0D1218"));
  const numberColor = useTransform(lit, (v) => (v ? "#0D1218" : "#00e5ff"));
  const boxShadow = useTransform(lit, (v) =>
    v ? "0 0 20px rgba(0,229,255,0.6)" : "0 0 0 rgba(0,229,255,0)",
  );
  const iconColor = useTransform(lit, (v) => (v ? "#00e5ff" : "#dddddd"));
  const iconBorder = useTransform(lit, (v) =>
    v ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.1)",
  );
  const iconBg = useTransform(lit, (v) =>
    v ? "rgba(0,229,255,0.06)" : "rgba(255,255,255,0.02)",
  );

  return (
    <motion.li
      ref={liRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex items-start gap-6 md:gap-10"
    >
      <span className="absolute -left-16 md:-left-24 top-1 flex justify-center w-11 md:w-14">
        <motion.span
          data-timeline-dot
          style={{ background: bg, boxShadow }}
          className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-[#00e5ff] transition-[background,box-shadow] duration-300"
        >
          <motion.span
            style={{ color: numberColor }}
            className="text-sm md:text-lg font-semibold tabular-nums transition-colors duration-300"
          >
            {number}
          </motion.span>
        </motion.span>
      </span>

      <div className="flex-1 pt-1 pr-4 md:pr-6">
        <h3 className="text-white text-xl md:text-[32px] font-medium tracking-tight leading-[1.2] mb-3">
          {title}
        </h3>
        <p className="text-white text-[15px] md:text-base leading-relaxed max-w-[92%] md:max-w-[80%]">
          {description}
        </p>
      </div>

      <motion.div
        style={{
          color: iconColor,
          borderColor: iconBorder,
          background: iconBg,
        }}
        className="shrink-0 mt-1 flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-2xl border transition-colors duration-300"
      >
        <Icon size={22} strokeWidth={1.6} className="md:hidden" aria-hidden />
        <Icon size={30} strokeWidth={1.4} className="hidden md:block" aria-hidden />
      </motion.div>
    </motion.li>
  );
}

export function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [railTotalPx, setRailTotalPx] = useState(0);

  // Scroll progress mapped so the fill grows from 0 to full as the wrapper
  // travels from having its top at 60% of viewport to having its end at 40%.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 60%", "end 40%"],
  });
  // Fill height in pixels — grows linearly with scroll, bidirectional.
  const fillPx = useTransform(scrollYProgress, (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    return clamped * railTotalPx;
  });

  // Measure each dot's top Y (relative to the wrapper) so a dot lights up
  // exactly when the fill line reaches the top of its circle.
  useLayoutEffect(() => {
    function measure() {
      const wrap = wrapperRef.current;
      if (!wrap) return;
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      const next: number[] = [];
      liRefs.current.forEach((li) => {
        if (!li) return;
        const dot = li.querySelector<HTMLElement>("[data-timeline-dot]");
        if (!dot) return;
        const rect = dot.getBoundingClientRect();
        const dotTop = rect.top + window.scrollY - wrapTop;
        next.push(dotTop);
      });
      setThresholds(next);
      setRailTotalPx(wrap.getBoundingClientRect().height);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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
          {/* Base rail (dim) */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[22px] md:left-[28px] w-px bg-white/10"
          />
          {/* Fill rail — height in px, driven by scroll (bidirectional) */}
          <motion.div
            aria-hidden
            style={{ height: fillPx }}
            className="absolute top-0 left-[22px] md:left-[28px] w-px bg-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.65)]"
          />

          <ul className="flex flex-col gap-10 md:gap-14">
            {engagements.map((e, i) => (
              <TimelineRow
                key={e.title}
                number={i + 1}
                title={e.title}
                description={e.description}
                Icon={e.icon}
                liRef={(el) => {
                  liRefs.current[i] = el;
                }}
                fillPx={fillPx}
                threshold={thresholds[i] ?? Infinity}
              />
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
