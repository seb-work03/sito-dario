"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BarChart3, GraduationCap, MessageSquareText } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedHeadline } from "@/components/reference-clone/AnimatedHeadline";
import { AnimatedText } from "@/components/reference-clone/AnimatedText";
import { Reveal } from "@/components/reference-clone/Reveal";

const timeline = [
  {
    year: "1997",
    title: "La tecnologia diventa un mestiere",
    text: "Dopo il diploma tecnico commerciale all’I.T.C. R. Valturio di Rimini, supero le selezioni per un corso di specializzazione in Analista programmatore finanziato dalla Comunità Europea. Lì capisco che tecnologia e impresa non sono due mondi separati: il valore nasce quando il codice risolve un problema commerciale concreto.",
    highlights: ["Analista programmatore", "tecnologia e impresa", "problema commerciale concreto"],
  },
  {
    year: "Anni 2000",
    title: "Dentro l’e-commerce, fin dall’inizio",
    text: "Entro in alcune realtà e-commerce che stanno crescendo insieme al territorio. Vivo in prima persona piattaforme, cataloghi, customer care, marketing e organizzazione interna: non soltanto ciò che il cliente vede, ma tutto quello che deve funzionare dietro una vendita online. Intanto iniziano le prime collaborazioni con gli enti di formazione.",
    highlights: ["piattaforme, cataloghi, customer care, marketing e organizzazione interna", "prime collaborazioni con gli enti di formazione"],
  },
  {
    year: "2015",
    title: "Nasce DT E-commerce Consulting",
    text: "Apro DT E-commerce Consulting per dare una forma indipendente all’esperienza maturata. È un passaggio importante, non il centro del racconto: mi permette di seguire progetti differenti, confrontarmi direttamente con gli imprenditori e trasformare problemi ricorrenti in un metodo di lavoro più chiaro e trasferibile.",
    highlights: ["DT E-commerce Consulting", "confrontarmi direttamente con gli imprenditori", "metodo di lavoro più chiaro e trasferibile"],
  },
  {
    year: "Oggi",
    title: "Consulenza, formazione e divulgazione",
    text: "Continuo a lavorare accanto ad aziende e imprenditori e collaboro con un numero crescente di enti formativi. Dopo più di 150 corsi, il mio obiettivo resta lo stesso: portare in aula ciò che succede davvero nei progetti e-commerce e dare alle persone strumenti per leggere i dati, fare domande migliori e decidere con maggiore autonomia.",
    highlights: ["più di 150 corsi", "ciò che succede davvero nei progetti e-commerce", "decidere con maggiore autonomia"],
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

type GalleryImages = {
  left?: string | null;
  center?: string | null;
  right?: string | null;
};

export function AboutStory({
  heroImageUrl,
  galleryImages,
}: {
  heroImageUrl?: string | null;
  galleryImages?: GalleryImages;
}) {
  return (
    <>
      <Hero imageUrl={heroImageUrl} />
      <Story />
      <PodcastLoop />
      <Numbers />
      <TeachingApproach />
      <PhotoSequence images={galleryImages} />
    </>
  );
}

function Hero({ imageUrl }: { imageUrl?: string | null }) {
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
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <AnimatedHeadline
            as="h1"
            delay={0.08}
            className="text-[40px] font-medium leading-[1.01] tracking-[-0.045em] text-[#EDF2F7] sm:text-[46px] md:text-[72px] lg:text-[82px]"
          >
            <>
              Prima di insegnare <span className="whitespace-nowrap">l&apos;e-commerce,</span>{" "}l&apos;ho vissuto.
            </>
          </AnimatedHeadline>
          <AnimatedText
            delay={0.24}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#dddddd] md:text-xl lg:mx-0"
          >
            <>
              Sono Dario Tana.
              <br />
              Da oltre vent&apos;anni lavoro nel commercio elettronico e trasformo l&apos;esperienza sul campo in formazione concreta per <span className="whitespace-nowrap">imprenditori e aziende.</span>
            </>
          </AnimatedText>
        </div>

        <Reveal y={34} delay={0.18}>
          <PhotoPlaceholder
            label="Ritratto di Dario"
            className="mx-auto aspect-[4/5] w-full max-w-[430px]"
            index="01"
            imageUrl={imageUrl}
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
    offset: ["start 72%", "end 92%"],
  });
  const lineProgress = useTransform(scrollYProgress, (value) => {
    return Math.max(0, Math.min(1, value));
  });

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

        <div ref={roadmapRef} className="relative mx-auto max-w-[980px] pl-6 md:pl-14">
          <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-white/10 md:left-4" />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[2px] origin-top bg-[#00e5ff] md:left-4"
            style={{ scaleY: lineProgress }}
          />

          <ol className="relative flex flex-col gap-7 md:gap-10">
            {timeline.map((item, index) => (
              <RoadmapItem key={item.year} item={item} index={index} />
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
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.04, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true, amount: 0.22 }}
    >
      <article className="group relative overflow-hidden rounded-2xl border border-[#253444] bg-[#17222F] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#00e5ff]/45 md:p-10">
        <span className="block text-[40px] font-medium leading-none tracking-[-0.045em] text-[#00e5ff] md:text-[58px]">
          {item.year}
        </span>
        <h3 className="mt-5 text-[27px] font-medium leading-[1.08] tracking-tight text-[#EDF2F7] md:mt-6 md:text-[38px]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-[800px] text-[15px] leading-relaxed text-[#dddddd] md:text-[17px]">
          <EmphasizedText text={item.text} highlights={item.highlights} />
        </p>
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] origin-top bg-[#00e5ff]/70 transition-colors duration-500 group-hover:bg-[#00e5ff]" />
      </article>
    </motion.li>
  );
}

