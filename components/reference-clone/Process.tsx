"use client";

import { useEffect, useRef } from "react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

const steps = [
  {
    number: "01",
    title: "Diagnosi",
    description:
      "Analisi di numeri, tecnologia, processi, persone e posizionamento competitivo. Prima capire davvero, poi decidere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Priorità",
    description:
      "Separazione netta tra ciò che genera impatto e ciò che consuma tempo e budget. Nessuna soluzione preconfezionata.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 6h18M3 12h12M3 18h7" />
        <path d="m16 16 3 3 3-3" />
        <path d="M19 19v-6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Esecuzione",
    description:
      "Roadmap pragmatica, responsabilità definite, affiancamento ai team interni o ai fornitori esterni fino al risultato.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Controllo",
    description:
      "KPI leggibili, apprendimento continuo, correzioni basate su evidenze e non sulle sensazioni.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

const CARD_W = 320;
const CARD_H = 210;
const GAP = 48;

const SPREAD_X = (CARD_W + GAP) / 2; // 164
const SPREAD_Y = (CARD_H + GAP) / 2; // 124

const layout = [
  { from: { x: 0, y: 0, r: 0 }, to: { x: -SPREAD_X, y: -SPREAD_Y }, z: 40 },
  { from: { x: 14, y: 10, r: 2.5 }, to: { x: SPREAD_X, y: -SPREAD_Y }, z: 30 },
  { from: { x: -12, y: 18, r: -2 }, to: { x: -SPREAD_X, y: SPREAD_Y }, z: 20 },
  { from: { x: 18, y: 26, r: 3.5 }, to: { x: SPREAD_X, y: SPREAD_Y }, z: 10 },
];

function ProcessCard({
  step,
  index,
}: {
  step: typeof steps[0];
  index: number;
}) {
  const { from, z } = layout[index];

  return (
    <div
      data-process-card={index}
      style={{
        zIndex: z,
        width: CARD_W,
        height: CARD_H,
        position: "absolute",
        left: `calc(50% - ${CARD_W / 2}px)`,
        top: `calc(50% - ${CARD_H / 2}px)`,
        transform: `translate(${from.x}px, ${from.y}px) rotate(${from.r}deg)`,
      }}
      className="group bg-[#0D1218] border border-[#253444]/60 rounded-3xl p-7 flex flex-col gap-3 transition-[border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[#EDF2F7] text-2xl font-medium tracking-tight leading-tight">{step.title}</h3>
        <div className="inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-xl w-11 h-11 shrink-0 transition-transform duration-500 group-hover:scale-110">
          {step.icon}
        </div>
      </div>
      <p className="text-[#dddddd] text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}

function ProcessCircuit() {
  // Card centres inside the play area (width = 2*CARD_W + GAP, height = 2*CARD_H + GAP).
  //  card 0 → (CARD_W/2,                     CARD_H/2)
  //  card 1 → (CARD_W + GAP + CARD_W/2,      CARD_H/2)
  //  card 3 → (CARD_W + GAP + CARD_W/2,      CARD_H + GAP + CARD_H/2)
  //  card 2 → (CARD_W/2,                     CARD_H + GAP + CARD_H/2)
  const w = CARD_W * 2 + GAP;
  const h = CARD_H * 2 + GAP;
  const cx = { l: CARD_W / 2, r: CARD_W + GAP + CARD_W / 2 };
  const cy = { t: CARD_H / 2, b: CARD_H + GAP + CARD_H / 2 };
  const perimeter = `M ${cx.l} ${cy.t} L ${cx.r} ${cy.t} L ${cx.r} ${cy.b} L ${cx.l} ${cy.b} Z`;

  return (
    <svg
      data-process-circuit
      className="absolute inset-0 pointer-events-none"
      viewBox={`0 0 ${w} ${h}`}
      style={{ opacity: 0 }}
      aria-hidden
    >
      {/* Perimeter line */}
      <path
        d={perimeter}
        fill="none"
        stroke="#0D1218"
        strokeOpacity="0.75"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 12"
        className="process-circuit-path"
      />
      {/* Corner glows at each card centre */}
      {[
        [cx.l, cy.t],
        [cx.r, cy.t],
        [cx.l, cy.b],
        [cx.r, cy.b],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="6"
          fill="#0D1218"
          className="process-circuit-dot"
          style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </svg>
  );
}

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      const header = track.querySelector<HTMLElement>("[data-process-header]");
      const cards = track.querySelector<HTMLElement>("[data-process-cards]");
      const circuit = track.querySelector<HTMLElement>("[data-process-circuit]");
      const headerT = clamp((progress - 0.08) / 0.3);
      const headerOpacity = 1 - easeInOut(headerT);
      const cardsOpacity = clamp((progress - 0.42) / 0.1);
      const fan = clamp((progress - 0.52) / 0.18);
      if (header) {
        header.style.opacity = String(headerOpacity);
        header.style.visibility = progress >= 0.4 ? "hidden" : "visible";
      }
      if (cards) cards.style.opacity = String(cardsOpacity);
      if (circuit) circuit.style.opacity = String(fan);
      track.querySelectorAll<HTMLElement>("[data-process-card]").forEach((card, index) => {
        const item = layout[index];
        if (!item) return;
        const x = item.from.x + (item.to.x - item.from.x) * fan;
        const y = item.from.y + (item.to.y - item.from.y) * fan;
        const rotate = item.from.r * (1 - fan);
        card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
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
  }, []);

  return (
    <section id="process" className="relative bg-[#00e5ff]">
      {/* Pattern layers */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,18,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,18,24,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(13,18,24,0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 18% 12%, rgba(255,255,255,0.45), transparent 60%), radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, rgba(13,18,24,0.18) 100%)",
        }}
      />

      {/* Desktop pin: header and cards are both absolutely centered inside
          the sticky area and cross-fade — first the header shows, then it
          fades out as the cards fade in and fan out.
          Track 240vh, sticky 100vh → 140vh of scroll for the whole story. */}
      <div className="hidden md:block relative z-10" ref={trackRef} style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen">
          {/* Centered header — visible first, fades out when cards enter */}
          <div
            data-process-header
            style={{ opacity: 1, visibility: "visible" }}
            className="absolute inset-0 flex items-center justify-center px-5 pointer-events-none"
          >
            <div className="text-center max-w-3xl">
              <AnimatedHeadline className="text-[#0D1218] font-medium text-[32px] md:text-[52px] leading-[1.05] tracking-tight">
                Non una formula. Un sistema di decisioni.
              </AnimatedHeadline>
              <AnimatedText
                delay={0.25}
                className="text-[#0D1218]/80 mx-auto mt-5 leading-relaxed"
              >
                <>
                  Ogni progetto viene affrontato con una sequenza chiara: capire, scegliere, costruire, misurare.
                  <br />
                  <br />
                  <strong className="font-semibold text-[#0D1218]">Adattata al contesto.</strong>
                </>
              </AnimatedText>
            </div>
          </div>

          {/* Cards play area — absolutely centered, cross-fades in as the
              header fades out, then fans out from the centre. */}
          <div
            data-process-cards
            style={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="relative"
              style={{ width: CARD_W * 2 + GAP, height: CARD_H * 2 + GAP }}
            >
              {/* Circuit line connecting the four card centres — sits behind
                  the cards and shows through the gaps between them. Loops
                  a moving dash pattern around the perimeter. */}
              <ProcessCircuit />

              {steps.map((step, i) => (
                <ProcessCard key={step.number} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: centered header on top, stacked cards below */}
      <div className="md:hidden relative z-10 px-5 pt-16 pb-16">
        <div className="text-center max-w-lg mx-auto mb-10">
          <AnimatedHeadline className="text-[#0D1218] font-medium text-[32px] leading-[1.05] tracking-tight">
            Non una formula. Un sistema di decisioni.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.2}
            className="text-[#0D1218]/80 mt-5 leading-relaxed"
          >
            <>
              Ogni progetto viene affrontato con una sequenza chiara: capire, scegliere, costruire, misurare.
              <br />
              <br />
              <strong className="font-semibold text-[#0D1218]">Adattata al contesto.</strong>
            </>
          </AnimatedText>
        </div>
        <div className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <div
              key={s.number}
              style={{ "--view-reveal-delay": `${i * 0.09}s` } as React.CSSProperties}
              className="view-reveal bg-[#0D1218] border border-[#253444]/60 rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[#EDF2F7] text-xl font-medium tracking-tight">{s.title}</h3>
                <div className="inline-flex items-center justify-center bg-[#00e5ff] text-[#0D1218] rounded-lg w-9 h-9 shrink-0">
                  {s.icon}
                </div>
              </div>
              <p className="text-[#dddddd] text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
