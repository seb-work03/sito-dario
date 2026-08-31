"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
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
      "Keynote, talk e confronti per eventi, associazioni di categoria e community verticali. Contenuti pratici, non teoria astratta.",
    icon: Mic,
  },
];

function TimelineRow({
  number,
  title,
  description,
  Icon,
  liRef,
  lit,
}: {
  number: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  liRef: (el: HTMLLIElement | null) => void;
  lit: boolean;
}) {
  return (
    <Reveal
      as="li"
      ref={liRef as (el: HTMLElement | null) => void}
      y={24}
      duration={0.7}
      className="relative flex items-start gap-6 md:gap-10"
    >
      <span className="absolute -left-16 md:-left-24 top-1 flex justify-center w-11 md:w-14">
        <span
          data-timeline-dot
          className={`relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-[#00e5ff] transition-[background,box-shadow] duration-300 ${lit ? "bg-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.6)]" : "bg-[#0D1218]"}`}
        >
          <span
            className={`text-sm md:text-lg font-semibold tabular-nums transition-colors duration-300 ${lit ? "text-[#0D1218]" : "text-[#00e5ff]"}`}
          >
            {number}
          </span>
        </span>
      </span>

      <div className="flex-1 pt-1 md:pr-6">
        {/* Title + icon row (icon inline on mobile, fixed on right on desktop) */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-white text-xl md:text-[32px] font-medium tracking-tight leading-[1.2] flex-1">
            {title}
          </h3>
          <div
            className={`md:hidden shrink-0 mt-0.5 flex items-center justify-center w-11 h-11 rounded-2xl border transition-colors duration-300 ${lit ? "text-[#00e5ff] border-[#00e5ff]/40 bg-[#00e5ff]/[0.06]" : "text-[#dddddd] border-white/10 bg-white/[0.02]"}`}
          >
            <Icon size={22} strokeWidth={1.6} aria-hidden />
          </div>
        </div>
        {/* Description spans full row on mobile */}
        <p className="text-white text-[15px] md:text-base leading-relaxed w-full md:max-w-[80%]">
          {description}
        </p>
      </div>

      {/* Desktop icon on the right side of the row */}
      <div
        className={`hidden md:flex shrink-0 mt-1 items-center justify-center w-16 h-16 rounded-2xl border transition-colors duration-300 ${lit ? "text-[#00e5ff] border-[#00e5ff]/40 bg-[#00e5ff]/[0.06]" : "text-[#dddddd] border-white/10 bg-white/[0.02]"}`}
      >
        <Icon size={30} strokeWidth={1.4} aria-hidden />
      </div>
    </Reveal>
  );
}

export function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [railTotalPx, setRailTotalPx] = useState(0);
  const [litRows, setLitRows] = useState<boolean[]>([]);

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

  useEffect(() => {
    let frame = 0;
    let lastLit = "";
    const update = () => {
      frame = 0;
      const wrapper = wrapperRef.current;
      const fill = fillRef.current;
      if (!wrapper || !fill || railTotalPx <= 0) return;
      const rect = wrapper.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport * 0.6 - rect.top) / Math.max(1, rect.height + viewport * 0.2)));
      const px = progress * railTotalPx;
      fill.style.height = `${px}px`;
      const next = thresholds.map((threshold) => px >= threshold);
      const signature = next.map(Number).join("");
      if (signature !== lastLit) {
        lastLit = signature;
        setLitRows(next);
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, [railTotalPx, thresholds]);

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
          <div
            ref={fillRef}
            aria-hidden
            style={{ height: 0 }}
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
                lit={litRows[i] ?? false}
              />
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