function EmphasizedText({ text, highlights }: { text: string; highlights: string[] }) {
  const escapedHighlights = highlights.map((highlight) =>
    highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const parts = text.split(new RegExp(`(${escapedHighlights.join("|")})`, "g"));
  const highlighted = new Set(highlights);

  return parts.map((part, index) =>
    highlighted.has(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-[#EDF2F7]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function PodcastLoop() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    const captionChecks: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const seekToSegmentStart = (target: Player) => {
      target.seekTo(40, true);
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
            timeCheck = setInterval(() => {
              if (target.getCurrentTime() >= 79.8) seekToSegmentStart(target);
            }, 200);
          },
          onStateChange: ({ data, target }) => {
            if (data === 0) {
              seekToSegmentStart(target);
              target.playVideo();
            }
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
      captionChecks.forEach(clearTimeout);
      player?.destroy();
    };
  }, []);

  return (
    <section className="px-5 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal y={34} className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#17222F]">
          <div className="relative aspect-[16/10] md:aspect-[16/8]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[145%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 overflow-hidden md:h-auto md:w-[145%]">
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
            <div className="pointer-events-none absolute inset-0 flex items-center px-5 py-4 sm:px-8 md:px-14 md:py-10 lg:px-20">
              <div className="w-[48%] max-w-[590px] md:w-auto">
                <h2 className="text-[21px] font-medium leading-[1.04] tracking-[-0.035em] text-[#EDF2F7] sm:text-[28px] md:text-[52px] md:leading-[1.02]">
                  In aula porto quello che succede davvero.
                </h2>
                <p className="mt-5 hidden max-w-[520px] text-lg leading-relaxed text-[#dddddd] md:block">
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

function PhotoSequence({ images }: { images?: GalleryImages }) {
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
            <PhotoPlaceholder
              label="Dario Tana"
              index="02"
              className="aspect-[4/5]"
              imageUrl={images?.left}
            />
          </Reveal>
          <Reveal y={36} delay={0.1}>
            <PhotoPlaceholder
              label="Dario Tana durante una lezione"
              index="03"
              className="aspect-[4/3]"
              imageUrl={images?.center}
            />
          </Reveal>
          <Reveal y={36} delay={0.2}>
            <PhotoPlaceholder
              label="Dario Tana durante una lezione"
              index="04"
              className="aspect-[4/5]"
              imageUrl={images?.right}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhotoPlaceholder({
  label,
  index,
  className,
  imageUrl,
}: {
  label: string;
  index: string;
  className?: string;
  imageUrl?: string | null;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[18px] border bg-[#17222F] ${
        imageUrl ? "border-[#00e5ff]/60" : "border-white/10"
      } ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0,229,255,0.1), transparent 45%), radial-gradient(circle at 70% 25%, rgba(0,229,255,0.13), transparent 28%)",
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={label}
          fill
          priority={index === "01"}
          sizes="(min-width: 1024px) 430px, 90vw"
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] transition-transform duration-[1400ms] group-hover:scale-105" />
      )}
      {!imageUrl && (
        <>
          <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#00e5ff]/25 bg-[#0D1218]/70 text-[11px] font-medium text-[#00e5ff] backdrop-blur-md">
            {index}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1218] via-[#0D1218]/70 to-transparent p-6 pt-20">
            <p className="text-lg font-medium text-[#EDF2F7]">{label}</p>
          </div>
        </>
      )}
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
