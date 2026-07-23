"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
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

export function About() {
  return (
    <section id="about-us" className="bg-[#0D1218] px-5 py-16 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <AnimatedLabel>CHI SONO</AnimatedLabel>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-[#EDF2F7] text-lg md:text-2xl max-w-2xl md:text-right leading-snug tracking-tight"
          >
            Lavoro nell&apos;e-commerce da oltre vent&apos;anni. Aiuto aziende e
            professionisti a leggere il proprio contesto e a scegliere con
            metodo.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Left card — photo + review pill */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="group relative rounded-3xl overflow-hidden aspect-[400/552] bg-[#17222F]">
              <Image
                src="/reference-assets/adviest/lWBGvORq26aRQEptEZJQdspijzk.jpg"
                alt="[FOTO DARIO CON CLIENTE DA INSERIRE]"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1218] via-[#0D1218]/60 to-transparent p-6 pt-20">
                <p className="text-[#EDF2F7] text-[15px] leading-snug italic">
                  &ldquo;[TESTIMONIANZA DA SELEZIONARE — breve estratto da una
                  recensione Google reale]&rdquo;
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Star size={18} className="fill-[#77C0CF] text-[#77C0CF]" />
              <span className="text-[#EDF2F7] font-medium">4.9</span>
              <span className="text-[#94A9BE] text-sm">
                media su <AnimatedNumber value={200} suffix="+" /> recensioni Google
              </span>
            </div>
          </motion.div>

          {/* Center — big photo of Dario */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="group relative rounded-3xl overflow-hidden aspect-[300/363] md:aspect-auto bg-[#17222F]"
          >
            <Image
              src="/reference-assets/adviest/Frr87XRtMwvMp0tFB6pIPmdE.jpg"
              alt="[FOTO DARIO AL LAVORO DA INSERIRE]"
              fill
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Floating annotation card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="absolute left-4 bottom-4 rounded-2xl bg-[#0D1218]/85 backdrop-blur-md border border-white/8 px-4 py-3 max-w-[220px]"
            >
              <p className="font-mono text-[10px] tracking-widest text-[#77C0CF]/70 uppercase mb-1">
                Cofondatore
              </p>
              <p className="text-[#EDF2F7] text-sm leading-snug">
                DT E-commerce Consulting, insieme a Tiziana Tana.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — animated SVG chart card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="group rounded-3xl border border-white/8 bg-[#17222F] p-6 flex flex-col justify-between gap-6 hover:border-[#77C0CF]/40 transition-colors duration-500"
          >
            <div>
              <p className="font-mono text-xs tracking-widest text-[#77C0CF]/70 uppercase mb-4">
                Vent&apos;anni di e-commerce
              </p>

              {/* SVG timeline chart */}
              <ExperienceChart />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/8">
              <StatBlock value={20} suffix="+" label="anni di attività" />
              <StatBlock value={50} suffix="+" label="corsi tenuti" />
              <StatBlock value={200} suffix="+" label="recensioni" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
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
      className="w-full h-24 md:h-32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="expArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#77C0CF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#77C0CF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#253444" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}

      {/* Filled area */}
      <motion.path
        d={areaPath}
        fill="url(#expArea)"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.6 }}
      />

      {/* Curve */}
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

      {/* Dots */}
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
          className="transition-all duration-300 group-hover:r-[3.5]"
        />
      ))}

      {/* Highlight last dot with pulse */}
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
