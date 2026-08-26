"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";

const FALLBACK_HERO_IMAGE =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/media/consulente-tVSDOF2MGGwhU8DTQnWS46G17r4vJt.jpg";
const FALLBACK_PORTRAIT_IMAGE =
  "https://aukjtr1jp7weckhs.public.blob.vercel-storage.com/media/dario%20tana%20con%20sfondo-DWIijOtVTabGdnuHQn3QGWEgHZvDi2.jpg";

const diagnosticScenarios = [
  {
    title: "Devi partire senza costruire sulle ipotesi",
    text: "Prima della piattaforma vengono modello economico, catalogo, margini, persone e priorità. Mettere ordine all’inizio evita che tecnologia e budget precedano le decisioni importanti.",
    result: "Ridurre gli errori a monte",
  },
  {
    title: "Le vendite crescono, ma il sistema non regge",
    text: "Più ordini non significano automaticamente più valore. Analizzo dove processi, dati, marketing o organizzazione stanno creando attrito e limitando la scalabilità.",
    result: "Ritrovare controllo",
  },
  {
    title: "Investi, ma non sai più cosa sta funzionando",
    text: "Quando campagne, canali e strumenti si moltiplicano, serve una lettura indipendente che colleghi conversione, costi, marginalità e qualità dell’esperienza.",
    result: "Scegliere con i numeri",
  },
];

const scopeAreas = [
  {
    title: "Strategia e modello e-commerce",
    text: "Obiettivi, posizionamento, proposta di valore, catalogo e sostenibilità economica. Per chiarire dove competere e quali risultati hanno davvero senso.",
    className: "md:col-span-2",
  },
  {
    title: "Piattaforma e user experience",
    text: "Tecnologia, architettura, usabilità e percorso d’acquisto vengono valutati rispetto alle esigenze reali del business, non alle mode del momento.",
    className: "",
  },
  {
    title: "Dati, analytics e CRO",
    text: "Misurazione, funnel, conversioni e comportamenti diventano una base leggibile per capire dove intervenire e con quale priorità.",
    className: "",
  },
  {
    title: "Marketing e advertising",
    text: "Canali, campagne, contenuti e acquisizione vengono collegati a clienti, margini e obiettivi. La visibilità conta solo quando produce valore sostenibile.",
    className: "md:col-span-2",
  },
  {
    title: "Processi, logistica e marginalità",
    text: "Ordini, magazzino, customer care, costi e responsabilità interne fanno parte della strategia quanto il sito e le campagne.",
    className: "md:col-span-2",
  },
  {
    title: "Persone e organizzazione",
    text: "Ruoli, competenze e rapporto tra azienda, fornitori e agenzie devono permettere decisioni rapide, verificabili e condivise.",
    className: "",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Conoscerci e definire il perimetro",
    text: "Partiamo da un incontro, online o in presenza, per capire obiettivi, vincoli, persone coinvolte e maturità del progetto. La consulenza inizia dalle domande corrette.",
  },
  {
    number: "02",
    title: "Leggere ciò che esiste davvero",
    text: "Analizzo piattaforma, dati, marketing, processi e organizzazione. Non cerco un colpevole o uno strumento da sostituire: cerco le relazioni che stanno rallentando il progetto.",
  },
  {
    number: "03",
    title: "Trasformare l’analisi in priorità",
    text: "Le evidenze diventano una sequenza di decisioni: cosa fare subito, cosa misurare, cosa rimandare e dove evitare investimenti che non produrrebbero un vantaggio reale.",
  },
  {
    number: "04",
    title: "Affiancare l’esecuzione e misurare",
    text: "Quando serve, resto accanto a proprietà, team e partner durante l’implementazione. I risultati vengono letti nel tempo e il piano evolve insieme al progetto.",
  },
];

