"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const testimonials = [
  {
    text: "Competenze vere su Magento ed e-commerce, trasmesse senza mai annoiare, tra esempi concreti e battute al momento giusto. Quello che mi ha colpito di più è la sua capacità di gestire ogni tipo di cliente, trovando sempre la soluzione innovativa che non ti aspetti. Un percorso che mi ha dato strumenti concreti e un modo diverso di pensare al lavoro.",
    author: "Laura D.",
    role: "Corso Tecnico Progettista E-commerce",
  },
  {
    text: "Quando la passione per il proprio lavoro si unisce a una competenza tecnica indiscutibile, i risultati si vedono. Un'agenzia seria, sempre aggiornata sulle ultime tecnologie e molto disponibile. 5 stelle piene.",
    author: "Roman Z.",
    role: "Recensione Google",
  },
  {
    text: "Super gentile e disponibile, ogni argomento dal più semplice al più complicato lo ha reso interessante e unico. Mi sono divertita a creare qualcosa di mio personale nonostante la poca esperienza.",
    author: "Giada",
    role: "Recensione Google",
  },
  {
    text: "È riuscito a coinvolgere e a tenere alta l'attenzione per tutta la durata delle lezioni, rendendo concetti complicati semplici ed anche divertenti, con tanti consigli strategici.",
    author: "Elena D.",
    role: "Corso E-commerce Strategies e Magento",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FBBF24" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const current = testimonials[index];
  const prev = () => { setDirection(-1); setIndex((i) => (i - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1); setIndex((i) => (i + 1) % testimonials.length); };

  return (
    <section id="testimon" className="bg-[#0D1218] px-4 md:px-5 py-16 md:py-24 border-t border-white/5">
      <div className="mx-auto max-w-[1360px]">
        <div className="relative rounded-[28px] md:rounded-[36px] bg-[#00e5ff] px-6 md:px-14 py-12 md:py-16 overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
            <div>
              <AnimatedHeadline className="text-[#0D1218] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl tracking-tight">
                La competenza si riconosce da ciò che lascia agli altri.
              </AnimatedHeadline>
              <AnimatedText className="text-[#0D1218]/70 text-sm md:text-base mt-4 max-w-md leading-relaxed" delay={0.1}>
                Media 4.9 su oltre 200 recensioni Google.
              </AnimatedText>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prev}
                aria-label="Testimonianza precedente"
                className="group w-12 h-12 rounded-full bg-white/85 hover:bg-[#0D1218] border border-[#0D1218]/15 hover:border-[#0D1218] text-[#0D1218] hover:text-[#00e5ff] flex items-center justify-center transition-all duration-500 overflow-hidden relative cursor-pointer"
              >
                <ArrowLeft size={16} className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-8" />
                <ArrowLeft size={16} className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-8 group-hover:translate-x-0" />
              </button>
              <button
                onClick={next}
                aria-label="Testimonianza successiva"
                className="group w-12 h-12 rounded-full bg-white/85 hover:bg-[#0D1218] border border-[#0D1218]/15 hover:border-[#0D1218] text-[#0D1218] hover:text-[#00e5ff] flex items-center justify-center transition-all duration-500 overflow-hidden relative cursor-pointer"
              >
                <ArrowRight size={16} className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8" />
                <ArrowRight size={16} className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-8 group-hover:translate-x-0" />
              </button>
            </div>
          </div>

          {/* Dark testimonial card */}
          <div className="relative rounded-2xl bg-[#0D1218] border border-white/8 p-8 md:p-12 min-h-[280px] flex flex-col justify-between overflow-hidden">
            {/* Stars + Google badge at top */}
            <div className="flex items-center gap-4 mb-6">
              <Stars />
              <span className="flex items-center gap-1.5 text-[#94A9BE] text-xs font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Recensione Google
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, y: 20 * (direction || 1) }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 * (direction || 1) }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="flex-1 flex flex-col justify-between gap-8"
              >
                <p className="text-[#EDF2F7] text-xl md:text-2xl font-medium leading-snug tracking-tight">
                  &ldquo;{current.text}&rdquo;
                </p>
                <div>
                  <p className="text-[#EDF2F7] font-medium">{current.author}</p>
                  <p className="text-[#6A84A0] text-sm mt-1">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute bottom-6 right-8 flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Vai a testimonianza ${i + 1}`}
                  className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === index ? 24 : 8,
                    background: i === index ? "#00e5ff" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
