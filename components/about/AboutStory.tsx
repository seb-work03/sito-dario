"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BarChart3, GraduationCap, MessageSquareText, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedLabel } from "@/components/reference-clone/AnimatedLabel";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { Reveal } from "@/components/reference-clone/Reveal";

const timeline = [
  {
    year: "1997",
    title: "La tecnologia diventa un mestiere",
    text: "Dopo il diploma tecnico commerciale all’I.T.C. R. Valturio di Rimini, supero le selezioni per un corso di specializzazione in Analista programmatore finanziato dalla Comunità Europea. Lì capisco che tecnologia e impresa non sono due mondi separati: il valore nasce quando il codice risolve un problema commerciale concreto.",
  },
  {
    year: "Anni 2000",
    title: "Dentro l’e-commerce, fin dall’inizio",
    text: "Entro in alcune realtà e-commerce che stanno crescendo insieme al territorio. Vivo in prima persona piattaforme, cataloghi, customer care, marketing e organizzazione interna: non soltanto ciò che il cliente vede, ma tutto quello che deve funzionare dietro una vendita online. Intanto iniziano le prime collaborazioni con gli enti di formazione.",
  },
  {
    year: "2015",
    title: "Nasce DT E-commerce Consulting",
    text: "Apro DT E-commerce Consulting per dare una forma indipendente all’esperienza maturata. È un passaggio importante, non il centro del racconto: mi permette di seguire progetti differenti, confrontarmi direttamente con gli imprenditori e trasformare problemi ricorrenti in un metodo di lavoro più chiaro e trasferibile.",
  },
  {
    year: "Oggi",
    title: "Consulenza, formazione e divulgazione",
    text: "Continuo a lavorare accanto ad aziende e imprenditori e collaboro con un numero crescente di enti formativi. Dopo più di 150 corsi, il mio obiettivo resta lo stesso: portare in aula ciò che succede davvero nei progetti e-commerce e dare alle persone strumenti per leggere i dati, fare domande migliori e decidere con maggiore autonomia.",
  },
];

const principles = [
  {
    icon: BarChart3,
    number: "01",
    title: "Esperienza prima della teoria",
    text: "Ogni contenuto nasce da progetti reali: numeri, problemi, decisioni ed errori compresi.",
    bullets: ["Casi reali", "Esempi operativi", "Errori da riconoscere"],
  },
  {
    icon: GraduationCap,
    number: "02",
    title: "Capire prima di applicare",
    text: "Non insegno ricette universali. Costruisco le basi per scegliere strumenti e strategie con autonomia.",
    bullets: ["Niente formule magiche", "Metodo prima degli strumenti", "Decisioni motivate"],
  },
  {
    icon: MessageSquareText,
    number: "03",
    title: "Confronto, non lezione frontale",
    text: "Le domande e i casi di chi partecipa entrano nel percorso e diventano parte del lavoro in aula.",
    bullets: ["Dialogo continuo", "Contenuti sul contesto", "Competenze che restano"],
  },
];

