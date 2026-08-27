"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Plus } from "lucide-react";
import { useState } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";

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

const themes = [
  "E-commerce",
  "Piattaforme",
  "Analytics",
  "Marketing",
  "Advertising",
  "CRO",
  "Strategia",
  "Organizzazione",
];

const themeDetails = [
  {
    title: "E-commerce senza scorciatoie",
    text: "Cosa succede davvero quando tecnologia, margini, marketing e processi devono funzionare insieme.",
  },
  {
    title: "Dati che aiutano a decidere",
    text: "Analytics e CRO raccontati per capire comportamenti, priorità e domande, non per riempire altre dashboard.",
  },
  {
    title: "Tecnologia con un perché",
    text: "Piattaforme, strumenti e automazioni lette a partire dal lavoro che devono migliorare e dalle persone che le useranno.",
  },
  {
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
    word: "Taglio",
    title: "Trovare la domanda centrale",
    text: "Seleziono un punto di vista e costruisco una sequenza leggibile. Non provo a dire tutto: scelgo ciò che può davvero servire in quel momento.",
  },
  {
    word: "Palco",
    title: "Dare ritmo alle idee",
    text: "Casi, esempi e linguaggio tengono insieme profondità e chiarezza. Le slide accompagnano il racconto, non prendono il suo posto.",
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
              <motion.div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 bg-[#00e5ff]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.18 + index * 0.12, ease: [0.19, 1, 0.22, 1] }}
                style={{ transformOrigin: index === 1 ? "center" : index === 0 ? "left" : "right" }}
              />
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
    <section className="relative isolate overflow-hidden bg-[#00e5ff] px-5 py-20 text-[#0D1218] md:py-32">
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 -z-10 whitespace-nowrap text-[clamp(130px,24vw,350px)] font-semibold leading-none tracking-[-0.08em] text-transparent opacity-20 [-webkit-text-stroke:1px_#0D1218]"
        animate={{ x: ["-5%", "-28%"] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        ASCOLTO ASCOLTO ASCOLTO
      </motion.p>

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
  return (
    <section className="overflow-hidden border-b border-[#00e5ff]/18 bg-[#0D1218] py-20 md:py-32">
      <ThemeMarquee reverse={false} />

      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 md:py-28 lg:grid-cols-[0.76fr_1.24fr] lg:gap-24">
        <div>
          <AnimatedHeadline className="text-[40px] font-medium leading-[1.01] tracking-tight text-[#EDF2F7] md:text-[62px]">
            <><span className="block">Temi solidi.</span><span className="block whitespace-nowrap">Taglio su misura.</span></>
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mt-7 max-w-md text-pretty text-base leading-relaxed text-[#dddddd] md:text-lg">
            Parlo di ciò che conosco dal lavoro quotidiano. Il tema viene poi selezionato, messo a fuoco e collegato al pubblico dell’evento.
          </AnimatedText>
        </div>

        <div className="grid gap-x-12 md:grid-cols-2">
          {themeDetails.map((theme, index) => (
            <motion.article
              key={theme.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.72, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="border-t border-[#00e5ff]/25 py-7 md:py-9"
            >
              <h3 className="text-[24px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[28px]">{theme.title}</h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-[#dddddd] md:text-base">{theme.text}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <ThemeMarquee reverse />
    </section>
  );
}

function ThemeMarquee({ reverse }: { reverse: boolean }) {
  const repeatedThemes = [...themes, ...themes];

  return (
    <div aria-hidden className="overflow-hidden border-y border-[#00e5ff]/30 bg-[#121A23] py-4">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {repeatedThemes.map((theme, index) => (
          <div key={`${theme}-${index}`} className="flex items-center">
            <span className="px-7 text-sm font-semibold uppercase tracking-[0.13em] text-[#EDF2F7] md:px-10 md:text-base">{theme}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />
          </div>
        ))}
      </motion.div>
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
        Le persone non devono uscire pensando che sia tutto semplice. Devono uscire sapendo <span className="text-[#00e5ff]">da dove cominciare.</span>
      </motion.blockquote>
    </section>
  );
}

function SpeechFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-[#00e5ff]/16 bg-[#0D1218] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
        <div>
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
