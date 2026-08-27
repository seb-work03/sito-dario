"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Compass,
  CreditCard,
  GraduationCap,
  Mail,
  Megaphone,
  Monitor,
  Plus,
  Truck,
  UserRound,
} from "lucide-react";
import { useRef, useState } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { Reveal } from "@/components/reference-clone/Reveal";
import { Testimonials } from "@/components/reference-clone/Testimonials";

const audiences = [
  {
    icon: Building2,
    title: "Aziende e team",
    text: "Percorsi interni per allineare figure manageriali e operative, consolidare un metodo comune e rendere il gruppo più autonomo nelle decisioni sull’e-commerce.",
    note: "Formazione aziendale su misura",
  },
  {
    icon: UserRound,
    title: "Professionisti",
    text: "Corsi per chi vuole comprendere il commercio elettronico, aggiornare le proprie competenze o governare con più consapevolezza un progetto già avviato.",
    note: "Dalle basi ai casi reali",
  },
  {
    icon: GraduationCap,
    title: "Enti e academy",
    text: "Programmi costruiti insieme a enti di formazione, ITS, scuole e organizzazioni che vogliono portare in aula contenuti aggiornati e applicabili.",
    note: "Docenza e programmi personalizzati",
  },
];

const topics = [
  {
    icon: Compass,
    title: "Strategia e modello e-commerce",
    text: "Obiettivi, proposta di valore, catalogo, margini e organizzazione del progetto prima della scelta degli strumenti.",
  },
  {
    icon: Monitor,
    title: "Piattaforme e user experience",
    text: "Scelta della piattaforma, architettura, usabilità e percorso d’acquisto letti dal punto di vista del cliente e dell’azienda.",
  },
  {
    icon: BarChart3,
    title: "Analytics, dati e CRO",
    text: "Metriche, funnel, Google Analytics 4 e conversion rate optimization per trasformare i numeri in domande e decisioni utili.",
  },
  {
    icon: Megaphone,
    title: "Marketing e advertising",
    text: "Canali, contenuti, campagne, marketplace e acquisizione collegati a costi, clienti, risultati e sostenibilità economica.",
  },
  {
    icon: Truck,
    title: "Logistica e customer care",
    text: "Magazzino, spedizioni, resi e relazione con il cliente come parti decisive dell’esperienza e-commerce.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti e operatività",
    text: "Transazioni, sicurezza, carrelli abbandonati e processi quotidiani per gestire il commercio elettronico con maggiore controllo.",
  },
];

const methodSteps = [
  {
    title: "Capire il punto di partenza",
    text: "Obiettivi, pubblico e competenze presenti definiscono il livello reale del corso.",
  },
  {
    title: "Costruire una base comune",
    text: "Le basi non si saltano: permettono a tutti di leggere nello stesso modo strumenti e problemi.",
  },
  {
    title: "Lavorare su casi concreti",
    text: "Esempi, dati e situazioni operative trasformano la teoria in qualcosa che si può usare subito.",
  },
  {
    title: "Lasciare metodo e autonomia",
    text: "La formazione funziona quando le persone continuano a fare domande migliori anche dopo l’aula.",
  },
];

