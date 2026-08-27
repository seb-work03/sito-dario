"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Mail, Plus } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { Testimonials } from "@/components/reference-clone/Testimonials";

const formats = [
  {
    title: "Keynote",
    text: "Un intervento con un filo narrativo preciso, costruito per aprire una giornata, cambiare prospettiva o lasciare una domanda utile alla sala.",
    note: "Visione, casi concreti, ritmo",
  },
  {
    title: "Panel e tavole rotonde",
    text: "Un confronto in cui esperienza e punti di vista diversi diventano valore. Entro nel dialogo senza risposte preparate e senza sottrarmi alle domande.",
    note: "Confronto, lettura, esperienza",
  },
  {
    title: "Eventi aziendali",
    text: "Un contenuto pensato per clienti, partner o persone dell’azienda, collegato al contesto dell’evento e agli obiettivi che lo hanno fatto nascere.",
    note: "Contenuti e format su misura",
  },
];

const themeDetails = [
  {
    label: "E-commerce",
    title: "E-commerce senza scorciatoie",
    text: "Cosa succede davvero quando tecnologia, margini, marketing e processi devono funzionare insieme.",
  },
  {
    label: "Dati e CRO",
    title: "Dati che aiutano a decidere",
    text: "Analytics e CRO raccontati per capire comportamenti, priorità e domande, non per riempire altre dashboard.",
  },
  {
    label: "Piattaforme",
    title: "Tecnologia con un perché",
    text: "Piattaforme, strumenti e automazioni lette a partire dal lavoro che devono migliorare e dalle persone che le useranno.",
  },
  {
    label: "Marketing e ADV",
    title: "Marketing legato al business",
    text: "Advertising, contenuti e acquisizione collegati a clienti, costi e sostenibilità invece che a metriche isolate.",
  },
];

const directionSteps = [
  {
    word: "Pubblico",
    title: "Capire chi sarà in sala",
    text: "Parto dalle persone: ruolo, livello di conoscenza, aspettative e contesto. Lo stesso argomento cambia quando cambia chi lo ascolta.",
  },
  {
    word: "Messaggio",
    title: "Trovare l’idea centrale",
    text: "Seleziono un punto di vista e costruisco una sequenza leggibile. Non provo a dire tutto: scelgo ciò che può davvero servire in quel momento.",
  },
  {
    word: "Palco",
    title: "Dare ritmo alle idee",
    text: "Casi, esempi e linguaggio tengono insieme profondità e chiarezza. Le slide accompagnano il racconto, non prendono il suo posto.",
  },
];

const stageQuestions: Array<{
  id: string;
  plain: string;
  before: ReactNode;
  accent: string;
  after: string;
}> = [
  {
    id: "priorita",
    plain: "Stiamo scegliendo strumenti o priorità?",
    before: "Stiamo scegliendo ",
    accent: "strumenti",
    after: " o priorità?",
  },
  {
    id: "dati",
    plain: "Cosa raccontano davvero i dati?",
    before: "Cosa raccontano ",
    accent: "davvero",
    after: " i dati?",
  },
  {
    id: "crescita",
    plain: "Un e-commerce che vende di più sta sempre crescendo?",
    before: <span>Un <span className="whitespace-nowrap">e-commerce</span> che vende di più </span>,
    accent: "sta sempre",
    after: " crescendo?",
  },
  {
    id: "contesto",
    plain: "Quanto costa una decisione presa senza contesto?",
    before: "Quanto costa una decisione ",
    accent: "presa senza",
    after: " contesto?",
  },
];

const faqItems = [
  {
    question: "Per quali eventi è possibile richiedere uno speech?",
    answer:
      "Keynote, conferenze, fiere, convention aziendali, eventi per clienti e partner, tavole rotonde, panel e appuntamenti organizzati da associazioni o community. Il formato viene definito in base alla sala, al pubblico e al ruolo dell’intervento nel programma.",
  },
  {
    question: "Lo speech viene personalizzato per l’evento?",
    answer:
      "Sì. Tema, esempi, linguaggio, durata e livello di approfondimento vengono costruiti sul pubblico e sugli obiettivi dell’organizzatore. Non porto sul palco una presentazione standard adattata soltanto nel titolo.",
  },
  {
    question: "Quali argomenti possono essere trattati?",
    answer:
      "E-commerce, piattaforme, analytics, CRO, marketing, advertising, organizzazione e trasformazione digitale. Il punto di partenza è sempre una domanda precisa, così l’intervento mantiene un filo chiaro e non diventa un elenco di tendenze.",
  },
  {
    question: "Puoi partecipare anche a panel e tavole rotonde?",
    answer:
      "Sì. Partecipo volentieri a confronti con imprenditori, professionisti e figure del settore, sia come ospite sia contribuendo alla costruzione delle domande e del taglio editoriale.",
  },
  {
    question: "Gli interventi sono disponibili anche fuori Rimini?",
    answer:
      "Sì. Ho base a Rimini e partecipo a eventi in tutta Italia. Quando il format lo consente, è possibile valutare anche un collegamento da remoto.",
  },
];

