"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { AnimatedLabel } from "./AnimatedLabel";

const faqs = [
  {
    q: "Come si svolge una consulenza tipo?",
    a: "Parte da un primo confronto per capire il contesto. Poi si definisce l'attività — un audit, un affiancamento, una consulenza continuativa — con obiettivi chiari e tempi realistici. Ogni consulenza è personalizzata: non esistono format standard.",
  },
  {
    q: "Quanto costa una consulenza?",
    a: "Il costo dipende dal tipo di intervento, dalla durata e dalla profondità dell'analisi. Dopo il primo confronto invio una proposta scritta con perimetro, tempi e importo. Nessun preventivo prima di aver capito il contesto.",
  },
  {
    q: "Qual è la differenza tra la tua consulenza e DT E-commerce Consulting?",
    a: "Come consulente indipendente offro analisi, strategia, formazione e affiancamento. DT E-commerce Consulting — di cui sono cofondatore con Tiziana Tana — è la struttura operativa che sviluppa e gestisce i progetti e-commerce. Due ruoli complementari con obiettivi diversi.",
  },
  {
    q: "Lavori solo in italiano o anche all'estero?",
    a: "L'attività principale è in italiano, in Italia. Per progetti internazionali valuto caso per caso in funzione della complessità linguistica e organizzativa richiesta.",
  },
  {
    q: "Puoi intervenire in aula o in azienda per formazione?",
    a: "Sì. Faccio docenza in master, executive program, corsi aziendali e workshop verticali. Il format e la durata si adattano al pubblico e agli obiettivi formativi.",
  },
  {
    q: "Come iniziamo a lavorare insieme?",
    a: "Il modo più semplice è scrivermi attraverso il modulo contatti o via email. In uno o due giorni lavorativi rispondo per capire se e come posso essere utile, e propongo un primo confronto.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px] grid md:grid-cols-[380px_1fr] gap-12 md:gap-24">
        <div className="md:sticky md:top-[130px] self-start">
          <AnimatedLabel>FAQ</AnimatedLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] font-medium text-[32px] md:text-[48px] leading-[1.05] mt-4 mb-6 tracking-tight"
          >
            Domande frequenti.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-[#94A9BE] text-sm md:text-base leading-relaxed mb-8 max-w-xs"
          >
            Non trovi la risposta che cerchi? Scrivimi direttamente: rispondo
            personalmente in uno o due giorni lavorativi.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            href="/contatti"
            className="group inline-flex items-center gap-2 rounded-full bg-[#77C0CF] text-[#0D1218] font-medium pl-5 pr-1.5 py-1.5 text-sm hover:bg-[#5BAAB9] transition-all duration-500 hover:pl-7"
          >
            Parliamone
            <span className="relative flex items-center justify-center rounded-full bg-[#0D1218] text-[#77C0CF] w-8 h-8 overflow-hidden shrink-0">
              <ArrowRight size={13} className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8 group-hover:-translate-y-8" />
              <ArrowRight size={13} className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0" />
            </span>
          </motion.a>
        </div>

        <div className="flex flex-col divide-y divide-white/8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 md:py-7 flex items-start justify-between gap-4 text-left group"
                >
                  <span className="text-[#EDF2F7] text-lg md:text-xl font-medium leading-snug tracking-tight pr-4 transition-colors duration-300 group-hover:text-[#77C0CF]">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-500 ${
                      isOpen
                        ? "bg-[#77C0CF] border-[#77C0CF] text-[#0D1218]"
                        : "border-white/15 text-[#EDF2F7] group-hover:border-[#77C0CF]/40"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-[#94A9BE] leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
