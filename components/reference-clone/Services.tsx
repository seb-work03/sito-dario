"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedHeadline } from "./AnimatedHeadline";

const services = [
  {
    number: "01",
    title: "Advisory",
    description:
      "Consulenza diretta per PMI strutturate: audit strategico e tecnologico, scalabilità e migrazioni di piattaforma, CRO, dati, advertising e redditività.",
    href: "/servizi#advisory",
  },
  {
    number: "02",
    title: "Formazione",
    description:
      "Trasferimento tecnologico e strategico. Formazione in-house su misura, docenze avanzate per ITS e academy, workshop operativi su casi reali.",
    href: "/formazione",
  },
  {
    number: "03",
    title: "Interventi ed Eventi",
    description:
      "Contenuti concreti, zero fuffa. Keynote e interventi verticali, panel e moderazioni, format custom per eventi corporate e fiere di settore.",
    href: "/eventi",
  },
];

export function Services() {
  return (
    <section id="service" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-xl tracking-tight">
            3 ambiti. Un&apos;unica regia.
          </AnimatedHeadline>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#94A9BE] max-w-sm md:text-right leading-relaxed"
          >
            Strategia, trasferimento di competenze e divulgazione. Ogni intervento
            parte dal contesto reale e arriva a decisioni misurabili.
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
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#EDF2F7]">
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
                className="pt-[80px] pb-[40px] first:pt-0"
              >
                <Link
                  href={s.href}
                  className="group grid grid-cols-[auto_1fr] gap-6 items-center"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00e5ff] text-sm text-[#0D1218] font-semibold tabular-nums shrink-0 transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(0,229,255,0.6)]">
                    {s.number}
                  </span>
                  <div>
                    <h3 className="text-[#EDF2F7] text-2xl md:text-3xl font-medium mb-2 tracking-tight relative inline-block">
                      {s.title}
                      <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#00e5ff] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full" />
                    </h3>
                    <p className="text-[#94A9BE] leading-relaxed">{s.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
