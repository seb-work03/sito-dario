"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { AnimatedLabel } from "./AnimatedLabel";

const steps = [
  {
    number: "01",
    title: "Ascolto",
    description:
      "Prima capire, poi proporre. Ricostruisco insieme al cliente il contesto: obiettivi, vincoli, dati disponibili, punti dolenti.",
    corner: { x: "-52%", y: "-54%" }, // top-left
  },
  {
    number: "02",
    title: "Analisi",
    description:
      "Metto ordine tra le informazioni. Identifico le domande importanti, escludo il rumore, evidenzio ciò che serve davvero decidere.",
    corner: { x: "52%", y: "-54%" }, // top-right
  },
  {
    number: "03",
    title: "Priorità",
    description:
      "Definisco insieme al cliente cosa affrontare per primo, con quali risorse e con che criteri di verifica.",
    corner: { x: "-52%", y: "54%" }, // bottom-left
  },
  {
    number: "04",
    title: "Azione",
    description:
      "Restituisco un piano operativo comprensibile, con passaggi realistici. Se serve, resto a disposizione durante l'esecuzione.",
    corner: { x: "52%", y: "54%" }, // bottom-right
  },
];

/* Initial stacking offsets so you see the "deck" behind the front card */
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

  /* Fan-out completes at 60% of scroll — cards stay put for remaining 40% */
  const x = useTransform(
    scrollProgress,
    [0, 0.6],
    [`${off.x}px`, step.corner.x]
  );
  const y = useTransform(
    scrollProgress,
    [0, 0.6],
    [`${off.y}px`, step.corner.y]
  );
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
      className="w-[clamp(220px,28vw,320px)] aspect-square bg-[#17222F] border border-[#253444] rounded-3xl p-7 md:p-8 flex flex-col justify-between"
    >
      <div className="inline-flex items-center justify-center bg-[#77C0CF] rounded-xl w-11 h-11 shrink-0">
        <span className="text-[#0D1218] text-sm font-semibold tabular-nums">{step.number}</span>
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

  /* Spring-smoothed progress so spread feels physical */
  const spring = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });

  return (
    <section id="process" className="bg-[#0D1218] border-t border-white/5">
      {/* Header — outside the sticky, scrolls normally */}
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
            Un processo lineare, ma non rigido.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-[#94A9BE] max-w-sm md:text-right leading-relaxed"
          >
            Ogni progetto è diverso. Il metodo rimane, i tempi e la profondità
            si adattano al contesto.
          </motion.p>
        </div>
      </div>

      {/* Scroll-driven fan-out — desktop only */}
      <div className="hidden md:block" ref={sectionRef} style={{ minHeight: "380vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
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

      {/* Mobile: simple reveal stack */}
      <div className="md:hidden flex flex-col gap-4 px-5 pb-16">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.19, 1, 0.22, 1] }}
            className="bg-[#17222F] border border-[#253444] rounded-2xl p-6"
          >
            <div className="inline-flex items-center justify-center bg-[#77C0CF] rounded-lg w-9 h-9 mb-5">
              <span className="text-[#0D1218] text-xs font-semibold">{s.number}</span>
            </div>
            <h3 className="text-[#EDF2F7] text-xl font-medium mb-2 tracking-tight">{s.title}</h3>
            <p className="text-[#94A9BE] text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
