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
      "KPI leggibili, apprendimento continuo, correzioni basate su evidenze e non sulle sensazioni.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

const CARD_W = 300;
const CARD_H = 220;
const GAP = 28;

const SPREAD_X = (CARD_W + GAP) / 2; // 164
const SPREAD_Y = (CARD_H + GAP) / 2; // 124

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

  // Scroll timeline (clamped) inside the pin:
  //   0.00 → 0.15  header appears (smooth reveal via AnimatedHeadline)
  //   0.15 → 0.72  cards fan out from stack to spread
  //   0.72 → 1.00  linger — everything holds before the pin releases
  const cardsProgress = useTransform(scrollYProgress, [0.15, 0.72], [0, 1]);

  return (
    <section id="process" className="relative bg-[#00e5ff]">
      {/* Pattern layers */}
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

      {/* Desktop pin: header + cards live inside the sticky area
          Track 240vh, sticky 100vh → 140vh of scroll to spend on header
          entry, card fan-out, and the closing linger. */}
      <div className="hidden md:block relative z-10" ref={trackRef} style={{ height: "240vh" }}>
        <div className="sticky top-0 h-screen flex flex-col items-center px-5 pt-16 md:pt-20">
          {/* Centered header — appears smoothly when the pin starts */}
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedHeadline className="text-[#0D1218] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
              Non una formula. Un sistema di decisioni.
            </AnimatedHeadline>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="text-[#0D1218]/70 max-w-xl mx-auto mt-5 leading-relaxed"
            >
              Ogni progetto viene affrontato con una sequenza chiara: capire,
              scegliere, costruire, misurare. Adattata al contesto.
            </motion.p>
          </div>

          {/* Cards play area — fills remaining space, cards fan out here */}
          <div className="flex-1 w-full flex items-center justify-center min-h-0">
            <div
              className="relative"
              style={{ width: CARD_W * 2 + GAP, height: CARD_H * 2 + GAP }}
            >
              {steps.map((step, i) => (
                <ProcessCard key={step.number} step={step} index={i} progress={cardsProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: centered header on top, stacked cards below */}
      <div className="md:hidden relative z-10 px-5 pt-16 pb-16">
        <div className="text-center max-w-lg mx-auto mb-10">
          <AnimatedHeadline className="text-[#0D1218] font-medium text-[32px] leading-[1.05] tracking-tight">
            Non una formula. Un sistema di decisioni.
          </AnimatedHeadline>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[#0D1218]/70 mt-5 leading-relaxed"
          >
            Ogni progetto viene affrontato con una sequenza chiara: capire,
            scegliere, costruire, misurare. Adattata al contesto.
          </motion.p>
        </div>
        <div className="flex flex-col gap-4">
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
      </div>
    </section>
  );
}