export function SpeechEventsPage() {
  return (
    <>
      <SpeechHero />
      <FormatsSection />
      <AudienceSection />
      <ThemesSection />
      <Testimonials />
      <StageQuestions />
      <DirectionSection />
      <ClosingThought />
      <SpeechFaq />
    </>
  );
}

function SpeechHero() {
  return (
    <section className="relative isolate flex min-h-[600px] items-center overflow-hidden border-b border-[#00e5ff]/22 px-5 py-16 md:min-h-[620px] md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(0,229,255,0.19) 0%, rgba(0,229,255,0.055) 31%, transparent 63%)",
        }}
      />
      <VoiceField />

      <div className="relative mx-auto w-full max-w-[1240px] text-center">
        <AnimatedHeadline
          as="h1"
          delay={0.04}
          className="mx-auto max-w-[1120px] text-balance text-[clamp(48px,8.3vw,108px)] font-medium leading-[0.93] tracking-[-0.055em] text-[#EDF2F7]"
        >
          <>
            <span className="block">Parlo di <span className="whitespace-nowrap">e-commerce.</span></span>
            <span className="block text-[#00e5ff]">Sul palco, senza filtri.</span>
          </>
        </AnimatedHeadline>

        <AnimatedText
          delay={0.22}
          className="mx-auto mt-9 max-w-[740px] text-pretty text-base leading-relaxed text-[#dddddd] md:text-xl"
        >
          Keynote, panel e interventi per eventi, fiere, associazioni e aziende. Contenuti costruiti sul pubblico, con casi concreti e un linguaggio comprensibile.
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.7 }}
          className="mt-8"
        >
          <Link
            href="#formati"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00e5ff] transition-colors hover:text-[#7af2ff]"
          >
            Scopri i formati
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function VoiceField() {
  const bars = [22, 36, 54, 30, 68, 42, 78, 50, 92, 62, 36, 74, 48, 84, 58, 96, 52, 78, 38, 68, 30, 54, 42, 26];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[42%] items-end justify-center gap-[clamp(5px,1.1vw,16px)] overflow-hidden opacity-35">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="w-[clamp(2px,0.28vw,4px)] origin-bottom rounded-full bg-[#00e5ff]"
          style={{ height: `${height}%` }}
          animate={{ scaleY: [0.28, 1, 0.48, 0.82, 0.28], opacity: [0.3, 0.9, 0.45, 0.72, 0.3] }}
          transition={{
            duration: 3.8 + (index % 5) * 0.42,
            delay: index * 0.055,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FormatsSection() {
  return (
    <section id="formati" className="bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-end gap-7 border-b border-[#00e5ff]/22 pb-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pb-16">
          <AnimatedHeadline className="max-w-3xl text-balance text-[38px] font-medium leading-[1.02] tracking-tight text-[#EDF2F7] md:text-[60px]">
            Uno speech non è un corso accorciato.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="max-w-xl text-pretty text-base leading-relaxed text-[#dddddd] md:text-lg">
            Sul palco cambiano tempo, attenzione e aspettative. Per questo ogni intervento ha una forma propria, non soltanto meno slide.
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-3">
          {formats.map((format, index) => (
            <motion.article
              key={format.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.38 }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group relative min-h-[330px] overflow-hidden border-b border-[#00e5ff]/18 py-10 md:border-b-0 md:border-r md:px-9 md:py-14 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">{format.note}</p>
              <h2 className="mt-7 text-[34px] font-medium leading-none tracking-tight text-[#EDF2F7] md:text-[42px]">{format.title}</h2>
              <p className="mt-7 max-w-sm text-pretty text-base leading-relaxed text-[#dddddd]">{format.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const listeningPoints = [
    ["Chi c’è in sala", "Ruoli, esperienza e linguaggio del pubblico."],
    ["Perché è lì", "Il contesto che dà senso all’intervento."],
    ["Cosa deve restare", "Un’idea, una domanda o un criterio da usare."],
  ];

  return (
    <section className="relative overflow-hidden bg-[#00e5ff] px-5 py-20 text-[#0D1218] md:pb-16 md:pt-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-24">
        <div>
          <AnimatedHeadline className="max-w-[680px] text-balance text-[42px] font-medium leading-[0.98] tracking-tight text-[#0D1218] md:text-[68px]">
            Prima delle slide viene chi ascolta.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-[#0D1218]/78 md:text-lg">
            Un evento non ha bisogno di un contenuto generico con il logo giusto. Ha bisogno di un punto di vista che sappia parlare a quella sala, in quel momento.
          </AnimatedText>
        </div>

        <div className="border-y border-[#0D1218]/28">
          {listeningPoints.map(([title, text], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.72, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="grid gap-2 border-b border-[#0D1218]/24 py-7 last:border-b-0 sm:grid-cols-[0.85fr_1.15fr] sm:items-baseline sm:gap-8 md:py-9"
            >
              <h3 className="text-[24px] font-semibold leading-tight tracking-tight sm:whitespace-nowrap md:text-[28px]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#0D1218]/72 md:text-base">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

function ThemesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTheme = themeDetails[activeIndex];

  return (
    <section className="border-b border-[#00e5ff]/18 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedHeadline className="text-balance text-[40px] font-medium leading-[1.01] tracking-tight text-[#EDF2F7] md:text-[62px]">
            Temi che conosco sul campo.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[#dddddd] md:text-lg">
            Il punto non è commentare ogni novità. È scegliere un tema solido, collegarlo al pubblico e renderlo comprensibile attraverso esperienza e casi concreti.
          </AnimatedText>
        </div>

        <div className="mt-14 grid overflow-hidden border-y border-[#00e5ff]/26 md:mt-20 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="border-b border-[#00e5ff]/26 lg:border-b-0 lg:border-r">
            {themeDetails.map((theme, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={theme.label}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group flex w-full items-center justify-between gap-5 border-b border-[#00e5ff]/18 px-1 py-6 text-left last:border-b-0 md:px-7 md:py-7 ${isActive ? "text-[#00e5ff]" : "text-[#EDF2F7]"}`}
                  aria-pressed={isActive}
                >
                  <span className="text-[24px] font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-[30px]">{theme.label}</span>
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-500 ${isActive ? "scale-100 bg-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.72)]" : "scale-75 border border-[#00e5ff]/45"}`} />
                </button>
              );
            })}
          </div>

          <div className="relative flex min-h-[390px] items-center overflow-hidden px-1 py-12 md:px-12 md:py-16 lg:min-h-[470px] lg:px-16">
            <p aria-hidden className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 text-balance text-center text-[clamp(64px,10vw,138px)] font-semibold leading-[0.86] tracking-[-0.065em] text-[#00e5ff]/[0.045]">
              {activeTheme.label}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-2xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Sul palco</p>
                <h3 className="mt-6 text-balance text-[36px] font-medium leading-[1.02] tracking-tight text-[#EDF2F7] md:text-[52px]">{activeTheme.title}</h3>
                <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-[#dddddd] md:text-lg">{activeTheme.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageQuestions() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative h-[320vh] border-b border-[#00e5ff]/18 bg-[#0D1218]">
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center overflow-hidden px-5 md:top-24 md:h-[calc(100vh-6rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.085), transparent 34%), linear-gradient(90deg, transparent 49.94%, rgba(0,229,255,0.08) 50%, transparent 50.06%)",
          }}
        />

        <div className="relative mx-auto h-full w-full max-w-[1240px]">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-x-0 top-10 text-center text-[24px] font-medium tracking-tight text-[#EDF2F7] md:top-14 md:text-[32px]"
          >
            Le domande che porto sul palco.
          </motion.h2>

          <ul className="sr-only">
            {stageQuestions.map((question) => <li key={question.id}>{question.plain}</li>)}
          </ul>

          <div aria-hidden className="absolute inset-x-0 bottom-20 top-24 md:bottom-24 md:top-32">
            {stageQuestions.map((question, index) => (
              <StageQuestion
                key={question.id}
                question={question}
                index={index}
                total={stageQuestions.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <QuestionProgress progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function StageQuestion({
  question,
  index,
  total,
  progress,
}: {
  question: (typeof stageQuestions)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const settle = start + 0.045;
  const end = (index + 1) / total;
  const release = end - 0.045;

  const inputRange = index === 0
    ? [0, release, end, 1]
    : index === total - 1
      ? [0, start, settle, 1]
      : [0, start, settle, release, end, 1];
  const opacityRange = index === 0
    ? [1, 1, 0, 0]
    : index === total - 1
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0, 0];
  const yRange = index === 0
    ? [0, 0, -42, -42]
    : index === total - 1
      ? [42, 42, 0, 0]
      : [42, 42, 0, 0, -42, -42];
  const scaleRange = index === 0
    ? [1, 1, 0.97, 0.97]
    : index === total - 1
      ? [0.97, 0.97, 1, 1]
      : [0.97, 0.97, 1, 1, 0.97, 0.97];

  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);
  const scale = useTransform(progress, inputRange, scaleRange);

  return (
    <motion.p
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center text-balance text-center text-[clamp(42px,6.4vw,88px)] font-medium leading-[1.02] tracking-[-0.045em] text-[#EDF2F7]"
    >
      <span className="max-w-[1120px]">
        {question.before}
        <span className="text-[#00e5ff]">{question.accent}</span>
        {question.after}
      </span>
    </motion.p>
  );
}

function QuestionProgress({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-10 mx-auto h-px max-w-[520px] overflow-hidden bg-white/12 md:bottom-14">
      <motion.div className="h-full origin-left bg-[#00e5ff]" style={{ scaleX }} />
    </div>
  );
}

function DirectionSection() {
  return (
    <section className="bg-[#121A23] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-16">
          <AnimatedHeadline className="text-balance text-[40px] font-medium leading-[1.01] tracking-tight text-[#EDF2F7] md:text-[62px]">
            Dal briefing al palco.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="max-w-xl text-pretty text-base leading-relaxed text-[#dddddd] md:text-lg">
            La preparazione serve a togliere, scegliere e dare un ordine. È così che un argomento ampio diventa un intervento con una direzione precisa.
          </AnimatedText>
        </div>

        <div className="border-t border-[#00e5ff]/28">
          {directionSteps.map((step, index) => (
            <motion.article
              key={step.word}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: index * 0.09, ease: [0.19, 1, 0.22, 1] }}
              className="group grid gap-5 border-b border-[#00e5ff]/22 py-9 md:grid-cols-[0.72fr_0.85fr_1.25fr] md:items-center md:gap-12 md:py-12"
            >
              <p className="text-[42px] font-medium leading-none tracking-[-0.045em] text-[#00e5ff]/28 transition-colors duration-500 group-hover:text-[#00e5ff] md:text-[64px]">{step.word}</p>
              <h3 className="text-[25px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[29px]">{step.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-[#dddddd] md:text-base">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingThought() {
  return (
    <section className="relative overflow-hidden bg-[#0D1218] px-5 py-24 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00e5ff]/12" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00e5ff]/7" />
      <motion.blockquote
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="relative mx-auto max-w-[1040px] text-balance text-center text-[34px] font-medium leading-[1.08] tracking-tight text-[#EDF2F7] md:text-[58px]"
      >
        <span className="block">Le persone non devono uscire pensando che sia tutto semplice.</span>
        <span className="mt-3 block">Devono uscire sapendo <span className="text-[#00e5ff]">da dove cominciare.</span></span>
      </motion.blockquote>
    </section>
  );
}

function SpeechFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-[#00e5ff]/16 bg-[#0D1218] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <AnimatedHeadline className="mb-6 text-balance text-[34px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[48px]">
            Domande su speech ed eventi.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mb-8 max-w-xs text-pretty text-sm leading-relaxed text-[#dddddd] md:text-base">
            Se stai costruendo un evento, raccontami pubblico, contesto e obiettivo. Il formato viene dopo.
          </AnimatedText>
          <Link
            href="/contatti"
            className="group inline-flex items-center gap-3 rounded-full bg-[#00e5ff] px-5 py-3 text-sm font-medium text-[#0D1218] transition-colors hover:bg-[#7af2ff]"
          >
            Contatti
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff]">
              <Mail size={14} strokeWidth={1.8} />
            </span>
          </Link>
        </div>

        <div>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-medium leading-snug text-[#EDF2F7] md:text-xl">{item.question}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "border-[#00e5ff] bg-[#00e5ff] text-[#0D1218]" : "border-white/15 text-[#EDF2F7]"}`}>
                    <Plus size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-7 pr-12 text-sm leading-relaxed text-[#dddddd] md:text-base">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
