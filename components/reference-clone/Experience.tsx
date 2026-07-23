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
  },
  {
    title: "Consulenza a imprenditori e founder",
    description:
      "Affiancamento a chi deve decidere direzioni strategiche: piattaforma, canali, priorità di investimento, valutazione di fornitori.",
    image: "2HY57myX3y7mgS1UFfrGVyN2yPw.jpg",
    align: "right",
  },
  {
    title: "Supporto ai responsabili e-commerce",
    description:
      "Un confronto senior indipendente per e-commerce manager, marketing manager e digital manager alle prese con decisioni difficili.",
    image: "h4Vde8UkfZBpzplF7BaH0980o.jpg",
    align: "left",
  },
  {
    title: "Formazione aziendale continuativa",
    description:
      "Percorsi tarati sul team interno: dai fondamenti operativi alle scelte strategiche, con esercitazioni sui casi dell&apos;azienda.",
    image: "Bbboi4AXyPJPomZeBfoeBQjvFfA.jpg",
    align: "right",
  },
  {
    title: "Interventi in eventi e conferenze",
    description:
      "Keynote e talk per organizzatori di eventi, enti di categoria, associazioni di categoria e community verticali dell&apos;e-commerce.",
    image: "0MOEYyAAQpBf4BhTNL0rh0kmJoU.jpg",
    align: "left",
  },
];

export function Experience() {
  return (
    <section className="bg-[#121A24] px-5 py-16 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1240px]">
        <AnimatedLabel>AMBITI DI LAVORO</AnimatedLabel>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="text-[#EDF2F7] font-medium text-[32px] md:text-[52px] leading-[1.05] max-w-3xl mt-4 mb-16 md:mb-24 tracking-tight"
        >
          Contesti diversi, un metodo condiviso.
        </motion.h2>

        <div className="flex flex-col gap-16 md:gap-28">
          {engagements.map((e, i) => (
            <div
              key={e.title}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${e.align === "right" ? "md:[&>*:first-child]:order-2" : ""}`}
            >
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
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1218]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="font-mono text-sm text-[#77C0CF] tabular-nums">
                  {`0${i + 1}`.slice(-2)}
                </span>
                <h3
                  className="text-[#EDF2F7] text-2xl md:text-4xl font-medium mt-3 mb-4 tracking-tight leading-[1.15]"
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
