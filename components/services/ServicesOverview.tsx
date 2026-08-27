"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type MouseEvent } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { Testimonials } from "@/components/reference-clone/Testimonials";

const services = [
  {
    id: "consulenza",
    headline: "Dare priorità a ciò che muove davvero il progetto.",
    description:
      "Per progettare un nuovo e-commerce o far evolvere un’attività già avviata. Analizzo tecnologia, numeri, marketing e organizzazione per trasformare la complessità in una sequenza di decisioni concrete.",
    href: "/servizi/consulenza-ecommerce",
    linkLabel: "Esplora la consulenza",
    audiences: ["Nuovi progetti", "E-commerce avviati", "Audit o affiancamento"],
    areas: ["Strategia e piattaforma", "Dati, CRO e advertising", "Processi, team e marginalità"],
    visual: "consulting" as const,
  },
  {
    id: "formazione",
    headline: "Trasformare esperienza e strumenti in autonomia.",
    description:
      "Corsi e percorsi per professionisti, aziende, team ed enti di formazione. Ogni intervento parte dalle basi condivise e arriva a casi, strumenti e problemi che le persone incontrano davvero nel lavoro.",
    href: "/servizi/formazione",
    linkLabel: "Scopri la formazione",
    audiences: ["Professionisti", "Aziende e team", "Enti e academy"],
    areas: ["Workshop e corsi", "Percorsi su misura", "Online o in presenza"],
    visual: "training" as const,
  },
  {
    id: "speech",
    headline: "Portare sul palco contenuti che restano.",
    description:
      "Keynote, panel e interventi dedicati a e-commerce, piattaforme, analytics, marketing e advertising. Contenuti costruiti sul pubblico e raccontati con esempi leggibili, senza semplificazioni vuote.",
    href: "/servizi/speech-eventi",
    linkLabel: "Scopri speech ed eventi",
    audiences: ["Eventi e fiere", "Panel e keynote", "Format aziendali"],
    areas: ["E-commerce e piattaforme", "Analytics e dati", "Marketing e ADV"],
    visual: "speech" as const,
  },
];

const choices = [
  {
    question: "Devi partire, riorganizzare o far crescere un e-commerce?",
    answer: "Consulenza",
    href: "/servizi/consulenza-ecommerce",
  },
  {
    question: "Vuoi rendere più autonome persone, team o partecipanti?",
    answer: "Formazione",
    href: "/servizi/formazione",
  },
  {
    question: "Vuoi portare l’e-commerce dentro un evento o un confronto pubblico?",
    answer: "Speech ed eventi",
    href: "/servizi/speech-eventi",
  },
];

const method = [
  {
    number: "01",
    title: "Leggere il contesto",
    text: "Obiettivi, persone, numeri e vincoli vengono prima degli strumenti.",
  },
  {
    number: "02",
    title: "Tradurre la complessità",
    text: "Dati e problemi diventano priorità comprensibili e utilizzabili.",
  },
  {
    number: "03",
    title: "Lasciare autonomia",
    text: "Ogni intervento deve produrre decisioni e competenze che restano.",
  },
];

export function ServicesOverview() {
  return (
    <>
      <ServicesHero />
      <ServicesPanels />
      <ServiceChooser />
      <SharedMethod />
      <Testimonials title="3 modi di lavorare. Risultati che parlano." />
    </>
  );
}

function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#00e5ff]/25 px-5 py-16 md:py-24 lg:min-h-[calc(100vh-6rem)] lg:py-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 70% 45%, black, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 82% at -4% 42%, rgba(0,229,255,0.2) 0%, rgba(0,229,255,0.08) 40%, transparent 72%)",
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-[16%] h-[520px] w-[520px] rounded-full bg-[#00e5ff]/12 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:min-h-[620px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <div className="max-w-[760px] text-center lg:text-left">
          <AnimatedHeadline
            as="h1"
            delay={0.08}
            className="text-[42px] font-medium leading-[0.99] tracking-[-0.045em] text-[#EDF2F7] sm:text-[54px] md:text-[72px] lg:text-[78px]"
          >
            3 modi per portare esperienza nel tuo progetto.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.22}
            className="mx-auto mt-7 max-w-[650px] text-base leading-relaxed text-[#dddddd] md:text-xl lg:mx-0"
          >
            <strong className="font-semibold text-[#EDF2F7]">Consulenza e-commerce</strong>,{" "}
            <strong className="font-semibold text-[#EDF2F7]">formazione</strong> e{" "}
            <strong className="font-semibold text-[#EDF2F7]">speech ed eventi</strong> per aziende, professionisti ed enti in tutta Italia. 3 forme diverse, costruite sullo stesso principio: partire dalla realtà e lasciare strumenti utili.
          </AnimatedText>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.19, 1, 0.22, 1] }}
            className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start"
          >
            {["Base a Rimini", "Progetti in tutta Italia", "20+ anni sul campo"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#00e5ff] bg-[#00e5ff] px-4 py-2 text-xs font-medium text-[#0D1218] shadow-[0_8px_28px_rgba(0,229,255,0.16)]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <ServiceConstellation />
      </div>
    </section>
  );
}

