"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";

const steps = [
  {
    number: "01",
    title: "Diagnosi",
    description:
      "Analisi di numeri, tecnologia, processi, persone e posizionamento competitivo. Prima capire davvero, poi decidere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Priorità",
    description:
      "Separazione netta tra ciò che genera impatto e ciò che consuma tempo e budget. Nessuna soluzione preconfezionata.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 6h18M3 12h12M3 18h7" />
        <path d="m16 16 3 3 3-3" />
        <path d="M19 19v-6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Esecuzione",
    description:
      "Roadmap pragmatica, responsabilità definite, affiancamento ai team interni o ai fornitori esterni fino al risultato.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Controllo",
    description:
      "KPI leggibili, apprendimento continuo, correzioni basate su evidenze — non sulle sensazioni.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

const CARD_W = 300;
const CARD_H = 230;
const GAP = 28;

// Start: cards stacked in the middle with a small offset.
// End: exact 2x2 grid, in pixels.
const SPREAD_X = (CARD_W + GAP) / 2; // 164
const SPREAD_Y = (CARD_H + GAP) / 2; // 129

const layout = [
  { from: { x: 0, y: 0, r: 0 }, to: { x: -SPREAD_X, y: -SPREAD_Y }, z: 40 },
  { from: { x: 14, y: 10, r: 2.5 }, to: { x: SPREAD_X, y: -SPREAD_Y }, z: 30 },
  { from: { x: -12, y: 18, r: -2 }, to: { x: -SPREAD_X, y: SPREAD_Y }, z: 20 },
  { from: { x: 18, y: 26, r: 3.5 }, to: { x: SPREAD_X, y: SPREAD_Y }, z: 10 },
];

function ProcessCard({
  step,
  index,
  progress,
}: {
  step: typeof steps[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const { from, to, z } = layout[index];

  // Straight linear px mapping: every unit of scroll moves the card a fixed
  // number of pixels. No spring, no easing, no gating.
  const x = useTransform(progress, [0, 1], [from.x, to.x]);
  const y = useTransform(progress, [0, 1], [from.y, to.y]);
  const rotate = useTransform(progress, [0, 1], [from.r, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        zIndex: z,
        width: CARD_W,
        height: CARD_H,
        position: "absolute",
        left: `calc(50% - ${CARD_W / 2}px)`,
        top: `calc(50% - ${CARD_H / 2}px)`,
      }}
      className="group bg-[#0D1218] border border-[#253444]/60 rounded-3xl p-7 flex flex-col gap-3 transition-[border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[#EDF2F7] text-2xl font-medium tracking-tight leading-tight">{step.title}</h3>
        <div className="inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-xl w-11 h-11 shrink-0 transition-transform duration-500 group-hover:scale-110">
          {step.icon}
        </div>
      </div>
      <p className="text-[#6A84A0] text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    // NOTE: no overflow-hidden here. An ancestor with overflow:hidden becomes a
    // scroll container and breaks position:sticky on the pinned child below.
    <section id="process" className="relative bg-[#00e5ff]">
      {/* Pattern layers — all inset-0 so nothing overflows the section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,18,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,18,24,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(13,18,24,0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 18% 12%, rgba(255,255,255,0.45), transparent 60%), radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, rgba(13,18,24,0.18) 100%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-16 md:pt-28 pb-12">
        <AnimatedHeadline className="text-[#0D1218] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl tracking-tight">
          Non una formula. Un sistema di decisioni.
        </AnimatedHeadline>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[#0D1218]/70 max-w-lg mt-6 leading-relaxed"
        >
          Ogni progetto viene affrontato con una sequenza chiara: capire,
          scegliere, costruire, misurare. Adattata al contesto.
        </motion.p>
      </div>

      {/* Desktop fan-out.
          Track is 180vh, pinned child is 100vh → the animation runs over
          exactly 80vh of scrolling, mapped linearly to pixel offsets. */}
      <div className="hidden md:block relative z-10" ref={trackRef} style={{ height: "180vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            className="relative"
            style={{ width: CARD_W * 2 + GAP, height: CARD_H * 2 + GAP }}
          >
            {steps.map((step, i) => (
              <ProcessCard key={step.number} step={step} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: static stack */}
      <div className="md:hidden relative z-10 flex flex-col gap-4 px-5 pb-16">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.19, 1, 0.22, 1] }}
            className="bg-[#0D1218] border border-[#253444]/60 rounded-2xl p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[#EDF2F7] text-xl font-medium tracking-tight">{s.title}</h3>
              <div className="inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-lg w-9 h-9 shrink-0">
                {s.icon}
              </div>
            </div>
            <p className="text-[#6A84A0] text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
