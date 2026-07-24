"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedLabel } from "./AnimatedLabel";
import { ScrollFillText } from "./ScrollFillText";

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

export function About() {
  return (
    <section id="about-us" className="bg-[#0D1218] py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_0.82fr_1.18fr] gap-y-6 md:gap-x-8">
          {/* --- Row 1 : label (col 1) + title (col 2-3) ---------------- */}
          <div className="md:col-start-1 md:row-start-1">
            <AnimatedLabel>CHI SONO</AnimatedLabel>
          </div>

          <div className="md:col-start-2 md:col-end-4 md:row-start-1">
            <ScrollFillText
              text="Lavoro nell'e-commerce da oltre vent'anni. Aiuto aziende e professionisti a leggere il proprio contesto e a scegliere con metodo."
              className="text-left leading-[1.02] tracking-[-0.04em] font-normal max-w-[760px] text-[clamp(32px,4vw,58px)]"
            />
          </div>

          {/* --- Row 2 col 1 : portrait + rating ------------------------ */}
          <div className="md:col-start-1 md:row-start-2 flex flex-col">
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
                &ldquo;[TESTIMONIANZA DA SELEZIONARE — breve estratto da una
                recensione Google reale]&rdquo;
              </p>
            </motion.div>

            <div className="mt-[54px] flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Star size={20} className="fill-[#77C0CF] text-[#77C0CF]" />
                <span className="text-[#EDF2F7] text-2xl font-medium tabular-nums">4.9</span>
              </div>
              <span className="text-[#94A9BE] text-[13px]">
                media su <AnimatedNumber value={200} suffix="+" /> recensioni Google
              </span>
            </div>
          </div>

          {/* --- Row 2 col 2 : buildings photo, pushed down ------------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-start-2 md:row-start-2 md:mt-[80px] relative overflow-hidden rounded-[18px] bg-[#17222F] self-start w-full"
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

          {/* --- Row 2 col 3 : CTA + chart card ------------------------- */}
          <div className="md:col-start-3 md:row-start-2 md:mt-[80px] flex flex-col gap-[18px]">
            <div className="flex md:justify-end">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                href="#service"
                className="group inline-flex items-stretch overflow-hidden rounded-[10px] bg-[#77C0CF] text-[#0D1218] font-medium transition-colors duration-300 hover:bg-[#A5E1EC] shadow-[0_0_0_0_rgba(165,225,236,0)] hover:shadow-[0_0_24px_2px_rgba(165,225,236,0.45)]"
                style={{ height: 50 }}
              >
                <span className="flex items-center px-5 text-[15px]">
                  Scopri di più
                </span>
                <span className="flex items-center justify-center w-[50px] bg-[#5BAAB9] group-hover:bg-[#77C0CF] transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0D1218]">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="group rounded-[18px] border border-white/8 bg-[#17222F] px-[22px] pt-[26px] pb-[20px] flex flex-col gap-4 transition-colors duration-500 hover:border-[#77C0CF]/40"
              style={{ minHeight: 270 }}
            >
              <div className="flex flex-col gap-3">
                <p className="text-[11px] tracking-[0.18em] text-[#77C0CF]/80 uppercase">
                  Vent&apos;anni di e-commerce
                </p>
                <ExperienceChart />
              </div>

              <div className="mt-auto grid grid-cols-3 gap-5 pt-4 border-t border-white/8">
                <StatBlock value={20} suffix="+" label="anni di attività" />
                <StatBlock value={50} suffix="+" label="corsi tenuti" />
                <StatBlock value={200} suffix="+" label="recensioni" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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

function ExperienceChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const points = [
    { x: 0,   y: 78 }, { x: 40,  y: 72 }, { x: 80,  y: 65 },
    { x: 120, y: 68 }, { x: 160, y: 55 }, { x: 200, y: 48 },
    { x: 240, y: 42 }, { x: 280, y: 30 }, { x: 320, y: 22 },
  ];
  const path = `M ${points[0].x},${points[0].y} ` +
    points.slice(1).map((p, i) => {
      const prev = points[i];
      const cx1 = prev.x + (p.x - prev.x) * 0.5;
      const cx2 = prev.x + (p.x - prev.x) * 0.5;
      return `C ${cx1},${prev.y} ${cx2},${p.y} ${p.x},${p.y}`;
    }).join(" ");
  const areaPath = `${path} L 320,100 L 0,100 Z`;

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
          <stop offset="0%" stopColor="#77C0CF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#77C0CF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#253444" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}

      <motion.path
        d={areaPath}
        fill="url(#expArea)"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.6 }}
      />

      <motion.path
        d={path}
        fill="none"
        stroke="#77C0CF"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2"
          fill="#77C0CF"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
        />
      ))}

      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="6"
        fill="none"
        stroke="#77C0CF"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 1.5, 1], opacity: [0, 0.6, 0.3] } : {}}
        transition={{ duration: 2, delay: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
      />
    </svg>
  );
}
