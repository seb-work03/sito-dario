"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { AnimatedLabel } from "./AnimatedLabel";

const steps = [
  {
    number: "01",
    title: "Diagnosi",
    description:
      "Analisi di numeri, tecnologia, processi, persone e posizionamento competitivo. Prima capire davvero, poi decidere.",
    corner: { x: "-52%", y: "-54%" },
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
    corner: { x: "52%", y: "-54%" },
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
    corner: { x: "-52%", y: "54%" },
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
    corner: { x: "52%", y: "54%" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

const stackOffsets = [
  { x: 0, y: 0, scale: 1, rotate: 0, z: 40 },
  { x: 10, y: 8, scale: 0.96, rotate: 2, z: 30 },
  { x: -8, y: 14, scale: 0.92, rotate: -1.5, z: 20 },
  { x: 14, y: 20, scale: 0.88, rotate: 3, z: 10 },
];

function ProcessCard({ step, index, scrollProgress }: {
  step: typeof steps[0];
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const off = stackOffsets[index];

  // Directly and proportionally tied to scroll progress — no spring, no gates
  const x = useTransform(scrollProgress, [0, 1], [`${off.x}px`, step.corner.x]);
  const y = useTransform(scrollProgress, [0, 1], [`${off.y}px`, step.corner.y]);
  const scale = useTransform(scrollProgress, [0, 1], [off.scale, 1]);
  const rotate = useTransform(scrollProgress, [0, 1], [off.rotate, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        opacity: 1,
        zIndex: off.z,
        position: "absolute",
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="group relative w-[clamp(220px,28vw,320px)] aspect-[6/5] bg-[#0D1218] border border-[#253444]/60 rounded-3xl p-7 md:p-8 flex flex-col gap-3 transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Subtle inner glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 32px rgba(255,255,255,0.04)" }}
      />

      {/* Top row: title left + icon right, vertically centered */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[#EDF2F7] text-2xl font-medium tracking-tight leading-tight">{step.title}</h3>
        <div className="inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-xl w-11 h-11 shrink-0 transition-transform duration-500 group-hover:scale-110">
          {step.icon}
        </div>
      </div>

      {/* Description */}
      <p className="text-[#6A84A0] text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="process" className="bg-[#0D1218]">
      {/* Header on dark background — only the sticky card area below carries the accent */}
      <div className="mx-auto max-w-[1240px] px-5 pt-16 md:pt-28 pb-12">
        <AnimatedLabel>IL METODO</AnimatedLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl tracking-tight"
          >
            Non una formula. Un sistema di decisioni.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-[#94A9BE] max-w-sm md:text-right leading-relaxed"
          >
            Ogni progetto viene affrontato con una sequenza chiara: capire,
            scegliere, costruire, misurare. Adattata al contesto.
          </motion.p>
        </div>
      </div>

      {/* Scroll-driven fan-out — desktop only. Accent background for card area */}
      <div className="hidden md:block" ref={sectionRef} style={{ minHeight: "380vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#00e5ff]">
          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(13,18,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,18,24,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(13,18,24,0.25) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Radial spotlight — darker corners */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, rgba(13,18,24,0.18) 100%)",
            }}
          />
          {/* Off-center accent blob for depth */}
          <div
            className="absolute -top-1/3 -left-1/4 w-[80%] h-[100%] rounded-full pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.5), transparent 70%)",
            }}
          />
          <div className="relative w-[clamp(480px,60vw,720px)] aspect-square">
            {steps.map((step, i) => (
              <ProcessCard
                key={step.number}
                step={step}
                index={i}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: simple reveal stack, on accent bg */}
      <div className="md:hidden flex flex-col gap-4 px-5 pb-16 bg-[#00e5ff]">
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
