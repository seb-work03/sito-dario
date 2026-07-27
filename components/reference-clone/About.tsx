"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Star } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatedLabel } from "./AnimatedLabel";

function AnimatedNumber({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function FillWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [filled, setFilled] = useState(false);
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ["#4F6577", "#EDF2F7"]);

  // Once a word is filled it stays filled forever, regardless of scroll
  // direction — no fade-out when scrolling back up.
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= range[1] && !filled) setFilled(true);
  });

  if (filled) {
    return <span style={{ color: "#EDF2F7", opacity: 1 }}>{children}</span>;
  }
  return <motion.span style={{ opacity, color }}>{children}</motion.span>;
}

function FillHeadline({ words, progress }: { words: string[]; progress: MotionValue<number> }) {
  return (
    <h2 className="text-left leading-[1.2] tracking-[-0.02em] font-medium text-[clamp(18px,2.1vw,30px)] max-w-[560px] mb-[70px]">
      {words.map((word, i) => {
        const start = (i / words.length) * 1.0;
        const end = ((i + 1) / words.length) * 1.0;
        return (
          <Fragment key={i}>
            <FillWord progress={progress} range={[start, end]}>
              {word}
            </FillWord>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </h2>
  );
}

/**
 * Layout matches the Framer reference: [CHI SONO] label at the top-left,
 * then a nested 2-column grid where col 1 holds the portrait + rating and
 * col 2 stacks the fill-in headline (top) above a smaller grid of the
 * buildings photo and the CTA + chart card.
 *
 * The whole block is wrapped in a sticky pin: as the user reaches the
 * section, vertical scroll stays fixed while the headline fills word by
 * word. Once the fill completes, the pin releases and normal scrolling
 * continues.
 */
export function About() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const introText =
    "Lavoro nell'e-commerce da oltre vent'anni. Aiuto aziende e professionisti a scegliere con metodo.";
  const words = introText.split(" ");

  return (
    <div id="about-us" ref={pinRef} className="relative md:h-[160vh] bg-[#0D1218]">
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden md:flex md:items-center">
        <section className="w-full pt-10 md:pt-8 pb-14 md:pb-8">
          <div className="mx-auto max-w-[1180px] px-5">
            <div className="mb-[60px] md:mb-[90px]">
              <AnimatedLabel>CHI SONO</AnimatedLabel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[0.95fr_2.05fr] gap-y-8 md:gap-x-10">
              {/* Left column: portrait + rating */}
              <div className="md:col-start-1 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                  className="group relative overflow-hidden rounded-[18px] bg-[#17222F]"
                  style={{ aspectRatio: "0.72" }}
                >
                  <Image
                    src="/reference-assets/adviest/lWBGvORq26aRQEptEZJQdspijzk.jpg"
                    alt="[FOTO DARIO CON CLIENTE DA INSERIRE]"
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0D1218]/95 via-[#0D1218]/55 to-transparent" />
                  <p className="absolute left-[22px] right-[22px] bottom-[22px] text-[#EDF2F7] italic leading-[1.4] text-[14px]">
                    &ldquo;L&apos;e-commerce non è un software da installare.
                    È un modello di business da governare attraverso dati e
                    competenze.&rdquo;
                  </p>
                </motion.div>

                <div className="mt-6 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Star size={20} className="fill-[#00e5ff] text-[#00e5ff]" />
                    <span className="text-[#EDF2F7] text-2xl font-medium tabular-nums">4.9</span>
                  </div>
                  <span className="text-[#94A9BE] text-[13px]">
                    media su <AnimatedNumber value={200} suffix="+" /> recensioni Google
                  </span>
                </div>
              </div>

              {/* Right column: headline on top + [buildings | cta+chart] below */}
              <div className="md:col-start-2 flex flex-col gap-6 md:gap-8">
                <FillHeadline words={words} progress={scrollYProgress} />

                <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-6 md:gap-8 md:items-end">
                  {/* Buildings photo */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                    className="relative overflow-hidden rounded-[18px] bg-[#17222F] w-full"
                    style={{ aspectRatio: "0.85" }}
                  >
                    <Image
                      src="/reference-assets/adviest/Frr87XRtMwvMp0tFB6pIPmdE.jpg"
                      alt="[FOTO DARIO AL LAVORO DA INSERIRE]"
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>

                  {/* CTA + chart card */}
                  <div className="flex flex-col gap-[18px]">
                    <div className="flex md:justify-end mb-[40px]">
                      <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        href="#service"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#00e5ff] text-[#0D1218] font-medium pl-5 pr-1.5 py-1.5 text-[15px] hover:bg-[#33ecff] transition-all duration-300 hover:shadow-[0_0_24px_2px_rgba(0,229,255,0.45)]"
                      >
                        <span>Scopri di più</span>
                        <span className="flex items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff] w-9 h-9 shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </span>
                      </motion.a>
                    </div>

                    <ChartCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ChartCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group rounded-[18px] border border-white/8 bg-[#17222F] px-[22px] pt-[22px] pb-[20px] flex flex-col gap-4 transition-colors duration-500 hover:border-[#00e5ff]/40"
      style={{
        minHeight: 270,
        backgroundImage: "linear-gradient(rgba(37,52,68,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(37,52,68,0.45) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundPositionY: "22px",
      }}
    >
      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-bold tracking-tight text-[#00e5ff]">
          +€2M fatturato guidato
        </p>
        <ExperienceChart hovered={hovered} />
      </div>

      <div className="mt-auto grid grid-cols-3 gap-5 pt-4 border-t border-white/8">
        <StatBlock value={20} suffix="+" label="anni di attività" />
        <StatBlock value={30} suffix="+" label="e-commerce seguiti" />
        <StatBlock value={200} suffix="+" label="recensioni" />
      </div>
    </motion.div>
  );
}

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <span className="text-[#EDF2F7] text-2xl md:text-3xl font-medium tracking-tight tabular-nums">
        <AnimatedNumber value={value} suffix={suffix} />
      </span>
      <span className="text-[#6A84A0] text-[11px] leading-tight">{label}</span>
    </div>
  );
}

function ExperienceChart({ hovered }: { hovered: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // Steeper growth curve; endpoint at x=290 (slightly before right edge) so dot isn't clipped
  const points = [
    { x: 0,   y: 82 }, { x: 40,  y: 75 }, { x: 80,  y: 70 },
    { x: 120, y: 72 }, { x: 160, y: 60 }, { x: 200, y: 48 },
    { x: 240, y: 38 }, { x: 270, y: 26 }, { x: 290, y: 16 },
  ];
  const path = `M ${points[0].x},${points[0].y} ` +
    points.slice(1).map((p, i) => {
      const prev = points[i];
      const cx1 = prev.x + (p.x - prev.x) * 0.5;
      const cx2 = prev.x + (p.x - prev.x) * 0.5;
      return `C ${cx1},${prev.y} ${cx2},${p.y} ${p.x},${p.y}`;
    }).join(" ");
  const areaPath = `${path} L 290,100 L 0,100 Z`;

  const midIndex = 4;
  const endIndex = points.length - 1;
  const midPoint = points[midIndex];
  const endPoint = points[endIndex];

  // 0 → not in view, 0.5 → mid (default), 1 → end (on hover)
  const target = inView ? (hovered ? 1 : 0.5) : 0;
  // clip rect width in viewBox units; endpoint is at x=290
  const revealWidth = 290 * target;

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 100"
      className="w-full h-24 md:h-28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="expArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="expReveal">
          <motion.rect
            x="0"
            y="-10"
            height="120"
            initial={{ width: 0 }}
            animate={{ width: revealWidth }}
            transition={{ duration: hovered ? 1.2 : 1.8, ease: [0.19, 1, 0.22, 1] }}
          />
        </clipPath>
      </defs>

      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#253444" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}

      <g clipPath="url(#expReveal)">
        <path d={areaPath} fill="url(#expArea)" />
        <path
          d={path}
          fill="none"
          stroke="#00e5ff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>

      {/* Leading dot: animates r instead of scale to avoid SVG transform-origin issues */}
      <motion.circle
        fill="#00e5ff"
        initial={{ cx: midPoint.x, cy: midPoint.y, r: 0, opacity: 0 }}
        animate={{
          cx: hovered ? endPoint.x : midPoint.x,
          cy: hovered ? endPoint.y : midPoint.y,
          r: inView ? 3.5 : 0,
          opacity: inView ? 1 : 0,
        }}
        transition={{ duration: hovered ? 1.2 : 1.8, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* Pulse ring around the leading dot */}
      <motion.circle
        fill="none"
        stroke="#00e5ff"
        strokeWidth="1"
        initial={{ cx: midPoint.x, cy: midPoint.y, r: 0, opacity: 0 }}
        animate={inView ? {
          cx: hovered ? endPoint.x : midPoint.x,
          cy: hovered ? endPoint.y : midPoint.y,
          r: [6, 9.6, 6],
          opacity: [0.5, 0.1, 0.5],
        } : { r: 0, opacity: 0 }}
        transition={{
          cx: { duration: hovered ? 1.2 : 1.8, ease: [0.19, 1, 0.22, 1] },
          cy: { duration: hovered ? 1.2 : 1.8, ease: [0.19, 1, 0.22, 1] },
          r: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </svg>
  );
}
