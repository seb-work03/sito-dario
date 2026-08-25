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
import { BarChart3, GraduationCap, MessageSquareText } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
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
    title: "Esperienza prima della teoria",
    text: "Ogni contenuto nasce da progetti reali: numeri, problemi, decisioni ed errori compresi.",
    bullets: ["Casi reali", "Esempi operativi", "Errori da riconoscere"],
  },
  {
    icon: GraduationCap,
    title: "Capire prima di applicare",
    text: "Non insegno ricette universali. Costruisco le basi per scegliere strumenti e strategie con autonomia.",
    bullets: ["Niente formule magiche", "Metodo prima degli strumenti", "Decisioni motivate"],
  },
  {
    icon: MessageSquareText,
    title: "Confronto, non lezione frontale",
    text: "Le domande e i casi di chi partecipa entrano nel percorso e diventano parte del lavoro in aula.",
    bullets: ["Dialogo continuo", "Contenuti sul contesto", "Competenze che restano"],
  },
];

export function AboutStory() {
  return (
    <>
      <Hero />
      <Story />
      <PodcastLoop />
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
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [thresholds, setThresholds] = useState<number[]>([]);
  const { scrollYProgress } = useScroll({
    target: progressTrackRef,
    offset: ["start 72%", "end 72%"],
  });
  const lineProgress = useTransform(scrollYProgress, (value) => {
    return Math.max(0, Math.min(1, value));
  });

  const fallbackThresholds = [0.035, 0.305, 0.575, 0.845];
  const nodeThresholds = timeline.map(
    (_, index) => thresholds[index] ?? fallbackThresholds[index],
  );
  const firstNode = nodeThresholds[0];
  const lastNode = nodeThresholds[nodeThresholds.length - 1];
  const lineSpan = Math.max(0.01, lastNode - firstNode);
  const nodeY = nodeThresholds.map((threshold) => threshold * 100);
  const midpoint = (start: number, end: number) => start + (end - start) / 2;
  const roadmapPath = `M 50 ${nodeY[0]} C 50 ${midpoint(nodeY[0], nodeY[1])}, 43 ${midpoint(nodeY[0], nodeY[1])}, 43 ${nodeY[1]} S 56 ${midpoint(nodeY[1], nodeY[2])}, 56 ${nodeY[2]} S 50 ${midpoint(nodeY[2], nodeY[3])}, 50 ${nodeY[3]}`;
  const fillHeight = useTransform(lineProgress, [0, 1], [0, lineSpan * 100]);

  useLayoutEffect(() => {
    function measureNodes() {
      const roadmap = roadmapRef.current;
      if (!roadmap) return;
      const roadmapRect = roadmap.getBoundingClientRect();
      const next = itemRefs.current.map((item) => {
        const node = Array.from(
          item?.querySelectorAll<HTMLElement>("[data-roadmap-node]") ?? [],
        ).find((candidate) => {
          const rect = candidate.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        if (!node) return 1;
        const nodeRect = node.getBoundingClientRect();
        const nodeCenter = nodeRect.top + nodeRect.height / 2 - roadmapRect.top;
        return Math.max(0, Math.min(1, nodeCenter / roadmapRect.height));
      });
      setThresholds(next);
    }

    measureNodes();
    window.addEventListener("resize", measureNodes);
    return () => window.removeEventListener("resize", measureNodes);
  }, []);

  return (
    <section className="border-t border-[#00e5ff]/25 bg-[#0D1218] px-5 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <AnimatedHeadline className="text-[34px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[52px]">
            Dal codice all&apos;aula, passando per imprese vere.
          </AnimatedHeadline>
          <AnimatedText delay={0.12} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#dddddd] md:text-lg">
            Sono cresciuto professionalmente insieme all&apos;e-commerce italiano. Prima dentro i progetti, poi accanto agli imprenditori e infine in aula, dove l&apos;esperienza diventa un metodo condiviso.
          </AnimatedText>
        </div>

        <div ref={roadmapRef} className="relative">
          <div
            ref={progressTrackRef}
            aria-hidden
            className="pointer-events-none absolute left-1/2 w-px"
            style={{ top: `${firstNode * 100}%`, height: `${lineSpan * 100}%` }}
          />

          <svg
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-full md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="roadmap-scroll-fill" clipPathUnits="userSpaceOnUse">
                <motion.rect
                  x="0"
                  y={firstNode * 100}
                  width="100"
                  height={fillHeight}
                />
              </clipPath>
            </defs>
            <path
              d={roadmapPath}
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={roadmapPath}
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              clipPath="url(#roadmap-scroll-fill)"
            />
          </svg>

          <div
            aria-hidden
            className="absolute left-[39px] w-px bg-white/10 md:hidden"
            style={{ top: `${firstNode * 100}%`, height: `${lineSpan * 100}%` }}
          />
          <motion.div
            aria-hidden
            className="absolute left-[39px] w-px origin-top bg-[#00e5ff] md:hidden"
            style={{
              top: `${firstNode * 100}%`,
              height: `${lineSpan * 100}%`,
              scaleY: lineProgress,
            }}
          />

          <ol className="relative flex flex-col gap-10 md:gap-20">
            {timeline.map((item, index) => (
              <RoadmapItem
                key={item.year}
                item={item}
                index={index}
                progress={lineProgress}
                threshold={Math.max(
                  0.001,
                  (nodeThresholds[index] - firstNode) / lineSpan,
                )}
                liRef={(element) => {
                  itemRefs.current[index] = element;
                }}
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
  threshold,
  liRef,
}: {
  item: (typeof timeline)[number];
  index: number;
  progress: MotionValue<number>;
  threshold: number;
  liRef: (element: HTMLLIElement | null) => void;
}) {
  const activationStart = Math.max(0, threshold - 0.055);
  const opacity = useTransform(progress, [activationStart, threshold], [0.3, 1]);
  const y = useTransform(progress, [activationStart, threshold], [28, 0]);
  const dotScale = useTransform(progress, [activationStart, threshold], [0.72, 1]);
  const dotBackground = useTransform(
    progress,
    [activationStart, threshold],
    ["#0D1218", "#00e5ff"],
  );
  const dotColor = useTransform(
    progress,
    [activationStart, threshold],
    ["#00e5ff", "#0D1218"],
  );
  const dotShadow = useTransform(
    progress,
    [activationStart, threshold],
    ["0 0 0 rgba(0,229,255,0)", "0 0 28px rgba(0,229,255,0.75)"],
  );
  const positions = ["50%", "43%", "56%", "50%"];
  const alignLeft = index % 2 === 0;

  return (
    <motion.li
      ref={liRef}
      style={{ opacity, y }}
      className="relative min-h-[250px] pl-24 md:min-h-[285px] md:pl-0"
    >
      <motion.span
        data-roadmap-node
        style={{
          scale: dotScale,
          left: positions[index],
          backgroundColor: dotBackground,
          color: dotColor,
          boxShadow: dotShadow,
        }}
        className="absolute top-1 z-10 hidden h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#00e5ff] px-2 text-center text-xs font-semibold leading-tight md:flex"
      >
        {item.year}
      </motion.span>
      <motion.span
        data-roadmap-node
        style={{
          scale: dotScale,
          backgroundColor: dotBackground,
          color: dotColor,
          boxShadow: dotShadow,
        }}
        className="absolute left-0 top-1 z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00e5ff] px-2 text-center text-[11px] font-semibold leading-tight md:hidden"
      >
        {item.year}
      </motion.span>

      <article
        className={`rounded-2xl border border-[#253444] bg-[#17222F] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e5ff]/40 md:w-[42%] md:p-9 ${
          alignLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <h3 className="text-2xl font-medium leading-[1.12] tracking-tight text-[#EDF2F7] md:text-[30px]">
          {item.title}
        </h3>
        <p className="mt-5 text-[15px] leading-relaxed text-[#dddddd] md:text-base">
          {item.text}
        </p>
      </article>
    </motion.li>
  );
}

function PodcastLoop() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoId = "oy-B6GI02kk";
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&playsinline=1&start=40&end=80&rel=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&enablejsapi=1`;

  useEffect(() => {
    type Player = {
      destroy: () => void;
      getCurrentTime: () => number;
      mute: () => void;
      playVideo: () => void;
      seekTo: (seconds: number, allowSeekAhead: boolean) => void;
      setOption?: (module: string, option: string, value: unknown) => void;
      unloadModule?: (module: string) => void;
    };
    type PlayerEvent = { target: Player };
    type PlayerStateEvent = PlayerEvent & { data: number };
    type YouTubeWindow = Window & {
      YT?: {
        Player: new (
          element: HTMLIFrameElement,
          options: {
            events: {
              onReady: (event: PlayerEvent) => void;
              onStateChange: (event: PlayerStateEvent) => void;
            };
          },
        ) => Player;
      };
      onYouTubeIframeAPIReady?: () => void;
    };

    const youtubeWindow = window as YouTubeWindow;
    let player: Player | undefined;
    let timeCheck: ReturnType<typeof setInterval> | undefined;
    let revealVideo: ReturnType<typeof setTimeout> | undefined;
    const captionChecks: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const restartSegment = (target: Player) => {
      target.seekTo(40, true);
      target.playVideo();
    };

    const hideCaptions = (target: Player) => {
      target.setOption?.("captions", "track", {});
      target.unloadModule?.("captions");
    };

    const initialisePlayer = () => {
      if (cancelled || player || !iframeRef.current || !youtubeWindow.YT?.Player) return;

      player = new youtubeWindow.YT.Player(iframeRef.current, {
        events: {
          onReady: ({ target }) => {
            target.mute();
            hideCaptions(target);
            captionChecks.push(
              setTimeout(() => hideCaptions(target), 500),
              setTimeout(() => hideCaptions(target), 1500),
            );
            restartSegment(target);
            revealVideo = setTimeout(() => setVideoVisible(true), 2400);
            timeCheck = setInterval(() => {
              if (target.getCurrentTime() >= 79.8) restartSegment(target);
            }, 200);
          },
          onStateChange: ({ data, target }) => {
            if (data === 0) restartSegment(target);
          },
        },
      });
    };

    if (youtubeWindow.YT?.Player) {
      initialisePlayer();
    } else {
      const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
      youtubeWindow.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        initialisePlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (timeCheck) clearInterval(timeCheck);
      if (revealVideo) clearTimeout(revealVideo);
      captionChecks.forEach(clearTimeout);
      player?.destroy();
    };
  }, []);

  return (
    <section className="px-5 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal y={34} className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#17222F]">
          <div className="relative aspect-[16/8] min-h-[360px] md:min-h-0">
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[115%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-opacity duration-700 md:h-auto md:w-[145%] ${
                videoVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title="Dario Tana durante una conversazione in podcast"
                tabIndex={-1}
                aria-hidden="true"
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
                className="pointer-events-none h-full w-full"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(13,18,24,0.88)_0%,rgba(13,18,24,0.68)_30%,rgba(13,18,24,0.22)_62%,rgba(13,18,24,0.03)_100%)]" />
            <div className="pointer-events-none absolute inset-0 flex items-center px-7 py-10 md:px-14 lg:px-20">
              <div className="max-w-[590px]">
                <h2 className="text-[34px] font-medium leading-[1.02] tracking-[-0.035em] text-[#EDF2F7] md:text-[52px]">
                  In aula porto quello che succede davvero.
                </h2>
                <p className="mt-5 max-w-[520px] text-base leading-relaxed text-[#dddddd] md:text-lg">
                  Una lezione non è una parentesi teorica: è uno spazio in cui casi reali, errori e decisioni diventano strumenti utili per chi lavora ogni giorno nell&apos;e-commerce.
                </p>
              </div>
            </div>
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
    <section className="border-t border-[#00e5ff]/25 bg-[#0D1218] px-4 py-16 md:px-5 md:py-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="overflow-hidden rounded-[28px] bg-[#00e5ff] px-6 py-12 md:rounded-[36px] md:px-14 md:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <AnimatedHeadline className="text-[32px] font-medium leading-[1.05] tracking-tight text-[#0D1218] md:text-[52px]">
              La pratica lascia tracce misurabili.
            </AnimatedHeadline>
            <AnimatedText delay={0.1} className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#0D1218]/70 md:text-base">
              Numeri diversi, un unico filo: esperienza applicata e condivisa nel tempo.
            </AnimatedText>
          </div>

          <div className="grid rounded-2xl border border-white/8 bg-[#0D1218] px-7 py-6 sm:grid-cols-3 sm:px-5 md:px-10 md:py-10">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                y={20}
                delay={index * 0.08}
                className="flex flex-col items-center border-t border-white/10 py-7 text-center first:border-0 first:pt-2 last:pb-2 sm:border-l sm:border-t-0 sm:py-2 sm:first:border-l-0"
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
          <AnimatedHeadline className="text-[34px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[52px]">
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
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, delay: index * 0.18, ease: [0.19, 1, 0.22, 1] }}
                className="group relative flex flex-col gap-3 rounded-2xl border border-[#253444] bg-[#17222F] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e5ff]/40 md:p-8"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00e5ff]/25 bg-[#00e5ff]/8 text-[#00e5ff] transition-transform duration-500 group-hover:scale-105">
                  <Icon size={30} strokeWidth={1.5} />
                </span>
                <h3 className="mt-2 text-center text-2xl font-medium leading-tight tracking-tight text-[#EDF2F7]">
                  {item.title}
                </h3>
                <p className="text-center text-sm leading-relaxed text-[#dddddd]">
                  {item.text}
                </p>
                <div className="my-1 h-px bg-white/8" />
                <ul className="flex flex-col gap-2">
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
          <AnimatedHeadline className="text-[32px] font-medium leading-[1.05] tracking-tight text-[#EDF2F7] md:text-[50px]">
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
        <p className="text-lg font-medium text-[#EDF2F7]">{label}</p>
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
