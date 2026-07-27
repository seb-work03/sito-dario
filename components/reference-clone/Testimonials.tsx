"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";

const testimonials = [
  {
    text: "Argomenti attuali e metodo molto pratico. La didattica di Dario è eccellente, chiara e precisa, con grande disponibilità nel confronto.",
    author: "Eva Vanucci",
    role: "Partecipante a un corso E-commerce",
    photo: "6KOKZ6o9umNtbSW8DNXdQdttgbU.png",
  },
  {
    text: "Un professionista con la P maiuscola: esperienza, capacità strategica e attenzione a quei dettagli che fanno una grande differenza nei risultati.",
    author: "Fabio Berardi",
    role: "Esperienza presso DT E-commerce Consulting",
    photo: "pWdflF1Kk7imAbImoSDBfTT3JsE.png",
  },
  {
    text: "Preciso e diretto. Sa spiegare concetti complessi anche a chi non è del mestiere e mantenere alta l'attenzione dell'intera classe.",
    author: "Parafarma Group",
    role: "Formazione E-commerce",
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
            <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-2xl tracking-tight">
              La competenza si riconosce da ciò che lascia agli altri.
            </AnimatedHeadline>
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
              className="group w-12 h-12 rounded-full bg-[#17222F] hover:bg-[#00e5ff] border border-[#253444] hover:border-[#00e5ff] text-[#EDF2F7] hover:text-[#0D1218] flex items-center justify-center transition-all duration-500 overflow-hidden relative cursor-pointer"
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
              className="group w-12 h-12 rounded-full bg-[#17222F] hover:bg-[#00e5ff] border border-[#253444] hover:border-[#00e5ff] text-[#EDF2F7] hover:text-[#0D1218] flex items-center justify-center transition-all duration-500 overflow-hidden relative cursor-pointer"
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
            <Quote size={40} className="text-[#00e5ff] mb-4 shrink-0" strokeWidth={1.25} />
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
                  className="h-1 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === index ? 24 : 8,
                    background: i === index ? "#00e5ff" : "rgba(148,169,190,0.3)",
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
