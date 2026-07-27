"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, z: 40 },
  { x: 10, y: 8, scale: 0.96, opacity: 0.78, rotate: 2, z: 30 },
  { x: -8, y: 14, scale: 0.92, opacity: 0.58, rotate: -1.5, z: 20 },
  { x: 14, y: 20, scale: 0.88, opacity: 0.38, rotate: 3, z: 10 },
];

function ProcessCard({ step, index, scrollProgress }: {
  step: typeof steps[0];
  index: number;
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const off = stackOffsets[index];

  const x = useTransform(scrollProgress, [0, 0.6], [`${off.x}px`, step.corner.x]);
  const y = useTransform(scrollProgress, [0, 0.6], [`${off.y}px`, step.corner.y]);
  const scale = useTransform(scrollProgress, [0, 0.6], [off.scale, 1]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.6], [off.opacity, 1, 1]);
  const rotate = useTransform(scrollProgress, [0, 0.45], [off.rotate, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex: off.z,
        position: "absolute",
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="group relative w-[clamp(220px,28vw,320px)] aspect-[6/5] bg-[#0D1218] border border-[#253444]/80 rounded-3xl p-7 md:p-8 flex flex-col justify-end transition-shadow duration-500 hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)] hover:border-[#00e5ff]/20"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(0,229,255,0.04)" }} />

      {/* Icon badge */}
      <div className="absolute top-7 right-7 inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-xl w-11 h-11 shrink-0 transition-transform duration-500 group-hover:scale-110">
        {step.icon}
      </div>

      <div>
        <h3 className="text-[#EDF2F7] text-2xl font-medium mb-2 tracking-tight">{step.title}</h3>
        <p className="text-[#94A9BE] text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });

  return (
    <section id="process" className="bg-[#00e5ff]">
      {/* Header on accent background */}
      <div className="mx-auto max-w-[1240px] px-5 pt-16 md:pt-28 pb-12">
        <span className="inline-flex items-center gap-0 text-sm tracking-widest text-[#0D1218]/60 overflow-hidden">
          [ IL METODO ]
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#0D1218] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl tracking-tight"
          >
            Non una formula. Un sistema di decisioni.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-[#0D1218]/60 max-w-sm md:text-right leading-relaxed"
          >
            Ogni progetto viene affrontato con una sequenza chiara: capire,
            scegliere, costruire, misurare. Adattata al contesto.
          </motion.p>
        </div>
      </div>

      {/* Scroll-driven fan-out — desktop only. Dark background for card area */}
      <div className="hidden md:block" ref={sectionRef} style={{ minHeight: "380vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#0D1218]">
          {/* Subtle radial glow behind cards */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06), transparent 70%)" }} />
          <div className="relative w-[clamp(480px,60vw,720px)] aspect-square">
            {steps.map((step, i) => (
              <ProcessCard
                key={step.number}
                step={step}
                index={i}
                scrollProgress={spring}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: simple reveal stack, on dark bg */}
      <div className="md:hidden flex flex-col gap-4 px-5 pb-16 bg-[#0D1218]">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.19, 1, 0.22, 1] }}
            className="relative bg-[#17222F] border border-[#253444] rounded-2xl p-6"
          >
            <div className="absolute top-5 right-5 inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-lg w-9 h-9">
              {s.icon}
            </div>
            <h3 className="text-[#EDF2F7] text-xl font-medium mb-2 tracking-tight pr-14">{s.title}</h3>
            <p className="text-[#94A9BE] text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