const faqItems = [
  {
    question: "I corsi sono adatti anche a chi parte da zero?",
    answer:
      "Sì. Ogni percorso parte dalla verifica delle competenze iniziali e costruisce una base comune. Non sono richieste conoscenze tecniche pregresse: contenuti, linguaggio ed esercitazioni vengono calibrati sulle persone presenti.",
  },
  {
    question: "È possibile organizzare un corso e-commerce su misura?",
    answer:
      "Sì. Per aziende, team ed enti di formazione definisco programma, durata, livello di approfondimento ed esercitazioni a partire dagli obiettivi e dai problemi reali del pubblico.",
  },
  {
    question: "La formazione può svolgersi direttamente in azienda?",
    answer:
      "Sì. I corsi possono essere organizzati presso l’azienda, in aula, online oppure in modalità ibrida. La scelta dipende dal numero di partecipanti, dal tipo di attività e dal livello di interazione necessario.",
  },
  {
    question: "Quali argomenti possono essere inclusi nel programma?",
    answer:
      "Strategia e-commerce, scelta delle piattaforme, user experience, marketplace, analytics, CRO, marketing, advertising, logistica, pagamenti, customer care e organizzazione del team. Il programma viene verticalizzato in base alle esigenze.",
  },
  {
    question: "Collabori anche con ITS, scuole ed enti di formazione?",
    answer:
      "Sì. Collaboro da anni con enti, academy, ITS e organizzazioni che progettano percorsi dedicati all’e-commerce e al digital marketing, sia come docente sia nella definizione dei contenuti.",
  },
  {
    question: "Quanto dura un percorso formativo?",
    answer:
      "Può essere un workshop di poche ore, un corso intensivo oppure un percorso distribuito su più giornate. La durata viene scelta in funzione degli obiettivi, evitando di comprimere troppi contenuti in tempi che non permetterebbero di assimilarli.",
  },
];

export function FormationPage({
  lessonImageUrl,
  lessonSecondImageUrl,
}: {
  lessonImageUrl?: string | null;
  lessonSecondImageUrl?: string | null;
}) {
  return (
    <>
      <FormationHero />
      <AudiencePaths />
      <ClassroomSection imageUrl={lessonImageUrl} secondImageUrl={lessonSecondImageUrl} />
      <Testimonials />
      <TopicsSection />
      <TrainingMethod />
      <FormationFaq />
    </>
  );
}

function FormationHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#00e5ff]/25 px-5 py-14 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 80% at 100% 0%, rgba(0,229,255,0.1), transparent 72%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-12 md:min-h-[500px] lg:grid-cols-[1.13fr_0.87fr] lg:items-center lg:gap-20">
        <div>
          <AnimatedHeadline
            as="h1"
            delay={0.06}
            className="text-[clamp(50px,13vw,118px)] font-light leading-[0.84] tracking-[-0.065em] text-[#EDF2F7]"
          >
            <>
              <span className="block">Formazione</span>
              <span className="block whitespace-nowrap font-semibold text-[#00e5ff]">e-commerce</span>
            </>
          </AnimatedHeadline>
          <AnimatedText delay={0.25} className="mt-10 max-w-[620px] text-base leading-relaxed text-[#dddddd] md:text-lg">
            Corsi, workshop e percorsi costruiti per aziende, professionisti ed enti di formazione.
            <br />
            Da Rimini, in presenza e online in tutta Italia.
          </AnimatedText>
        </div>

        <div className="border-l border-[#00e5ff] pl-6 md:pl-8 lg:mb-1 lg:pl-10">
          <AnimatedText
            delay={0.16}
            className="text-[25px] font-medium leading-[1.23] tracking-[-0.025em] text-[#EDF2F7] md:text-[31px]"
          >
            La formazione è utile quando ciò che si impara torna al lavoro insieme <span className="whitespace-nowrap">alle persone.</span>
          </AnimatedText>
          <AnimatedText delay={0.28} className="mt-6 text-base leading-relaxed text-[#dddddd] md:text-lg">
            Parto dalle basi, porto in aula casi reali e condivido strumenti già sperimentati sul campo. Nessuna formula magica: metodo, <span className="whitespace-nowrap">confronto e applicazione.</span>
          </AnimatedText>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.46, duration: 0.7 }}
            className="mt-8"
          >
            <Link
              href="#percorsi-formativi"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00e5ff] transition-colors hover:text-[#7af2ff]"
            >
              Scopri i percorsi
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AudiencePaths() {
  return (
    <section id="percorsi-formativi" className="border-b border-[#00e5ff]/18 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <AnimatedHeadline className="text-balance text-[36px] font-medium leading-[1.04] tracking-tight text-[#EDF2F7] md:text-[56px]">
            Stessa materia. Percorsi diversi per chi <span className="whitespace-nowrap">deve usarla.</span>
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Un programma efficace cambia con il pubblico, il contesto e il risultato atteso. Per questo non parto mai da un calendario di lezioni già confezionato.
          </AnimatedText>
        </div>

        <div className="flex flex-col gap-5 md:gap-7">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const alignment = index === 0 ? "mr-auto" : index === 1 ? "mx-auto" : "ml-auto";

            return (
              <motion.article
                key={audience.title}
                initial={{ opacity: 0, x: index === 1 ? 0 : index === 0 ? -36 : 36, y: index === 1 ? 24 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.78, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className={`group relative w-full max-w-[1080px] overflow-hidden rounded-[24px] border border-[#00e5ff]/24 bg-[#17222F] px-6 py-7 transition-colors duration-500 hover:border-[#00e5ff]/60 md:px-9 md:py-9 ${alignment}`}
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[#00e5ff] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:items-center md:gap-12">
                  <div className="flex items-center gap-5">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#00e5ff]/32 text-[#00e5ff] transition-colors duration-500 group-hover:bg-[#00e5ff] group-hover:text-[#0D1218] md:h-14 md:w-14">
                      <Icon size={24} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="text-[25px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[31px]">{audience.title}</h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#00e5ff]">{audience.note}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#dddddd] md:text-base">{audience.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClassroomSection({
  imageUrl,
  secondImageUrl,
}: {
  imageUrl?: string | null;
  secondImageUrl?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-[#00e5ff] px-5 py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,18,24,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(13,18,24,0.11) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <AnimatedHeadline className="text-[38px] font-medium leading-[1.02] tracking-tight text-[#0D1218] md:text-[60px]">
            In aula porto quello che succede davvero.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mt-7 max-w-xl text-base leading-relaxed text-[#0D1218]/80 md:text-lg">
            La formazione nasce da oltre vent&apos;anni di lavoro nell’e-commerce. Errori, decisioni, strumenti e risultati diventano esempi leggibili, senza promesse facili o teoria scollegata dalla pratica.
          </AnimatedText>
          <AnimatedText delay={0.18} className="mt-5 max-w-xl text-base leading-relaxed text-[#0D1218]/80 md:text-lg">
            Le lezioni partono da un livello comune, lasciano spazio alle domande e arrivano ai problemi che aziende e professionisti incontrano ogni giorno.
          </AnimatedText>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#0D1218]/22 pt-8">
            {[
              ["150+", "corsi realizzati"],
              ["1000+", "persone formate"],
              ["20+", "anni sul campo"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.25 + index * 0.08 }}
              >
                <p className="text-[28px] font-semibold leading-none tracking-tight text-[#0D1218] md:text-[38px]">{value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0D1218]/65 md:text-xs">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[480px] md:min-h-[620px]">
          <TrainingPhoto
            imageUrl={secondImageUrl}
            alt="Formazione e-commerce in aula con Dario Tana"
            className="absolute left-0 top-0 h-[72%] w-[72%]"
            delay={0.08}
          />
          <TrainingPhoto
            imageUrl={imageUrl}
            alt="Dario Tana durante una lezione di e-commerce"
            className="absolute bottom-0 right-0 h-[64%] w-[66%]"
            delay={0.22}
          />
        </div>
      </div>
    </section>
  );
}

function TrainingPhoto({
  imageUrl,
  alt,
  className,
  delay,
}: {
  imageUrl?: string | null;
  alt: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, rotate: delay > 0.1 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
      className={`overflow-hidden rounded-[24px] border border-[#0D1218]/28 bg-[#0D1218] shadow-[0_24px_70px_rgba(13,18,24,0.2)] ${className}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          unoptimized={imageUrl.startsWith("http")}
          className="object-cover"
          sizes="(max-width: 1024px) 70vw, 500px"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#17222F,#0D1218)]">
          <div className="absolute inset-5 rounded-[18px] border border-[#00e5ff]/20" />
        </div>
      )}
    </motion.div>
  );
}

function TopicsSection() {
  return (
    <section className="border-b border-[#00e5ff]/18 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 grid gap-7 md:mb-20 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-20">
          <AnimatedHeadline className="text-[36px] font-medium leading-[1.03] tracking-tight text-[#EDF2F7] md:text-[58px]">
            Dal progetto alla gestione quotidiana.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="max-w-xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            I contenuti cambiano con il corso, ma mantengono una visione completa dell’e-commerce: strategia, tecnologia, acquisizione, dati e operatività devono poter dialogare.
          </AnimatedText>
        </div>

        <div className="grid border-y border-white/10 md:grid-cols-2">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.article
                key={topic.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                className={`group flex gap-5 border-b border-white/10 py-8 md:gap-6 md:px-8 md:py-10 ${
                  index % 2 === 0 ? "md:border-r" : ""
                } ${index >= topics.length - 2 ? "md:border-b-0" : ""}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00e5ff]/28 text-[#00e5ff] transition-all duration-500 group-hover:border-[#00e5ff] group-hover:bg-[#00e5ff] group-hover:text-[#0D1218]">
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[23px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[27px]">{topic.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#dddddd] md:text-base">{topic.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrainingMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 72%"],
  });
  const progress = useTransform(scrollYProgress, [0, 0.88], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#00e5ff] px-5 py-20 md:py-28">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedHeadline className="text-[36px] font-medium leading-[1.03] tracking-tight text-[#0D1218] md:text-[58px]">
            Un corso parte dalle persone, non dalle slide.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#0D1218]/78 md:text-lg">
            Metodo, linguaggio ed esempi vengono adattati al livello iniziale e al risultato che deve diventare possibile dopo la formazione.
          </AnimatedText>
        </div>

        <div className="relative mt-16 pl-8 md:mt-20 md:grid md:grid-cols-4 md:gap-8 md:pl-0">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-[#0D1218]/22 md:bottom-auto md:left-0 md:right-0 md:top-2 md:h-px md:w-auto" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-[#0D1218] md:hidden"
            style={{ scaleY: progress }}
          />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-2 hidden h-[2px] origin-left bg-[#0D1218] md:block"
            style={{ scaleX: progress }}
          />

          {methodSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.68, delay: index * 0.1 }}
              className="relative pb-11 last:pb-0 md:pb-0"
            >
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.18 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="absolute -left-[37px] top-0 h-4 w-4 rounded-full border-[3px] border-[#00e5ff] bg-[#0D1218] md:static md:mb-8 md:block"
              />
              <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-[#0D1218] md:text-[25px]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0D1218]/74 md:text-base">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormationFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-[#00e5ff]/25 bg-[#0D1218] px-5 py-16 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[380px_1fr] md:gap-24">
        <div className="self-start md:sticky md:top-[130px]">
          <AnimatedHeadline className="mb-6 text-[32px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[48px]">
            Domande sulla formazione.
          </AnimatedHeadline>
          <AnimatedText delay={0.15} className="mb-8 max-w-xs text-sm leading-relaxed text-[#EDF2F7] md:text-base">
            Ogni aula e ogni azienda partono da esigenze diverse. Scrivimi per costruire un percorso coerente con persone, tempi e obiettivi.
          </AnimatedText>
          <Reveal y={20} delay={0.2} duration={0.9}>
            <Link
              href="/contatti"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00e5ff] py-1.5 pl-5 pr-1.5 text-sm font-medium text-[#0D1218] transition-all duration-500 hover:bg-[#33ecff] hover:shadow-[0_0_28px_rgba(0,229,255,0.55)]"
            >
              Contatti
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff]">
                <Mail size={13} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col divide-y divide-white/8">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full cursor-pointer items-start justify-between gap-4 py-6 text-left md:py-7"
                >
                  <span className="pr-4 text-lg font-medium leading-snug tracking-tight text-[#EDF2F7] transition-colors duration-300 group-hover:text-[#00e5ff] md:text-xl">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      isOpen
                        ? "border-[#00e5ff] bg-[#00e5ff] text-[#0D1218]"
                        : "border-white/15 text-[#EDF2F7] group-hover:border-[#00e5ff]/40"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-[#dddddd]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