const faqItems = [
  {
    question: "Cosa fa, concretamente, un consulente e-commerce?",
    answer:
      "Un consulente e-commerce aiuta l’azienda a leggere il progetto nel suo insieme. Collega strategia, piattaforma, marketing, dati, processi e persone per individuare priorità, rischi e opportunità. Il suo compito non è aggiungere complessità, ma rendere più chiare le decisioni.",
  },
  {
    question: "La consulenza serve anche prima di aprire un e-commerce?",
    answer:
      "Sì, ed è spesso il momento in cui produce più valore. Prima di scegliere piattaforma e fornitori è utile verificare modello economico, catalogo, margini, organizzazione, logistica e reale sostenibilità dell’investimento.",
  },
  {
    question: "Segui anche e-commerce già avviati?",
    answer:
      "Sì. Posso intervenire su progetti che devono crescere, recuperare redditività, migliorare la conversione, riorganizzare marketing e processi oppure affrontare una migrazione tecnologica senza perdere il controllo del business.",
  },
  {
    question: "Lavori solo con aziende di Rimini?",
    answer:
      "No. Ho base a Rimini, ma seguo aziende, imprenditori ed e-commerce manager in tutta Italia. La consulenza può svolgersi online e, quando il progetto lo richiede, anche in presenza presso l’azienda.",
  },
  {
    question: "Puoi collaborare con il nostro team o con l’agenzia che ci segue?",
    answer:
      "Sì. La consulenza è indipendente e può affiancare proprietà, reparto marketing, e-commerce manager, sviluppatori e agenzie. L’obiettivo è rendere priorità e responsabilità più leggibili, non sostituire chi sta già lavorando bene.",
  },
  {
    question: "La consulenza ha una durata prestabilita?",
    answer:
      "No. Perimetro e durata dipendono dalla situazione: può trattarsi di un audit focalizzato, di un percorso strategico o di un affiancamento continuativo. La forma viene definita dopo aver compreso il problema, non prima.",
  },
];

export function ConsultingPage({
  heroImageUrl,
  portraitImageUrl,
}: {
  heroImageUrl?: string | null;
  portraitImageUrl?: string | null;
}) {
  return (
    <>
      <ConsultingHero imageUrl={heroImageUrl} />
      <DiagnosticSection />
      <ScopeSection />
      <ConsultingProcess />
      <PartnershipSection imageUrl={portraitImageUrl} />
      <OutcomesSection />
      <ConsultingFaq />
    </>
  );
}

