"use client";

import { motion } from "framer-motion";

/**
 * A high-contrast accent-cyan banner. Placed between Services and Process
 * to break up the dark sections with energy.
 */
export function AccentBanner() {
  return (
    <section className="bg-[#00e5ff] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#0D1218] font-medium text-[28px] md:text-[48px] leading-[1.05] tracking-tight max-w-2xl"
          >
            L&apos;e-commerce non si improvvisa.
            <br />
            <span className="opacity-60">Si governa con metodo.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col gap-4 md:items-end"
          >
            <div className="flex gap-10 md:gap-14">
              {[
                { value: "20+", label: "anni di campo" },
                { value: "€2M+", label: "fatturato guidato" },
                { value: "4.9★", label: "su Google" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[#0D1218] text-3xl md:text-4xl font-semibold tabular-nums tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[#0D1218]/60 text-xs uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
