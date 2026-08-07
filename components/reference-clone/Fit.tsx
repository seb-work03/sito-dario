"use client";

import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

export function Fit() {
  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1120px]">
        {/* Centered intro: title on top, description below */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
            Se cerchi un semplice esecutore, sei nel posto sbagliato.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.15}
            className="text-[#dddddd] text-base md:text-lg leading-relaxed mt-6 max-w-xl mx-auto"
          >
            Lavoro con chi cerca un metodo, non un fornitore. Ecco quando ha senso
            parlarsi, e quando no.
          </AnimatedText>
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
            <p className="relative text-[#dddddd] text-[15px] md:text-base leading-relaxed">
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
            <p className="relative text-[#dddddd] text-[15px] md:text-base leading-relaxed">
              Guidi una PMI con un&apos;infrastruttura da scalare, vuoi rendere
              autonomo il tuo team interno o cerchi contenuti di formazione ed
              eventi con un impatto pratico misurabile.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
