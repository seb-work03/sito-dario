"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";
import { HoverArrow } from "./HoverArrow";

type ServicesProps = {
  consulenteUrl?: string | null;
  formazioneUrl?: string | null;
  speechUrl?: string | null;
};

export function Services({ consulenteUrl, formazioneUrl, speechUrl }: ServicesProps = {}) {
  const services = [
    {
      id: "consulente",
      label: "Consulente",
      href: "/servizi/consulenza-ecommerce",
      photo: consulenteUrl ?? "/reference-assets/adviest/orECDk1yHAceniWXq7yKvfvv7Y.jpg",
      bullets: [
        "Audit strategico e tecnologico",
        "Scalabilità e migrazioni di piattaforma",
        "CRO, dati e advertising",
        "Redditività e KPI",
      ],
    },
    {
      id: "formazione",
      label: "Formazione",
      href: "/servizi/formazione",
      photo: formazioneUrl ?? "/reference-assets/adviest/pK0MgeT7XpWRNeefyNQiRiZz7nQ.jpg",
      bullets: [
        "Formazione in-house su misura",
        "Docenze per ITS e academy",
        "Workshop operativi su casi reali",
        "Percorsi post-diploma e master",
      ],
    },
    {
      id: "eventi",
      label: "Interventi ed Eventi",
      href: "/servizi/speech-eventi",
      photo: speechUrl ?? "/reference-assets/adviest/2HY57myX3y7mgS1UFfrGVyN2yPw.jpg",
      bullets: [
        "Keynote e interventi verticali",
        "Dialoghi e moderazioni",
        "Format custom per eventi corporate",
        "Interventi in fiere di settore",
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="service" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-10 md:mb-14">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
            3 ambiti. Un&apos;unica regia.
          </AnimatedHeadline>
          <AnimatedText className="text-[#dddddd] leading-relaxed" delay={0.1}>
            Strategia, trasferimento di competenze e divulgazione. Ogni intervento
            parte dal contesto reale e arriva a decisioni misurabili.
          </AnimatedText>
        </div>

        {/* Mobile: compact pill tabs on top */}
        <div className="flex md:hidden gap-2 mb-4 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                active === i
                  ? "bg-[#00e5ff] text-[#0D1218] cursor-default"
                  : "bg-[#17222F] text-[#EDF2F7] border border-[#253444] cursor-pointer",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-4 items-stretch">
          {/* Left column tabs — desktop only */}
          <div className="hidden md:flex md:flex-col gap-2 md:h-full">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex-1 text-left px-6 py-5 rounded-xl text-xl font-medium transition-all duration-500 flex items-center justify-between gap-4",
                  active === i
                    ? "bg-[#00e5ff] text-[#0D1218] cursor-default"
                    : "bg-[#17222F] hover:bg-[#1D2B3A] text-[#EDF2F7] border border-[#253444] cursor-pointer",
                )}
              >
                <span className="tracking-tight">{s.label}</span>
                <motion.span
                  animate={{ rotate: active === i ? 45 : 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                    active === i ? "bg-[#0D1218] text-[#00e5ff]" : "bg-[#1D2B3A] text-[#dddddd]",
                  )}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6M6 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
            ))}
          </div>

          {/* Right column: image + bullet card overlay */}
          <div className="relative rounded-2xl overflow-hidden bg-[#17222F] border border-[#253444] min-h-[480px] md:min-h-[440px]">
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
                  src={current.photo}
                  alt={current.label}
                  fill
                  unoptimized={current.photo.startsWith("http")}
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
                <ul className="grid sm:grid-cols-2 gap-3 mb-4">
                  {current.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                      className="flex items-start gap-2.5 text-[#DDE5EF] text-sm"
                    >
                      <ArrowUpRight size={14} className="text-[#00e5ff] mt-0.5 shrink-0" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href={current.href}
                  className="group inline-flex items-center gap-2 text-[#00e5ff] text-sm font-medium hover:text-[#33ecff] transition-colors"
                >
                  Scopri {current.label}
                  <HoverArrow size={14} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
