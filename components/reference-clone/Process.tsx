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

// Final positions when scroll progress = 1. Simple 2x2 grid in pixels.
const finalOffsets: { x: number; y: number }[] = [
  { x: -180, y: -140 }, // top-left
  { x: 180, y: -140 },  // top-right
  { x: -180, y: 140 },  // bottom-left
  { x: 180, y: 140 },   // bottom-right
];

// Small offsets while stacked (progress = 0)
const stackOffsets: { x: number; y: number; rotate: number; z: number }[] = [
  { x: 0, y: 0, rotate: 0, z: 40 },
  { x: 12, y: 10, rotate: 2, z: 30 },
  { x: -10, y: 16, rotate: -2, z: 20 },
  { x: 16, y: 22, rotate: 3, z: 10 },
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
  const start = stackOffsets[index];
  const end = finalOffsets[index];

  // 1:1 with scroll progress — no spring, no gating
  const x = useTransform(progress, [0, 1], [start.x, end.x]);
  const y = useTransform(progress, [0, 1], [start.y, end.y]);
  const rotate = useTransform(progress, [0, 1], [start.rotate, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        zIndex: start.z,
        position: "absolute",
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="group w-[300px] h-[240px] bg-[#0D1218] border border-[#253444]/60 rounded-3xl p-7 flex flex-col gap-3 transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
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
  const scrollRef = useRef<HTMLDivElement>(null);
  // Track only the scroll distance where the pin is active (0 → 1 while pinned)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="process" className="relative bg-[#00e5ff] overflow-hidden">
      {/* Shared pattern layers — cover the whole section */}
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
            "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, rgba(13,18,24,0.18) 100%)",
        }}
      />
      <div
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(closest-side, rgba(255,255,255,0.5), transparent 70%)",
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

      {/* Scroll-driven fan-out — desktop only.
          Track wrapper is 160vh tall → 60vh of scroll drives the animation
          (viewport 100vh; pin releases when track's bottom hits viewport bottom).
          Cards move a fixed pixel distance per scroll unit — no spring. */}
      <div className="hidden md:block relative z-10" ref={scrollRef} style={{ height: "160vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-[600px] h-[500px]">
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
            className="relative bg-[#0D1218] border border-[#253444]/60 rounded-2xl p-6 flex flex-col gap-3"
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