export function AboutStory({ videoUrl }: { videoUrl?: string | null }) {
  return (
    <>
      <Hero />
      <Story />
      <PodcastLoop videoUrl={videoUrl} />
      <Numbers />
      <TeachingApproach />
      <PhotoSequence />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 px-5 py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="max-w-3xl">
          <div className="mb-6">
            <AnimatedLabel>CHI SONO</AnimatedLabel>
          </div>
          <AnimatedHeadline
            as="h1"
            delay={0.08}
            className="text-[44px] font-medium leading-[0.98] tracking-[-0.045em] text-[#EDF2F7] md:text-[72px] lg:text-[82px]"
          >
            <>
              Prima di insegnare l&apos;e-commerce, l&apos;ho vissuto.
            </>
          </AnimatedHeadline>
          <AnimatedText
            delay={0.24}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[#dddddd] md:text-xl"
          >
            Sono Dario Tana. Da oltre vent&apos;anni lavoro nel commercio elettronico e trasformo l&apos;esperienza sul campo in formazione concreta per imprenditori e aziende.
          </AnimatedText>
        </div>

        <Reveal y={34} delay={0.18}>
          <PhotoPlaceholder
            label="Ritratto di Dario"
            className="mx-auto aspect-[4/5] w-full max-w-[430px]"
            index="01"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start 72%", "end 38%"],
  });
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section className="border-t border-[#00e5ff]/25 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <AnimatedLabel>IL PERCORSO</AnimatedLabel>
          <AnimatedHeadline className="mt-5 text-[34px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[52px]">
            Dal codice all&apos;aula, passando per imprese vere.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Sono cresciuto professionalmente insieme all&apos;e-commerce italiano. Prima dentro i progetti, poi accanto agli imprenditori e infine in aula, dove l&apos;esperienza diventa un metodo condiviso.
          </AnimatedText>
        </div>

        <div ref={roadmapRef} className="relative">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-full md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 2 C 50 11, 42 13, 43 25 S 58 37, 56 49 S 40 61, 44 73 S 56 86, 50 98"
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M 50 2 C 50 11, 42 13, 43 25 S 58 37, 56 49 S 40 61, 44 73 S 56 86, 50 98"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="2.25"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength: pathProgress,
                filter: "drop-shadow(0 0 5px rgba(0,229,255,0.65))",
              }}
            />
          </svg>

          <div aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:hidden" />
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-0 w-px origin-top bg-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.65)] md:hidden"
            style={{ height: "100%", scaleY: pathProgress }}
          />

          <ol className="relative flex flex-col gap-10 md:gap-20">
            {timeline.map((item, index) => (
              <RoadmapItem
                key={item.year}
                item={item}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function RoadmapItem({
  item,
  index,
  progress,
}: {
  item: (typeof timeline)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * 0.23;
  const opacity = useTransform(progress, [start, start + 0.12], [0.2, 1]);
  const y = useTransform(progress, [start, start + 0.12], [34, 0]);
  const dotScale = useTransform(progress, [start, start + 0.08], [0.45, 1]);
  const positions = ["50%", "43%", "56%", "50%"];
  const alignLeft = index % 2 === 0;

  return (
    <motion.li style={{ opacity, y }} className="relative min-h-[250px] pl-12 md:min-h-[285px] md:pl-0">
      <motion.span
        aria-hidden
        style={{ scale: dotScale, left: positions[index] }}
        className="absolute top-8 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-[#0D1218] bg-[#00e5ff] shadow-[0_0_22px_rgba(0,229,255,0.9)] md:block"
      />
      <motion.span
        aria-hidden
        style={{ scale: dotScale }}
        className="absolute left-[12px] top-8 z-10 h-4 w-4 rounded-full border-[3px] border-[#0D1218] bg-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.8)] md:hidden"
      />

      <article
        className={`rounded-2xl border border-[#253444] bg-[#17222F] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e5ff]/40 md:w-[42%] md:p-9 ${
          alignLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#00e5ff]">
            {item.year}
          </span>
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#4F6577]">
            0{index + 1}
          </span>
        </div>
        <h3 className="mt-6 text-2xl font-medium leading-[1.12] tracking-tight text-[#EDF2F7] md:text-[30px]">
          {item.title}
        </h3>
        <p className="mt-5 text-[15px] leading-relaxed text-[#dddddd] md:text-base">
          {item.text}
        </p>
      </article>
    </motion.li>
  );
}

function PodcastLoop({ videoUrl }: { videoUrl?: string | null }) {
  return (
    <section className="px-5 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal y={34} className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#17222F]">
          <div className="relative aspect-[16/8] min-h-[360px] md:min-h-0">
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Dario Tana durante una conversazione in podcast"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 72% 35%, rgba(0,229,255,0.22), transparent 24%), linear-gradient(135deg, #17222F 0%, #0D1218 70%)",
                }}
              >
                <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(237,242,247,0.25)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="absolute inset-x-[8%] bottom-[18%] flex h-20 items-end justify-center gap-1.5 opacity-60" aria-hidden>
                  {[28, 52, 38, 68, 44, 76, 48, 62, 34, 56, 40, 72, 46, 60, 32].map((height, index) => (
                    <motion.span
                      key={index}
                      className="w-1.5 rounded-full bg-[#00e5ff]"
                      style={{ height }}
                      animate={{ scaleY: [0.45, 1, 0.6, 0.9, 0.45] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.06, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1218]/90 via-transparent to-[#0D1218]/15" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#77C0CF]">
                  Dietro le idee
                </p>
                <p className="mt-2 max-w-xl text-2xl font-medium leading-tight text-[#EDF2F7] md:text-[38px]">
                  Il confronto è parte del lavoro.
                </p>
              </div>
              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-[#0D1218]/70 px-4 py-2 text-xs text-[#C1CEDF] backdrop-blur-md sm:inline-flex">
                <VolumeX size={14} className="text-[#00e5ff]" />
                Video senza audio
              </span>
            </div>

            {!videoUrl && (
              <span className="absolute right-5 top-5 rounded-full border border-[#00e5ff]/30 bg-[#0D1218]/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#77C0CF] backdrop-blur-md">
                Segnaposto video podcast
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { value: 20, suffix: "+", label: "anni di esperienza" },
    { value: 150, suffix: "+", label: "corsi realizzati" },
    { value: 5, prefix: "€", suffix: "M+", label: "generati dagli e-commerce seguiti" },
  ];

  return (
    <section className="border-y border-[#00e5ff]/20 bg-[#121A24] px-5 py-16 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <AnimatedLabel>L&apos;ESPERIENZA IN NUMERI</AnimatedLabel>
          <AnimatedHeadline className="mt-5 text-[32px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[48px]">
            La pratica lascia tracce misurabili.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#dddddd]">
            Numeri diversi, un unico filo: esperienza applicata e condivisa nel tempo.
          </AnimatedText>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              y={20}
              delay={index * 0.08}
              className="flex flex-col items-center border-white/10 text-center sm:border-l sm:first:border-0"
            >
              <span className="text-[46px] font-medium leading-none tracking-[-0.04em] text-[#00e5ff] md:text-[64px]">
                {stat.prefix}
                <CountUp value={stat.value} />
                {stat.suffix}
              </span>
              <span className="mt-3 text-xs uppercase tracking-[0.13em] text-[#dddddd]">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachingApproach() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <section className="border-t border-[#00e5ff]/25 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <AnimatedLabel>IL MIO MODO DI FORMARE</AnimatedLabel>
          <AnimatedHeadline className="mt-5 text-[34px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[52px]">
            Porto in aula ciò che succede fuori dall&apos;aula.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            La formazione funziona quando rende le persone più autonome. Per questo parto dai problemi reali, costruisco un linguaggio comune e arrivo alle decisioni che contano.
          </AnimatedText>
        </div>

        <div ref={gridRef} className="grid gap-5 md:grid-cols-3 md:gap-6">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, delay: index * 0.18, ease: [0.19, 1, 0.22, 1] }}
                className="group relative flex flex-col gap-5 rounded-2xl border border-[#253444] bg-[#17222F] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e5ff]/40 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00e5ff]/25 bg-[#00e5ff]/8 text-[#00e5ff]">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="text-xs font-medium tracking-[0.15em] text-[#4F6577]">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl font-medium leading-tight tracking-tight text-[#EDF2F7]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#dddddd]">
                  {item.text}
                </p>
                <div className="h-px bg-white/8" />
                <ul className="flex flex-col gap-2.5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm leading-snug text-[#DDE5EF]">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhotoSequence() {
  return (
    <section className="overflow-hidden px-5 pb-20 pt-4 md:pb-32 md:pt-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <AnimatedLabel>DENTRO IL LAVORO</AnimatedLabel>
          <AnimatedHeadline className="mt-5 text-[32px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[50px]">
            Aula, confronto, palco.
          </AnimatedHeadline>
          <AnimatedText delay={0.1} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#dddddd]">
            Tre momenti diversi dello stesso lavoro: rendere comprensibile ciò che nell&apos;e-commerce spesso sembra complicato.
          </AnimatedText>
        </div>

        <div className="grid items-end gap-5 md:grid-cols-[0.9fr_1.2fr_0.8fr] md:gap-6">
          <Reveal y={36}>
            <PhotoPlaceholder label="Dario in aula" index="02" className="aspect-[4/5]" />
          </Reveal>
          <Reveal y={36} delay={0.1}>
            <PhotoPlaceholder label="Durante una lezione" index="03" className="aspect-[4/3]" />
          </Reveal>
          <Reveal y={36} delay={0.2}>
            <PhotoPlaceholder label="Dario sul palco" index="04" className="aspect-[4/5]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhotoPlaceholder({ label, index, className }: { label: string; index: string; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[18px] border border-white/10 bg-[#17222F] ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0,229,255,0.1), transparent 45%), radial-gradient(circle at 70% 25%, rgba(0,229,255,0.13), transparent 28%)",
      }}
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] transition-transform duration-[1400ms] group-hover:scale-105" />
      <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#00e5ff]/25 bg-[#0D1218]/70 text-[11px] font-medium text-[#00e5ff] backdrop-blur-md">
        {index}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1218] via-[#0D1218]/70 to-transparent p-6 pt-20">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#77C0CF]">Segnaposto foto</p>
        <p className="mt-2 text-lg font-medium text-[#EDF2F7]">{label}</p>
      </div>
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => rounded.on("change", (latest) => {
    if (ref.current) ref.current.textContent = latest.toString();
  }), [rounded]);

  return <span ref={ref}>0</span>;
}
