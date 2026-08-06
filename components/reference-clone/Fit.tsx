"use client";

import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";

export function Fit() {
  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1120px]">
        {/* Centered intro */}
        <div className="text-center mb-14 md:mb-20">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Se cerchi un semplice esecutore, sei nel posto sbagliato.
          </AnimatedHeadline>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-[#94A9BE] text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-6"
          >
            Lavoro con chi cerca un metodo, non un fornitore. Ecco quando ha senso
            parlarsi — e quando no.
          </motion.p>
        </div>

        {/* Two-card comparison */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* NOT FOR — red */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="relative rounded-2xl border border-[#FF6B6B]/25 bg-gradient-to-br from-[#FF6B6B]/[0.06] to-[#17222F]/50 p-7 md:p-9 flex flex-col gap-5 transition-all duration-500 hover:border-[#FF6B6B]/50 hover:-translate-y-1"
          >
            {/* subtle red bloom */}
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(255,107,107,0.35), transparent 70%)" }}
            />
            <div className="relative flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] shrink-0">
                <X size={22} strokeWidth={2.4} />
              </span>
              <span className="text-[#FF6B6B] text-[11px] uppercase tracking-[0.14em] font-medium">
                Non è per
              </span>
            </div>
            <h3 className="relative text-[#EDF2F7] text-xl md:text-2xl font-medium tracking-tight leading-[1.2]">
              Questo spazio non è per te se…
            </h3>
            <p className="relative text-[#94A9BE] text-[15px] md:text-base leading-relaxed">
              Cerchi un esecutore per progetti amatoriali, hai un business senza
              budget di marketing, insegui formule magiche o vuoi un webmaster
              tuttofare a cui delegare problemi mai davvero analizzati.
            </p>
          </motion.div>

          {/* FOR — green */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="relative rounded-2xl border border-[#22C55E]/30 bg-gradient-to-br from-[#22C55E]/[0.07] to-[#17222F]/50 p-7 md:p-9 flex flex-col gap-5 transition-all duration-500 hover:border-[#22C55E]/55 hover:-translate-y-1"
          >
            {/* subtle green bloom */}
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(34,197,94,0.35), transparent 70%)" }}
            />
            <div className="relative flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#22C55E]/15 text-[#22C55E] shrink-0">
                <Plus size={22} strokeWidth={2.4} />
              </span>
              <span className="text-[#22C55E] text-[11px] uppercase tracking-[0.14em] font-medium">
                È per
              </span>
            </div>
            <h3 className="relative text-[#EDF2F7] text-xl md:text-2xl font-medium tracking-tight leading-[1.2]">
              Questo spazio è per te se…
            </h3>
            <p className="relative text-[#94A9BE] text-[15px] md:text-base leading-relaxed">
              Guidi una PMI con un&apos;infrastruttura da scalare, vuoi rendere
              autonomo il tuo team interno o cerchi contenuti di formazione ed
              eventi con un impatto pratico misurabile.
            </p>
          </motion.div>
        </div>

        {/* Closing quote */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="mt-16 md:mt-24 max-w-3xl mx-auto text-center"
        >
          <blockquote className="relative text-[#EDF2F7] italic font-medium text-[22px] md:text-[30px] leading-[1.3] tracking-tight">
            <span className="text-[#00e5ff] text-4xl md:text-5xl align-top leading-none mr-1 not-italic">
              &ldquo;
            </span>
            L&apos;e-commerce non è un software da installare. È un modello di
            business da governare attraverso dati e competenze.
            <span className="text-[#00e5ff] text-4xl md:text-5xl align-bottom leading-none ml-1 not-italic">
              &rdquo;
            </span>
          </blockquote>
          <figcaption className="text-[#6A84A0] text-[11px] uppercase tracking-[0.14em] mt-6">
            Dario Tana
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
