"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { AnimatedLabel } from "./AnimatedLabel";

const audiences = [
  {
    id: "imprenditori",
    label: "Imprenditori",
    photo: "U2BCGakYtmoTeb2cJuHIw7BiCWA.jpg",
    bullets: [
      "Scelte di piattaforma e stack",
      "Priorità di investimento",
      "Valutazione di fornitori",
      "Piani di crescita realistici",
    ],
  },
  {
    id: "responsabili",
    label: "Responsabili e-commerce",
    photo: "JjUw52EussY8kwoSstWgrw6glNA.jpg",
    bullets: [
      "Audit indipendente del progetto",
      "Supporto nelle decisioni difficili",
      "Revisione dei processi interni",
      "Coordinamento tra fornitori",
    ],
  },
  {
    id: "enti",
    label: "Enti formativi e docenti",
    photo: "U2BCGakYtmoTeb2cJuHIw7BiCWA.jpg",
    bullets: [
      "Docenza in master e executive",
      "Interventi in eventi",
      "Percorsi formativi custom",
      "Workshop verticali",
    ],
  },
];

export function Insights() {
  const [active, setActive] = useState(0);
  const current = audiences[active];

  return (
    <section id="insights" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <AnimatedLabel>CON CHI LAVORO</AnimatedLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl mt-4 mb-4 tracking-tight"
        >
          Progetti diversi, un metodo condiviso.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-[#94A9BE] max-w-lg mb-10 leading-relaxed"
        >
          Ogni contesto richiede uno sguardo dedicato — ma il modo di leggere i
          problemi resta lo stesso.
        </motion.p>

        <div className="grid md:grid-cols-[320px_1fr] gap-4 items-stretch">
          <div className="flex md:flex-col gap-2">
            {audiences.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex-1 md:flex-none text-left px-6 py-5 rounded-xl text-lg md:text-xl font-medium transition-all duration-500 flex items-center justify-between gap-4",
                  active === i
                    ? "bg-[#77C0CF] text-[#0D1218]"
                    : "bg-[#17222F] hover:bg-[#1D2B3A] text-[#EDF2F7] border border-[#253444]"
                )}
              >
                <span className="tracking-tight">{t.label}</span>
                <motion.span
                  animate={{ rotate: active === i ? 45 : 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                    active === i ? "bg-[#0D1218] text-[#77C0CF]" : "bg-[#1D2B3A] text-[#94A9BE]"
                  )}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6M6 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-[#17222F] border border-[#253444] min-h-[380px] md:min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={`/reference-assets/adviest/${current.photo}`}
                  alt={`[FOTO CONTESTO ${current.label}]`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218] via-[#0D1218]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Bullet card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bullets-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute left-6 md:left-8 bottom-6 md:bottom-8 right-6 md:right-8 rounded-2xl bg-[#0D1218]/85 backdrop-blur-md border border-white/8 p-5 md:p-6"
              >
                <ul className="grid sm:grid-cols-2 gap-3">
                  {current.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                      className="flex items-start gap-2.5 text-[#DDE5EF] text-sm"
                    >
                      <ArrowUpRight size={14} className="text-[#77C0CF] mt-0.5 shrink-0" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
