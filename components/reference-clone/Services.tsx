"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedLabel } from "./AnimatedLabel";

const services = [
  {
    number: "01",
    title: "Consulenza",
    description:
      "Analisi indipendente del contesto e-commerce, definizione delle priorità, supporto nelle decisioni difficili.",
    href: "/servizi#consulenza",
  },
  {
    number: "02",
    title: "Formazione aziendale",
    description:
      "Percorsi su misura per team interni: dai fondamenti operativi alle scelte strategiche di canale.",
    href: "/formazione",
  },
  {
    number: "03",
    title: "Docenza",
    description:
      "Interventi in master, executive program e business school. E-commerce spiegato con casi reali.",
    href: "/formazione#docenza",
  },
  {
    number: "04",
    title: "Corsi & workshop",
    description:
      "Sessioni verticali per approfondire un tema — piattaforme, marketplace, dati, organizzazione.",
    href: "/formazione#corsi",
  },
];

export function Services() {
  return (
    <section id="service" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <AnimatedLabel>COSA FACCIO</AnimatedLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-xl tracking-tight"
          >
            Quattro modi per lavorare insieme.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#94A9BE] max-w-sm md:text-right leading-relaxed"
          >
            Ogni attività parte da un ascolto reale del contesto. Nessun format
            preconfezionato.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Sticky photo — with subtle idle animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative md:sticky md:top-[130px] rounded-3xl overflow-hidden aspect-[4/3] bg-[#17222F] group"
          >
            <Image
              src="/reference-assets/adviest/orECDk1yHAceniWXq7yKvfvv7Y.jpg"
              alt="[FOTO DARIO IN CONSULENZA DA INSERIRE]"
              fill
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1218]/60 via-transparent to-transparent" />
            <div className="absolute left-6 bottom-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#77C0CF] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#EDF2F7]">
                Consulente indipendente
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col divide-y divide-white/8">
            {services.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              >
                <Link
                  href={s.href}
                  className="group grid grid-cols-[auto_1fr_auto] gap-6 py-10 md:py-12 first:pt-0 items-center"
                >
                  <span className="font-mono text-sm text-[#77C0CF]/60 tabular-nums transition-colors duration-300 group-hover:text-[#77C0CF]">
                    {s.number}
                  </span>
                  <div>
                    <h3 className="text-[#EDF2F7] text-2xl md:text-3xl font-medium mb-2 tracking-tight relative inline-block">
                      {s.title}
                      <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#77C0CF] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full" />
                    </h3>
                    <p className="text-[#94A9BE] leading-relaxed">{s.description}</p>
                  </div>
                  {/* Arrow container needs relative so the absolute twin is scoped here */}
                  <span className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 overflow-hidden text-[#94A9BE] group-hover:border-[#77C0CF] group-hover:text-[#77C0CF] transition-colors duration-500">
                    <ArrowUpRight
                      size={16}
                      className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-5 group-hover:-translate-y-5"
                    />
                    <ArrowUpRight
                      size={16}
                      className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
