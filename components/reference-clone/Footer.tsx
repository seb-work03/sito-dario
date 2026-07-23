"use client";

import { Mail, Star } from "lucide-react";
import { motion } from "framer-motion";

function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const columnA = [
  { label: "Chi sono", href: "#about-us" },
  { label: "Servizi", href: "#service" },
  { label: "Metodo", href: "#process" },
  { label: "Contatti", href: "/contatti" },
];

const columnB = [
  { label: "LinkedIn", href: "https://linkedin.com/in/dariotana", icon: <LinkedinIcon /> },
  { label: "Email", href: "mailto:info@dariotana.it", icon: <Mail size={14} /> },
  { label: "Google Reviews", href: "https://g.page/r/[LINK GOOGLE MY BUSINESS DA INSERIRE]", icon: <Star size={14} /> },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#17222F] px-5 pt-20 pb-8 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14 mb-16">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="text-[#EDF2F7] font-medium text-[28px] md:text-[48px] leading-[1.1] mb-8 tracking-tight text-balance"
            >
              Hai un progetto, un problema, o una decisione da prendere?
            </motion.h2>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              href="/contatti"
              className="group inline-flex items-center gap-2 rounded-full bg-[#77C0CF] text-[#0D1218] font-medium pl-6 pr-2 py-2 hover:bg-[#5BAAB9] transition-all duration-500 hover:pl-8 mb-10"
            >
              Parliamone
              <span className="relative flex items-center justify-center rounded-full bg-[#0D1218] text-[#77C0CF] w-10 h-10 overflow-hidden shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8 group-hover:-translate-y-8">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>

            <div className="flex items-center gap-3">
              {columnB.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#77C0CF]/15 border border-white/10 hover:border-[#77C0CF]/40 flex items-center justify-center text-[#94A9BE] hover:text-[#77C0CF] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-16 shrink-0">
            <ul className="flex flex-col gap-3">
              <li className="font-mono text-xs uppercase tracking-[0.15em] text-[#4F6577] mb-2">Menu</li>
              {columnA.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#C1CEDF] hover:text-[#77C0CF] transition-colors duration-300 text-sm">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              <li className="font-mono text-xs uppercase tracking-[0.15em] text-[#4F6577] mb-2">Contatti</li>
              {columnB.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[#C1CEDF] hover:text-[#77C0CF] transition-colors duration-300 inline-flex items-center gap-1.5 text-sm"
                  >
                    {l.label} <span aria-hidden className="text-[#4F6577]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant DARIO.TANA — animated on scroll into view */}
        <div className="border-t border-white/8 pt-12 mb-6 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] font-medium leading-[0.85] tracking-[-0.04em] whitespace-nowrap select-none"
            style={{ fontSize: "clamp(3.5rem, 15vw, 15rem)" }}
            aria-hidden="true"
          >
            DARIO<span className="text-[#77C0CF]">.</span>TANA
          </motion.p>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#4F6577] text-xs font-mono">
          <span>© {year} Dario Tana &nbsp;·&nbsp; P.IVA [DA INSERIRE]</span>
          <span>Cofondatore DT E-commerce Consulting</span>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-[#94A9BE] transition-colors">Privacy</a>
            <a href="/cookie" className="hover:text-[#94A9BE] transition-colors">Cookie</a>
            <a href="/note-legali" className="hover:text-[#94A9BE] transition-colors">Note legali</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