function ServiceConstellation() {
  const nodes = [
    { label: "Consulenza e-commerce", className: "left-1/2 top-[4%] -translate-x-1/2" },
    { label: "Formazione", className: "bottom-[10%] left-[3%]" },
    { label: "Speech ed eventi", className: "bottom-[10%] right-[3%]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.18, ease: [0.19, 1, 0.22, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[500px]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-[9%] rounded-full border border-dashed border-[#00e5ff]/32"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-[21%] rounded-full border border-[#00e5ff]/28"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.9)]" />
      </motion.div>

      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <motion.path
          d="M50 17 L17 73 L83 73 Z"
          fill="rgba(0,229,255,0.065)"
          stroke="#00e5ff"
          strokeOpacity="0.72"
          strokeWidth="0.65"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: [0, -12] }}
          transition={{ pathLength: { duration: 1.4, delay: 0.45 }, strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" } }}
        />
        {["M50 50 L50 17", "M50 50 L17 73", "M50 50 L83 73"].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="#00e5ff"
            strokeOpacity="0.56"
            strokeWidth="0.55"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.65 + index * 0.12 }}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#00e5ff] bg-[#00e5ff] p-5 text-center shadow-[0_0_70px_rgba(0,229,255,0.25)] md:h-40 md:w-40">
        <span className="text-sm font-semibold leading-tight text-[#0D1218] md:text-base">
          Esperienza
          <br />
          sul campo
        </span>
      </div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1, y: [0, -9, 0, 6, 0] }}
          transition={{ opacity: { duration: 0.55, delay: 0.75 + index * 0.12 }, scale: { duration: 0.55, delay: 0.75 + index * 0.12 }, y: { duration: 7.2, delay: index * 0.55, repeat: Infinity, ease: [0.45, 0, 0.55, 1] } }}
          className={`absolute flex h-20 min-w-24 max-w-36 transform-gpu will-change-transform items-center justify-center rounded-2xl border border-[#00e5ff] bg-[#00e5ff] px-4 text-center text-xs font-bold text-[#0D1218] shadow-[0_14px_42px_rgba(0,229,255,0.2)] md:h-24 md:min-w-32 md:max-w-40 md:text-sm ${node.className}`}
        >
          {node.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ServicesPanels() {
  return (
    <section className="border-b border-[#00e5ff]/18 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <AnimatedHeadline className="text-[34px] font-medium leading-[1.04] tracking-tight text-[#EDF2F7] md:text-[54px]">
            Il servizio giusto dipende da ciò che deve cambiare.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Non parto da un pacchetto predefinito. Parto dal punto in cui si trova il progetto, dalle persone coinvolte e dal risultato che deve diventare possibile.
          </AnimatedText>
        </div>

        <div className="flex flex-col gap-7 md:gap-9">
          {services.map((service, index) => (
            <ServicePanel key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePanel({ service, index }: { service: (typeof services)[number]; index: number }) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const glow = useMotionTemplate`radial-gradient(440px circle at ${mouseX}px ${mouseY}px, rgba(0,229,255,0.13), transparent 68%)`;

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.article
      id={service.id}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => {
        mouseX.set(-500);
        mouseY.set(-500);
      }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
      className="group relative isolate overflow-hidden rounded-[26px] border border-[#00e5ff]/22 bg-[#17222F] transition-colors duration-500 hover:border-[#00e5ff]/48 md:rounded-[34px]"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: glow }} />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#00e5ff]/10 transition-transform duration-1000 group-hover:scale-110" />
      <div className="relative z-10 grid items-stretch lg:grid-cols-2">
        <div className={`flex flex-col p-7 sm:p-9 md:p-12 lg:p-14 lg:pt-11 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <h2 className="text-[34px] font-medium leading-[1.02] tracking-[-0.04em] text-[#EDF2F7] md:text-[48px]">
            {service.headline}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#dddddd] md:text-base">
            {service.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {service.audiences.map((audience) => (
              <span key={audience} className="rounded-full border border-[#00e5ff] bg-[#00e5ff] px-3.5 py-2 text-xs font-medium text-[#0D1218] shadow-[0_8px_24px_rgba(0,229,255,0.12)]">
                {audience}
              </span>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 border-t border-[#00e5ff]/14 pt-7 sm:grid-cols-2">
            {service.areas.map((area) => (
              <li key={area} className="flex items-start gap-2.5 text-sm leading-snug text-[#dddddd]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" />
                {area}
              </li>
            ))}
          </ul>
          <Link
            href={service.href}
            className="mt-9 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#00e5ff] transition-colors hover:text-[#7af2ff]"
          >
            {service.linkLabel}
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className={`min-h-[330px] p-5 sm:p-7 lg:min-h-full ${index % 2 === 1 ? "lg:order-1" : ""}`}>
          <div className="h-full min-h-[300px] overflow-hidden rounded-[22px] border border-[#00e5ff]/18 bg-[#0D1218]">
            {service.visual === "consulting" && <ConsultingVisual />}
            {service.visual === "training" && <TrainingVisual />}
            {service.visual === "speech" && <SpeechVisual />}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ConsultingVisual() {
  return (
    <div className="relative h-full min-h-[300px] overflow-hidden p-6">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,229,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.12)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.13em] text-[#77C0CF]">Scenario operativo</span>
        <span className="flex items-center gap-2 text-[11px] text-[#dddddd]">
          <span className="h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.8)]" />
          dati attivi
        </span>
      </div>
      <svg aria-hidden className="absolute inset-x-5 bottom-8 h-[72%] w-[calc(100%-2.5rem)]" viewBox="0 0 520 250" preserveAspectRatio="none">
        <path d="M12 220 C90 205, 100 185, 155 190 S235 145, 285 158 S365 92, 415 112 S470 56, 508 42" fill="none" stroke="rgba(0,229,255,0.18)" strokeWidth="2" />
        <motion.path
          d="M12 220 C90 205, 100 185, 155 190 S235 145, 285 158 S365 92, 415 112 S470 56, 508 42"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        />
        {[[155, 190], [285, 158], [415, 112], [508, 42]].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="#00e5ff"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + index * 0.18, duration: 0.4 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-7 right-6 rounded-xl border border-[#00e5ff] bg-[#00e5ff] px-4 py-3 shadow-[0_10px_30px_rgba(0,229,255,0.16)]"
      >
        <span className="block text-2xl font-semibold text-[#0D1218]">Priorità</span>
        <span className="mt-1 block text-[11px] text-[#0D1218]/75">prima degli strumenti</span>
      </motion.div>
    </div>
  );
}

function TrainingVisual() {
  const topics = [
    { label: "Strategia", className: "left-[7%] top-[13%]", delay: 0 },
    { label: "Dati", className: "right-[8%] top-[17%]", delay: 0.7 },
    { label: "Marketing", className: "bottom-[13%] left-[6%]", delay: 1.35 },
    { label: "Processi", className: "bottom-[11%] right-[7%]", delay: 2 },
  ];

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.12),transparent_46%)]">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {["M50 50 L17 19", "M50 50 L82 20", "M50 50 L17 84", "M50 50 L82 85"].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="#00e5ff"
            strokeOpacity="0.68"
            strokeWidth="0.65"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1, strokeDashoffset: [0, -8] }}
            viewport={{ once: true }}
            transition={{ pathLength: { duration: 0.8, delay: index * 0.12 }, strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" } }}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#00e5ff] bg-[#00e5ff] p-4 text-center text-sm font-semibold text-[#0D1218] shadow-[0_0_54px_rgba(0,229,255,0.24)]">
        Competenze
        <br />
        che restano
      </div>
      {topics.map((topic, index) => (
        <motion.span
          key={topic.label}
          initial={{ opacity: 0, scale: 0.86, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 + index * 0.12, ease: [0.19, 1, 0.22, 1] }}
          className={`absolute transform-gpu will-change-transform ${topic.className}`}
        >
          <motion.span
            animate={{ y: [-7, 7, -7] }}
            transition={{ duration: 6.4, delay: topic.delay, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            className="block transform-gpu will-change-transform rounded-xl border border-[#00e5ff] bg-[#00e5ff] px-4 py-3 text-xs font-semibold text-[#0D1218] shadow-[0_9px_26px_rgba(0,229,255,0.15)]"
          >
            {topic.label}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}

function SpeechVisual() {
  const bars = [32, 58, 42, 78, 48, 92, 62, 84, 44, 72, 38, 66, 50, 88, 56, 74, 40];

  return (
    <div className="relative flex h-full min-h-[300px] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(0,229,255,0.16),transparent_43%)] px-6">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#00e5ff]/50 to-transparent" />
      <div className="relative flex h-28 items-center justify-center gap-1.5">
        {bars.map((height, index) => (
          <motion.span
            key={`${height}-${index}`}
            className="w-1.5 rounded-full bg-[#00e5ff]"
            style={{ height }}
            animate={{ scaleY: [0.35, 1, 0.55, 0.82, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.055, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45 }}
        className="relative mt-8 max-w-sm text-center text-xl font-medium leading-tight text-[#EDF2F7] md:text-2xl"
      >
        Rendere comprensibile ciò che spesso viene raccontato come complicato.
      </motion.p>
    </div>
  );
}

function ServiceChooser() {
  return (
    <section className="bg-[#0D1218] px-4 py-20 md:px-5 md:py-28">
      <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[28px] bg-[#00e5ff] p-5 md:rounded-[38px] md:p-10">
        <div className="grid gap-9 p-3 md:grid-cols-[0.76fr_1.24fr] md:items-center md:p-6 lg:gap-16">
          <div>
            <AnimatedHeadline className="text-[34px] font-medium leading-[1.03] tracking-tight text-[#0D1218] md:text-[52px]">
              Non devi sapere già quale servizio ti serve.
            </AnimatedHeadline>
            <AnimatedText delay={0.1} className="mt-5 max-w-lg text-base leading-relaxed text-[#0D1218]/72">
              Parti da ciò che vuoi rendere possibile. Il formato dell’intervento viene dopo.
            </AnimatedText>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#00e5ff]/22 bg-[#0D1218] px-5 md:px-7">
            {choices.map((choice, index) => (
              <motion.div
                key={choice.answer}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="border-b border-[#00e5ff]/16 last:border-0"
              >
                <Link href={choice.href} className="group grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                  <span className="text-sm leading-relaxed text-[#dddddd] md:text-base">{choice.question}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#00e5ff]">
                    {choice.answer}
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SharedMethod() {
  const alignments = ["mr-auto", "mx-auto", "ml-auto"];

  return (
    <section className="border-t border-[#00e5ff]/25 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <AnimatedHeadline className="text-[38px] font-medium leading-[1.02] tracking-tight text-[#EDF2F7] md:text-[58px]">
            3 forme.
            <br />
            Un solo modo di lavorare.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Che si tratti di un progetto, di un’aula o di un palco, il valore nasce quando l’esperienza diventa comprensione e la comprensione diventa autonomia.
          </AnimatedText>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#00e5ff]/10 blur-[110px]" />
          <div className="relative flex flex-col gap-4 md:gap-5">
            {method.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, x: index === 0 ? -42 : index === 2 ? 42 : 0, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                whileHover={{ x: index === 0 ? 8 : index === 2 ? -8 : 0 }}
                viewport={{ once: true, amount: 0.32 }}
                transition={{ duration: 0.82, delay: index * 0.12, ease: [0.19, 1, 0.22, 1] }}
                className={`group relative isolate w-full overflow-hidden rounded-[22px] border border-[#00e5ff]/32 bg-[#17222F] px-5 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.2)] md:w-[88%] md:px-8 md:py-9 ${alignments[index]}`}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 -z-0 w-[30%] -skew-x-12 bg-gradient-to-r from-transparent via-[#00e5ff]/12 to-transparent blur-xl will-change-transform"
                  animate={{ x: ["-150%", "450%"] }}
                  transition={{ duration: 7.8, delay: index * 1.25, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 grid gap-5 md:grid-cols-[64px_0.8fr_1.2fr] md:items-center md:gap-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00e5ff] text-xs font-bold text-[#0D1218] shadow-[0_0_28px_rgba(0,229,255,0.2)]">
                    {step.number}
                  </span>
                  <h3 className="text-[25px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[30px]">{step.title}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-[#dddddd] md:text-base">{step.text}</p>
                </div>
                <motion.span
                  aria-hidden
                  className="absolute right-5 top-5 h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.8)]"
                  animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.25, 0.8] }}
                  transition={{ duration: 2.8, delay: index * 0.45, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