function ConsultingHero({ imageUrl }: { imageUrl?: string | null }) {
  const image = imageUrl ?? FALLBACK_HERO_IMAGE;

  return (
    <section className="relative overflow-hidden border-b border-[#00e5ff]/25 px-5 py-16 md:py-24 lg:min-h-[calc(100vh-6rem)] lg:py-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 78% at 28% 38%, black, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 88% at -5% 42%, rgba(0,229,255,0.2), rgba(0,229,255,0.07) 42%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:min-h-[650px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="max-w-[760px] text-center lg:text-left">
          <AnimatedHeadline
            as="h1"
            delay={0.06}
            className="text-[42px] font-medium leading-[0.99] tracking-[-0.048em] text-[#EDF2F7] sm:text-[56px] md:text-[70px] lg:text-[76px]"
          >
            Consulenza e-commerce per prendere decisioni migliori.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.2}
            className="mx-auto mt-7 max-w-[680px] text-base leading-relaxed text-[#dddddd] md:text-xl lg:mx-0"
          >
            Prima di spendere di più, serve capire dove intervenire. Affianco aziende, imprenditori e team che vogliono avviare, correggere o far crescere un e-commerce. Da Rimini lavoro su progetti in tutta Italia, mettendo in relazione strategia, tecnologia, marketing, dati e organizzazione.
          </AnimatedText>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.19, 1, 0.22, 1] }}
            className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start"
          >
            {["Nuovi progetti", "E-commerce avviati", "Audit e affiancamento"].map((item) => (
              <span key={item} className="rounded-full bg-[#00e5ff] px-4 py-2 text-xs font-semibold text-[#0D1218] shadow-[0_8px_28px_rgba(0,229,255,0.16)]">
                {item}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <Link href="#metodo-consulenza" className="group inline-flex items-center gap-2 text-sm font-medium text-[#00e5ff] transition-colors hover:text-[#7af2ff]">
              Vedi come lavoro
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <ConsultingPortrait imageUrl={image} />
      </div>
    </section>
  );
}

function ConsultingPortrait({ imageUrl }: { imageUrl: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.18, ease: [0.19, 1, 0.22, 1] }}
      className="relative mx-auto w-full max-w-[500px] p-[1px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[30px]">
        <motion.div
          aria-hidden
          className="absolute -inset-[65%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#00e5ff_302deg,transparent_342deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[29px] bg-[#17222F]">
        <Image
          src={imageUrl}
          alt="Analisi di dati e performance per una consulenza e-commerce"
          fill
          priority
          loading="eager"
          unoptimized={imageUrl.startsWith("http")}
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218] via-[#0D1218]/18 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[#00e5ff]/28 bg-[#0D1218]/90 p-5 backdrop-blur-md md:inset-x-7 md:bottom-7 md:p-6">
          <p className="text-xl font-medium leading-tight text-[#EDF2F7] md:text-2xl">
            Tecnologia, marketing e numeri devono raccontare la stessa direzione.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Strategia", "Dati", "Processi"].map((item) => (
              <span key={item} className="rounded-full bg-[#00e5ff] px-3 py-1.5 text-[11px] font-semibold text-[#0D1218]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DiagnosticSection() {
  return (
    <section className="border-b border-[#00e5ff]/18 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <AnimatedHeadline className="text-[36px] font-medium leading-[1.03] tracking-tight text-[#EDF2F7] md:text-[58px]">
            La consulenza serve quando una decisione pesa più di uno strumento.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Un e-commerce non è soltanto un sito. È un sistema fatto di offerta, tecnologia, traffico, dati, processi e persone. Se una parte si muove senza le altre, anche una buona idea può diventare costosa.
          </AnimatedText>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#00e5ff]/26 bg-[#17222F] md:rounded-[36px]">
          {diagnosticScenarios.map((scenario, index) => (
            <motion.article
              key={scenario.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.78, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="group relative grid gap-5 border-b border-[#00e5ff]/16 px-6 py-8 last:border-0 md:grid-cols-[0.9fr_1.25fr_auto] md:items-center md:gap-10 md:px-10 md:py-10"
            >
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#00e5ff] transition-all duration-700 group-hover:w-full" />
              <h3 className="text-[24px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[29px]">{scenario.title}</h3>
              <p className="text-sm leading-relaxed text-[#dddddd] md:text-base">{scenario.text}</p>
              <span className="w-fit rounded-full bg-[#00e5ff] px-4 py-2 text-xs font-semibold text-[#0D1218] shadow-[0_8px_26px_rgba(0,229,255,0.13)]">
                {scenario.result}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeSection() {
  return (
    <section className="border-b border-[#00e5ff]/18 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 grid gap-7 md:mb-20 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-20">
          <AnimatedHeadline className="text-[36px] font-medium leading-[1.03] tracking-tight text-[#EDF2F7] md:text-[58px]">
            Guardo il progetto come un sistema, non come una somma di canali.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="max-w-xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Il valore della consulenza e-commerce sta nei collegamenti. Una scelta tecnica cambia il marketing; una promessa commerciale cambia logistica e customer care; un dato letto male cambia il budget.
          </AnimatedText>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {scopeAreas.map((area, index) => (
            <ScopeCard key={area.title} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeCard({ area, index }: { area: (typeof scopeAreas)[number]; index: number }) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(0,229,255,0.18), transparent 66%)`;

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.article
      onMouseMove={handlePointerMove}
      onMouseLeave={() => {
        mouseX.set(-300);
        mouseY.set(-300);
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      className={`group relative isolate min-h-[250px] overflow-hidden rounded-[24px] border border-[#00e5ff]/24 bg-[#17222F] p-7 transition-colors duration-500 hover:border-[#00e5ff]/55 md:min-h-[290px] md:p-9 ${area.className}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-0" style={{ background: glow }} />
      <div className="absolute right-7 top-7 h-2 w-14 overflow-hidden rounded-full bg-[#00e5ff]/16">
        <motion.span
          className="block h-full w-1/2 rounded-full bg-[#00e5ff]"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3.8, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end">
        <h3 className="max-w-xl text-[27px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[34px]">{area.title}</h3>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#dddddd] md:text-base">{area.text}</p>
      </div>
    </motion.article>
  );
}

function ConsultingProcess() {
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 72%", "end 72%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="metodo-consulenza" ref={processRef} className="relative overflow-x-clip bg-[#00e5ff] px-5 py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,18,24,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(13,18,24,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -right-36 top-16 h-[440px] w-[440px] rounded-full border border-[#0D1218]/12" />
      <div className="pointer-events-none absolute -right-20 top-32 h-[310px] w-[310px] rounded-full border border-[#0D1218]/12" />

      <div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <AnimatedHeadline className="text-[38px] font-medium leading-[1.02] tracking-tight text-[#0D1218] md:text-[60px]">
            La consulenza prende forma dopo aver capito il problema.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mt-6 max-w-lg text-base leading-relaxed text-[#0D1218]/78 md:text-lg">
            Non parto da un pacchetto predefinito. Costruisco il percorso necessario per passare da una situazione confusa a un ordine di priorità condiviso e verificabile.
          </AnimatedText>
        </div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute bottom-0 left-0 top-0 w-[2px] rounded-full bg-[#0D1218]/18" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-[3px] origin-top rounded-full bg-[#0D1218]"
            style={{ scaleY: progress }}
          />
          <div className="flex flex-col gap-5 md:gap-7">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, x: 42 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.36 }}
                transition={{ duration: 0.76, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className="group relative overflow-hidden rounded-[24px] bg-[#0D1218] p-7 shadow-[0_20px_55px_rgba(13,18,24,0.16)] md:p-9"
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[35%] -skew-x-12 bg-gradient-to-r from-transparent via-[#00e5ff]/10 to-transparent blur-xl"
                  animate={{ x: ["-160%", "400%"] }}
                  transition={{ duration: 7.5, delay: index * 1.1, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10">
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-[#00e5ff] px-3 text-xs font-bold text-[#0D1218]">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-[27px] font-medium leading-tight tracking-tight text-[#EDF2F7] md:text-[34px]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#dddddd] md:text-base">{step.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnershipSection({ imageUrl }: { imageUrl?: string | null }) {
  const image = imageUrl ?? FALLBACK_PORTRAIT_IMAGE;

  return (
    <section className="border-b border-[#00e5ff]/20 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
          className="relative p-[1px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <motion.div
              aria-hidden
              className="absolute -inset-[70%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_248deg,#00e5ff_300deg,transparent_344deg)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="relative aspect-[5/6] overflow-hidden rounded-[27px] bg-[#17222F]">
            <Image
              src={image}
              alt="Dario Tana durante un’attività professionale"
              fill
              unoptimized={image.startsWith("http")}
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 520px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1218]/80 via-transparent to-transparent" />
          </div>
        </motion.div>

        <div>
          <AnimatedHeadline className="text-[38px] font-medium leading-[1.03] tracking-tight text-[#EDF2F7] md:text-[58px]">
            Non entro per sostituire il team. Entro per renderlo più lucido.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mt-7 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Posso lavorare accanto alla proprietà, a un e-commerce manager, al reparto marketing, agli sviluppatori o all’agenzia che segue il progetto. Porto una lettura indipendente, collego competenze diverse e aiuto tutti a discutere sulla stessa base.
          </AnimatedText>
          <AnimatedText delay={0.18} className="mt-5 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            L’obiettivo non è rendere l’azienda dipendente dalla consulenza. È trasferire un metodo che permetta alle persone di leggere meglio i dati, porre domande più utili e governare con maggiore autonomia il proprio commercio elettronico.
          </AnimatedText>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-9 border-l-2 border-[#00e5ff] pl-6 text-xl font-medium leading-relaxed text-[#EDF2F7] md:text-2xl"
          >
            Le scelte migliori arrivano quando numeri, esperienza e confronto smettono di viaggiare separati.
          </motion.blockquote>
          <Link href="/chi-sono" className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-[#00e5ff] transition-colors hover:text-[#7af2ff]">
            Conosci il mio percorso
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  const stats = [
    { value: "20+", label: "anni nell’e-commerce" },
    { value: "30+", label: "progetti seguiti" },
    { value: "€5M+", label: "generati dagli e-commerce affiancati" },
  ];

  return (
    <section className="bg-[#0D1218] px-4 py-20 md:px-5 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
        className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[30px] bg-[#00e5ff] px-6 py-16 md:rounded-[40px] md:px-12 md:py-20"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "radial-gradient(rgba(13,18,24,0.22) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#0D1218]/16"
          animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <AnimatedHeadline className="text-[36px] font-medium leading-[1.03] tracking-tight text-[#0D1218] md:text-[58px]">
            Il risultato non è un report da archiviare. È una direzione che resta.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#0D1218]/76 md:text-lg">
            Priorità più chiare, numeri leggibili, responsabilità condivise e un piano che l’azienda sa continuare a governare. L’esperienza conta quando diventa utilizzabile.
          </AnimatedText>
        </div>

        <div className="relative mt-12 grid gap-px overflow-hidden rounded-[22px] bg-[#0D1218]/18 md:mt-16 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18 + index * 0.1 }}
              className="bg-[#00e5ff] px-6 py-9 text-center"
            >
              <span className="block text-[52px] font-medium leading-none tracking-[-0.05em] text-[#0D1218] md:text-[66px]">{stat.value}</span>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.11em] text-[#0D1218]/72">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ConsultingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-[#00e5ff]/22 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <AnimatedHeadline className="text-[38px] font-medium leading-[1.03] tracking-tight text-[#EDF2F7] md:text-[56px]">
            Domande prima di iniziare.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mt-6 max-w-md text-base leading-relaxed text-[#dddddd] md:text-lg">
            Ogni progetto ha un punto di partenza diverso. Queste sono le domande che aiutano più spesso a capire se e come una consulenza e-commerce può essere utile.
          </AnimatedText>
        </div>

        <div className="overflow-hidden rounded-[26px] border border-[#00e5ff]/24 bg-[#17222F]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-[#00e5ff]/16 last:border-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-7"
                >
                  <span className="text-lg font-medium leading-snug text-[#EDF2F7] md:text-xl">{item.question}</span>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-[#00e5ff] text-[#0D1218]" : "border border-[#00e5ff]/45 text-[#00e5ff]"}`}>
                    <ChevronDown size={18} className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-7 pr-16 text-sm leading-relaxed text-[#dddddd] md:px-8 md:pb-8 md:pr-24 md:text-base">{item.answer}</p>
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
