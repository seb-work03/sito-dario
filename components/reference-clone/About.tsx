"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Fragment, useEffect, useRef, type RefObject } from "react";

function AnimatedNumber({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let played = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played) return;
      played = true;
      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / (duration * 1000));
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(value * eased)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

function FillHeadline({
  words,
  targetRef,
  fillEnd = 1,
  className = "",
}: {
  words: string[];
  targetRef: RefObject<HTMLElement | null>;
  fillEnd?: number;
  className?: string;
}) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = targetRef.current;
      const headline = headlineRef.current;
      if (!target || !headline) return;
      const rect = target.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const travel = Math.max(1, target.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      const spans = headline.querySelectorAll<HTMLElement>("[data-fill-word]");
      spans.forEach((span, index) => {
        const start = (index / spans.length) * fillEnd;
        const end = ((index + 1) / spans.length) * fillEnd;
        const t = Math.max(0, Math.min(1, (progress - start) / Math.max(0.001, end - start)));
        const channel = (from: number, to: number) => Math.round(from + (to - from) * t);
        span.style.opacity = String(0.18 + 0.82 * t);
        span.style.color = `rgb(${channel(79, 237)}, ${channel(101, 242)}, ${channel(119, 247)})`;
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, [fillEnd, targetRef]);

  return (
    <h2 ref={headlineRef} className={`text-left leading-[1.2] tracking-[-0.02em] font-medium text-[clamp(20px,5.5vw,30px)] max-w-[560px] ${className}`}>
      {words.map((word, i) => {
        return (
          <Fragment key={i}>
            <span data-fill-word style={{ opacity: 0.18, color: "#4F6577" }}>{word}</span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </h2>
  );
}

/**
 * Mobile-only self-contained pin for the fill headline. Mirrors the desktop
 * behaviour (fill on scroll down, empty on scroll up, linger at the end)
 * using its own tall track + sticky, since the whole About block can't be
 * pinned on small screens.
 */
function MobileFillHeadline({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[170vh]">
      <div className="sticky top-[32vh]">
        <FillHeadline words={words} targetRef={ref} fillEnd={0.62} />
      </div>
    </div>
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
type AboutProps = {
  backgroundUrl?: string | null;
  selfieUrl?: string | null;
};

export function About({ backgroundUrl, selfieUrl }: AboutProps = {}) {
  const heroImage = backgroundUrl ?? "/reference-assets/adviest/lWBGvORq26aRQEptEZJQdspijzk.jpg";
  const selfieImage = selfieUrl ?? "/reference-assets/adviest/Frr87XRtMwvMp0tFB6pIPmdE.jpg";
  const pinRef = useRef<HTMLDivElement>(null);
  const introText =
    "Lavoro nell'e-commerce da oltre vent'anni. Aiuto aziende e professionisti a scegliere con metodo.";
  const words = introText.split(" ");

  return (
    <div id="about-us" ref={pinRef} className="relative md:h-[200vh] bg-[#0D1218]">
      <div className="md:sticky md:top-24 md:h-[calc(100vh-96px)] md:overflow-hidden md:flex md:items-center">
        <section className="w-full pt-10 md:pt-8 pb-14 md:pb-8">
          <div className="mx-auto max-w-[1180px] px-5">
            <div className="grid grid-cols-1 md:grid-cols-[0.95fr_2.05fr] gap-y-8 md:gap-x-10">
              {/* Left column: portrait + rating */}
              <div className="md:col-start-1 flex flex-col">
                <div
                  className="view-reveal group relative overflow-hidden rounded-[18px] bg-[#17222F]"
                  style={{ aspectRatio: "0.72" }}
                >
                  <Image
                    src={heroImage}
                    alt="Dario Tana"
                    fill
                    unoptimized={heroImage.startsWith("http")}
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0D1218]/95 via-[#0D1218]/55 to-transparent" />
                  <p className="absolute left-[22px] right-[22px] bottom-[22px] text-[#EDF2F7] italic leading-[1.4] text-[14px]">
                    &ldquo;L&apos;e-commerce non è un software da installare.
                    È un modello di business da governare attraverso dati e
                    competenze.&rdquo;
                  </p>
                </div>

                <GoogleReviewsCard />
              </div>

              {/* Right column: headline on top + [buildings | cta+chart] below */}
              <div className="md:col-start-2 flex flex-col gap-6 md:gap-8">
                {/* Desktop: fill driven by the big About pin */}
                <div className="hidden md:block">
                  <FillHeadline
                    words={words}
                    targetRef={pinRef}
                    fillEnd={0.62}
                    className="mb-[70px]"
                  />
                </div>
                {/* Mobile: self-contained pin so the effect matches desktop */}
                <div className="md:hidden">
                  <MobileFillHeadline words={words} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-6 md:gap-8 md:items-end">
                  {/* Buildings photo — desktop only */}
                  <div
                    className="view-reveal hidden md:block relative overflow-hidden rounded-[18px] bg-[#17222F] w-full"
                    style={{ aspectRatio: "0.85" }}
                  >
                    <Image
                      src={selfieImage}
                      alt="Dario Tana"
                      fill
                      unoptimized={selfieImage.startsWith("http")}
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.06]"
                      sizes="33vw"
                    />
                  </div>

                  {/* CTA + chart card */}
                  <div className="flex flex-col gap-[18px]">
                    {/* CTA — desktop only */}
                    <div className="hidden md:flex md:justify-end mb-[40px]">
                      <a
                        href="/chi-sono"
                        className="view-reveal group inline-flex items-center gap-2 rounded-full bg-[#00e5ff] text-[#0D1218] font-medium pl-5 pr-1.5 py-1.5 text-[15px] hover:bg-[#33ecff] transition-all duration-300 hover:shadow-[0_0_24px_2px_rgba(0,229,255,0.45)]"
                      >
                        <span>Chi sono</span>
                        <span className="flex items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff] w-9 h-9 shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
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

function GoogleReviewsCard() {
  const avatars = [
    // Radial gradient avatars — no external requests, feel like real photos
    { bg: "radial-gradient(circle at 35% 30%, #f3d9c3 0%, #b88968 45%, #6d4a2f 100%)", initials: "MR" },
    { bg: "radial-gradient(circle at 35% 30%, #fce4dc 0%, #d99787 45%, #7c4a3d 100%)", initials: "LG" },
    { bg: "radial-gradient(circle at 35% 30%, #d8e2ec 0%, #7d95ab 45%, #35485e 100%)", initials: "AT" },
  ];
  return (
    <div
      className="view-reveal mt-6 rounded-2xl bg-[#17222F] border border-white/8 px-4 py-4 flex items-center gap-4"
    >
      {/* Overlapping avatars */}
      <div className="flex -space-x-3 shrink-0">
        {avatars.map((a, i) => (
          <div
            key={i}
            className="w-11 h-11 rounded-full ring-2 ring-[#17222F] flex items-center justify-center text-white text-xs font-semibold shadow-md"
            style={{ background: a.bg }}
          >
            {a.initials}
          </div>
        ))}
      </div>

      {/* Right side: Google logo + rating + reviews line + text link */}
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <GoogleGLogo />
          <span className="text-[#EDF2F7] text-lg font-semibold tabular-nums leading-none">4.9</span>
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={14} className="fill-[#FFC107] text-[#FFC107]" />
            ))}
          </div>
        </div>
        <span className="text-[#dddddd] text-[13px] leading-tight">
          Google · <AnimatedNumber value={200} suffix="+" /> Recensioni
        </span>
        <a
          href="https://www.google.com/search?sca_esv=b5ea7be7985888f6&sxsrf=APpeQnuZOBg6W83dh4Pr_JRXkSvYWzFltQ:1785222127405&q=dario+tana&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_3pHcsvFS4IWC5hYX6m_ITQk8Tm5EKySRRmWkSOeb_tZMF753J2ho2K246GedOCCfqH2clQ%3D&uds=AJ5uw1-kGPOPznuu41q62UN0LLmJuzDY5atCBfaa0VK_OTe29jjPw2wQJJbPHFNzFVxdOu29sFM_r_kw0fmHfgVvwC8ksDWVf2cSpUWFgwyd4Zqk19KkFGY&sa=X&ved=2ahUKEwiE2P7V5vSVAxUxxQIHHYZGBKsQ3PALegQIMBAF"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-[#00e5ff] text-[12px] leading-tight inline-flex items-center gap-1 hover:text-[#33ecff] hover:underline underline-offset-2 transition-colors duration-300 w-fit"
        >
          Guarda le recensioni
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function GoogleGLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-label="Google">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.57v2.97h3.86c2.26-2.09 3.57-5.16 3.57-8.78z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.94l-3.86-2.97c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.11C3.25 21.3 7.31 24 12 24z"/>
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.29a12 12 0 0 0 0 10.78l3.98-3.11z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.29 6.61l3.98 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
    </svg>
  );
}

function ChartCard() {
  return (
    <div
      className="view-reveal group rounded-[18px] border border-white/8 bg-[#17222F] px-[22px] pt-[22px] pb-[20px] flex flex-col gap-4 transition-colors duration-500 hover:border-[#00e5ff]/40"
      style={{
        minHeight: 270,
        backgroundImage: "linear-gradient(rgba(37,52,68,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(37,52,68,0.45) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundPositionY: "22px",
      }}
    >
      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-bold tracking-tight text-[#00e5ff]">
          +5M fatturato creato da clienti e-commerce
        </p>
        <ExperienceChart />
      </div>

      <div className="mt-auto flex justify-evenly gap-5 pt-4 border-t border-white/8">
        <StatBlock value={20} suffix="+" label="anni di attività" />
        <StatBlock value={30} suffix="+" label="e-commerce seguiti" />
        <StatBlock value={200} suffix="+" label="recensioni" />
      </div>
    </div>
  );
}

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <span className="text-[#EDF2F7] text-2xl md:text-3xl font-medium tracking-tight tabular-nums">
        <AnimatedNumber value={value} suffix={suffix} />
      </span>
      <span className="text-[#93A6BB] text-[11px] leading-tight">{label}</span>
    </div>
  );
}

function ExperienceChart() {
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
  const endPoint = points[points.length - 1];

  return (
    <svg
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
      </defs>

      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#253444" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}

      {/* Area fill */}
      <path
        d={areaPath}
        fill="url(#expArea)"
        className="experience-chart-area"
      />

      {/* Line draws upward */}
      <path
        d={path}
        fill="none"
        stroke="#00e5ff"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        className="experience-chart-line"
      />

      {/* Pulse ring at the peak */}
      <circle
        cx={endPoint.x}
        cy={endPoint.y}
        r="6"
        fill="none"
        stroke="#00e5ff"
        strokeWidth="1"
        className="experience-chart-pulse"
      />

      {/* Leading dot at the peak */}
      <circle
        cx={endPoint.x}
        cy={endPoint.y}
        r="3.5"
        fill="#00e5ff"
        className="experience-chart-dot"
      />
    </svg>
  );
}
