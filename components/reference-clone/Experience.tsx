"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedLabel } from "./AnimatedLabel";

const engagements = [
  {
    title: "Docenza in master ed executive program",
    description:
      "Interventi in percorsi universitari e post-laurea. E-commerce raccontato attraverso casi reali, dati verificabili e decisioni prese sul campo.",
    image: "pK0MgeT7XpWRNeefyNQiRiZz7nQ.jpg",
    align: "left",
    tags: ["Master", "Executive", "Università"],
    stat: { value: "50+", label: "edizioni" },
  },
  {
    title: "Consulenza a imprenditori e founder",
    description:
      "Affiancamento a chi deve decidere direzioni strategiche: piattaforma, canali, priorità di investimento, valutazione di fornitori.",
    image: "2HY57myX3y7mgS1UFfrGVyN2yPw.jpg",
    align: "right",
    tags: ["PMI", "Strategia", "Audit"],
    stat: { value: "20+", label: "anni" },
  },
  {
    title: "Supporto ai responsabili e-commerce",
    description:
      "Un confronto senior indipendente per e-commerce manager, marketing manager e digital manager alle prese con decisioni difficili.",
    image: "h4Vde8UkfZBpzplF7BaH0980o.jpg",
    align: "left",
    tags: ["Manager", "Mentoring", "Advisory"],
    stat: { value: "30+", label: "clienti" },
  },
  {
    title: "Formazione aziendale continuativa",
    description:
      "Percorsi tarati sul team interno: dai fondamenti operativi alle scelte strategiche, con esercitazioni sui casi dell'azienda.",
    image: "Bbboi4AXyPJPomZeBfoeBQjvFfA.jpg",
    align: "right",
    tags: ["Corporate", "In-house", "Workshop"],
    stat: { value: "4.9★", label: "rating" },
  },
  {
    title: "Interventi in eventi e conferenze",
    description:
      "Keynote e talk per organizzatori di eventi, enti di categoria, associazioni e community verticali dell'e-commerce.",
    image: "0MOEYyAAQpBf4BhTNL0rh0kmJoU.jpg",
    align: "left",
    tags: ["Keynote", "Panel", "Fiere"],
    stat: { value: "100+", label: "talk" },
  },
];

export function Experience() {
  return (
    <section className="bg-[#121A24] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <AnimatedLabel>AMBITI DI LAVORO</AnimatedLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-3xl tracking-tight"
          >
            Contesti diversi, un metodo condiviso.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="text-[#94A9BE] max-w-xs md:text-right leading-relaxed shrink-0"
          >
            Cinque contesti, un unico approccio: partire dai dati, decidere con metodo.
          </motion.p>
        </div>

        {/* Timeline line — desktop only */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#253444] to-transparent -translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col gap-20 md:gap-32">
            {engagements.map((e, i) => (
              <div
                key={e.title}
                className={`grid md:grid-cols-2 gap-8 md:gap-20 items-center ${e.align === "right" ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image block */}
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#17222F]"
                >
                  <Image
                    src={`/reference-assets/adviest/${e.image}`}
                    alt={`[FOTO DA INSERIRE — ${e.title}]`}
                    fill
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218]/70 via-transparent to-transparent" />
                  {/* Stat badge — bottom-left */}
                  <div className="absolute bottom-5 left-5 flex flex-col gap-0">
                    <span className="text-[#EDF2F7] text-2xl font-semibold tabular-nums leading-none">{e.stat.value}</span>
                    <span className="text-[#EDF2F7]/60 text-xs uppercase tracking-widest">{e.stat.label}</span>
                  </div>
                  {/* Accent corner indicator */}
                  <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>

                {/* Text block */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                >
                  {/* Step indicator + tags */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-sm text-[#00e5ff] tabular-nums font-medium">
                      {`0${i + 1}`.slice(-2)}
                    </span>
                    <div className="w-8 h-px bg-[#253444]" />
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-[0.12em] text-[#6A84A0] border border-[#253444] rounded-full px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-[#EDF2F7] text-2xl md:text-4xl font-medium mb-4 tracking-tight leading-[1.15]"
                    dangerouslySetInnerHTML={{ __html: e.title }}
                  />
                  <p
                    className="text-[#94A9BE] text-base md:text-lg max-w-md leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: e.description }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden flex flex-col gap-8">
          {engagements.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
              className="rounded-2xl overflow-hidden bg-[#17222F] border border-[#253444]"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={`/reference-assets/adviest/${e.image}`}
                  alt={`[FOTO — ${e.title}]`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17222F] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs text-[#00e5ff] font-medium tabular-nums">{`0${i + 1}`.slice(-2)}</span>
                  {e.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest text-[#6A84A0] border border-[#253444] rounded-full px-2 py-0.5">{t}</span>
                  ))}
                </div>
                <h3 className="text-[#EDF2F7] text-xl font-medium mb-2 tracking-tight">{e.title}</h3>
                <p className="text-[#94A9BE] text-sm leading-relaxed">{e.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 border-t border-white/8 pt-14">
          <AnimatedLabel>NOTA</AnimatedLabel>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] font-medium text-[28px] md:text-[40px] mt-4 tracking-tight max-w-2xl leading-[1.15]"
          >
            Il lavoro di consulenza e quello di docenza si alimentano a vicenda.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[#94A9BE] mt-4 max-w-lg leading-relaxed"
          >
            Ogni caso reale diventa esempio per l&apos;aula. Ogni domanda in
            aula affina il modo di leggere i problemi in consulenza.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
