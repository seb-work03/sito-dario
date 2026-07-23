"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatedLabel } from "./AnimatedLabel";

const testimonials = [
  {
    text: "[TESTIMONIANZA DA SELEZIONARE — recensione Google reale, testo integrale con contesto del progetto.]",
    author: "[NOME AUTORE DA CONFERMARE]",
    role: "[RUOLO E AZIENDA DA CONFERMARE]",
    photo: "6KOKZ6o9umNtbSW8DNXdQdttgbU.png",
  },
  {
    text: "[TESTIMONIANZA DA SELEZIONARE — seconda recensione con focus differente: consulenza / formazione / docenza.]",
    author: "[NOME AUTORE DA CONFERMARE]",
    role: "[RUOLO E AZIENDA DA CONFERMARE]",
    photo: "pWdflF1Kk7imAbImoSDBfTT3JsE.png",
  },
  {
    text: "[TESTIMONIANZA DA SELEZIONARE — terza recensione da un partecipante di corso o intervento.]",
    author: "[NOME AUTORE DA CONFERMARE]",
    role: "[RUOLO E AZIENDA DA CONFERMARE]",
    photo: "8nmd4a4Fuz2gP25iKfTc5Obrs.png",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const current = testimonials[index];
  const prev = () => { setDirection(-1); setIndex((i) => (i - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1); setIndex((i) => (i + 1) % testimonials.length); };

  return (
    <section id="testimon" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <AnimatedLabel>TESTIMONIANZE</AnimatedLabel>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl mt-4 tracking-tight"
            >
              Le persone con cui ho lavorato.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="text-[#94A9BE] text-sm md:text-base mt-4 max-w-md leading-relaxed"
            >
              Media 4.9 su oltre 200 recensioni Google. [LINK GOOGLE MY BUSINESS DA INSERIRE]
            </motion.p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Testimonianza precedente"
              className="group w-12 h-12 rounded-full bg-[#17222F] hover:bg-[#77C0CF] border border-[#253444] hover:border-[#77C0CF] text-[#EDF2F7] hover:text-[#0D1218] flex items-center justify-center transition-all duration-500 overflow-hidden relative"
            >
              <ArrowLeft
                size={16}
                className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-8"
              />
              <ArrowLeft
                size={16}
                className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-8 group-hover:translate-x-0"
              />
            </button>
            <button
              onClick={next}
              aria-label="Testimonianza successiva"
              className="group w-12 h-12 rounded-full bg-[#17222F] hover:bg-[#77C0CF] border border-[#253444] hover:border-[#77C0CF] text-[#EDF2F7] hover:text-[#0D1218] flex items-center justify-center transition-all duration-500 overflow-hidden relative"
            >
              <ArrowRight
                size={16}
                className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8"
              />
              <ArrowRight
                size={16}
                className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-8 group-hover:translate-x-0"
              />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6 items-stretch">
          <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto bg-[#17222F]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={`/reference-assets/adviest/${current.photo}`}
                  alt={`[FOTO ${current.author}]`}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-[#17222F] border border-[#253444] rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-between overflow-hidden relative">
            <Quote size={40} className="text-[#77C0CF] mb-4 shrink-0" strokeWidth={1.25} />
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
                  <p className="text-[#94A9BE] text-sm mt-1">{current.role}</p>
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
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? 24 : 8,
                    background: i === index ? "#77C0CF" : "rgba(148,169,190,0.3)",
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
