"use client";

import { X, Check } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";
import { Reveal } from "./Reveal";

export function Fit() {
  return (
    <section className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1120px]">
        {/* Centered intro: title on top, description below */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
            <>
              Se cerchi un semplice esecutore,
              <br />
              sei nel posto sbagliato.
            </>
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
          <Reveal className="h-full" y={20} duration={0.9}>
            <div className="relative h-full rounded-2xl border border-[#FF6B6B]/25 bg-gradient-to-br from-[#FF6B6B]/[0.06] to-[#17222F]/50 p-7 md:p-9 flex flex-col gap-5 transition-all duration-500 hover:border-[#FF6B6B]/50 hover:-translate-y-1">
              {/* subtle red bloom */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-40 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(255,107,107,0.35), transparent 70%)" }}
              />
              <h3 className="relative flex items-center gap-3 text-[#FF6B6B] text-xl md:text-2xl font-medium tracking-tight leading-[1.2]">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] shrink-0">
                  <X size={22} strokeWidth={2.4} />
                </span>
                Questo spazio non è per te se…
              </h3>
              <p className="relative text-[#dddddd] text-[15px] md:text-base leading-relaxed">
                Cerchi un esecutore per progetti amatoriali, hai un business senza
                budget di marketing, insegui formule magiche o vuoi un webmaster
                tuttofare a cui delegare problemi mai davvero analizzati.
              </p>
            </div>
          </Reveal>

          {/* FOR — green */}
          <Reveal className="h-full" y={20} delay={0.1} duration={0.9}>
            <div className="relative h-full rounded-2xl border border-[#22C55E]/30 bg-gradient-to-br from-[#22C55E]/[0.07] to-[#17222F]/50 p-7 md:p-9 flex flex-col gap-5 transition-all duration-500 hover:border-[#22C55E]/55 hover:-translate-y-1">
              {/* subtle green bloom */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-40 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(34,197,94,0.35), transparent 70%)" }}
              />
              <h3 className="relative flex items-center gap-3 text-[#22C55E] text-xl md:text-2xl font-medium tracking-tight leading-[1.2]">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#22C55E]/15 text-[#22C55E] shrink-0">
                  <Check size={22} strokeWidth={2.6} />
                </span>
                Questo spazio è per te se…
              </h3>
              <p className="relative text-[#dddddd] text-[15px] md:text-base leading-relaxed">
                Guidi una PMI con un&apos;infrastruttura da scalare, vuoi rendere
                autonomo il tuo team interno o cerchi contenuti di formazione ed
                eventi con un impatto pratico misurabile.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
