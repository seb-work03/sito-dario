"use client";

import { useState, useMemo, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Mail, Phone } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { AnimatedText } from "./AnimatedText";

type Intent = "ecommerce" | "formazione" | "speech";

type Values = {
  intent: Intent | null;
  dimension: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  privacy: boolean;
};

const intentOptions: { id: Intent; letter: string; title: string; sub: string; value: string }[] = [
  { id: "ecommerce", letter: "A", title: "Scalare un e-commerce", sub: "Strategia, tecnologia, CRO e processi.", value: "Scalare un E-commerce esistente" },
  { id: "formazione", letter: "B", title: "Formazione o docenza", sub: "Corporate, academy, ITS e workshop.", value: "Formazione aziendale o docenza" },
  { id: "speech", letter: "C", title: "Speech per evento", sub: "Keynote, speech e format su misura.", value: "Richiesta speech per evento" },
];

const dimensionEcommerce = [
  { title: "Fino a 250k", sub: "Fatturato e-commerce annuo", value: "Fino a 250.000 €" },
  { title: "Da 250k a 1M", sub: "Fatturato e-commerce annuo", value: "Da 250.000 € a 1 milione" },
  { title: "Oltre 1M", sub: "Fatturato e-commerce annuo", value: "Oltre 1 milione" },
  { title: "In validazione", sub: "Business case già strutturato", value: "Progetto in fase di validazione" },
];

const dimensionOther = [
  { title: "Intervento breve", sub: "Talk, keynote o workshop fino a 4 ore", value: "Intervento fino a 4 ore" },
  { title: "Percorso da 8 a 24 ore", sub: "Formazione verticale e operativa", value: "Percorso da 8 a 24 ore" },
  { title: "Academy estesa", sub: "Programma oltre 24 ore", value: "Academy oltre 24 ore" },
  { title: "Da progettare", sub: "Serve una proposta su misura", value: "Da definire insieme" },
];

const TOTAL_STEPS = 3;

export function StrategicBriefing() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Values>({
    intent: null,
    dimension: "",
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    privacy: false,
  });

  const dimensionOptions = useMemo(
    () => (values.intent === "ecommerce" ? dimensionEcommerce : dimensionOther),
    [values.intent],
  );

  function goPrev() {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!values.name || !values.email || !values.company || !values.role || !values.message) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    if (!values.privacy) {
      setError("Autorizza il trattamento dei dati per proseguire.");
      return;
    }
    setDone(true);
  }

  function reset() {
    setValues({
      intent: null,
      dimension: "",
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
      privacy: false,
    });
    setStep(1);
    setDone(false);
    setError(null);
  }

  return (
    <section id="briefing" className="bg-[#0D1218] px-5 py-16 md:py-28 border-t border-[#00e5ff]/25">
      <div className="mx-auto max-w-[1240px] grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
        {/* Left: intro */}
        <div className="md:sticky md:top-[130px] self-start">
          <AnimatedHeadline className="text-[#EDF2F7] font-medium text-[32px] md:text-[48px] leading-[1.05] mb-6 tracking-tight">
            Raccontami il tuo progetto, ci penso io al resto.
          </AnimatedHeadline>
          <AnimatedText
            delay={0.1}
            className="text-[#dddddd] text-sm md:text-base leading-relaxed max-w-md mb-8"
          >
            Il briefing serve a capire rapidamente obiettivi, struttura e livello di maturità del progetto.
          </AnimatedText>

          <div className="flex flex-col gap-3 text-sm">
            <span className="text-white text-[11px] uppercase tracking-[0.12em] font-medium">
              Preferisci un contatto diretto?
            </span>
            <motion.a
              href="mailto:info@dariotana.it"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="group inline-flex items-center gap-2.5 text-white hover:text-[#00e5ff] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#00e5ff]/15 border border-white/10 group-hover:border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] transition-all duration-300">
                <Mail size={14} strokeWidth={1.75} />
              </span>
              info@dariotana.it
            </motion.a>
            <motion.a
              href="tel:+393487830571"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="group inline-flex items-center gap-2.5 text-white hover:text-[#00e5ff] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#00e5ff]/15 border border-white/10 group-hover:border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] transition-all duration-300">
                <Phone size={14} strokeWidth={1.75} />
              </span>
              +39 348 783 0571
            </motion.a>
          </div>
        </div>

        {/* Right: form panel with animated rotating cyan border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative rounded-2xl p-[1.5px] overflow-hidden isolate"
        >
          {/* Rotating cyan sweep — sits behind the inner card, its edge
              shows through the 1.5px padding as an animated border. */}
          <span
            aria-hidden
            className="absolute -inset-[100%] -z-10 pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, rgba(0,229,255,0.85) 300deg, #00e5ff 340deg, transparent 360deg)",
              animation: "refborderspin 4s linear infinite",
            }}
          />
          {/* Dim base ring so the border is visible even when the sweep is
              on the far side of the card. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
          />
          <div
            className="relative rounded-[calc(1rem-1px)] bg-[#17222F] p-6 md:p-10 overflow-hidden"
          >
          {/* Header row: current step title on the left, progress dots on the right */}
          {(() => {
            const stepTitle = done
              ? "Briefing ricevuto."
              : step === 1
                ? "Qual è il tuo obiettivo principale?"
                : step === 2
                  ? values.intent === "ecommerce"
                    ? "Qual è la dimensione attuale del progetto?"
                    : "Che tipo di intervento stai organizzando?"
                  : "Chi guiderà questo progetto?";
            return (
              <div className="flex items-start justify-between gap-4 mb-8 md:mb-12 pt-2">
                <h3
                  key={`title-${done ? "done" : step}`}
                  className="text-[#EDF2F7] text-[22px] md:text-[30px] font-medium tracking-tight leading-[1.15] flex-1"
                >
                  {stepTitle}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0 mt-2 md:mt-3">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                    const active = done || i === step - 1;
                    return (
                      <span
                        key={i}
                        aria-hidden
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: active ? 24 : 8,
                          background: active ? "#00e5ff" : "rgba(255,255,255,0.15)",
                        }}
                      />
                    );
                  })}
                  <span className="sr-only">
                    {done ? "Completato" : `Step ${step} di ${TOTAL_STEPS}`}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Form body */}
          {!done ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.fieldset
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="border-0 p-0 m-0"
                  >
                    <legend className="sr-only">
                      Qual è il tuo obiettivo principale?
                    </legend>
                    <p className="text-[#93A6BB] text-sm mb-7">Scegli l&apos;area più vicina alla richiesta.</p>
                    <div className="flex flex-col gap-3">
                      {intentOptions.map((opt) => (
                        <ChoiceCard
                          key={opt.id}
                          letter={opt.letter}
                          title={opt.title}
                          sub={opt.sub}
                          checked={values.intent === opt.id}
                          onSelect={() => {
                            // Reset dimension when intent changes, then auto-advance
                            setValues((v) => ({ ...v, intent: opt.id, dimension: "" }));
                            setError(null);
                            setStep(2);
                          }}
                        />
                      ))}
                    </div>
                  </motion.fieldset>
                )}

                {step === 2 && (
                  <motion.fieldset
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="border-0 p-0 m-0"
                  >
                    <legend className="sr-only">
                      {values.intent === "ecommerce"
                        ? "Qual è la dimensione attuale del progetto?"
                        : "Che tipo di intervento stai organizzando?"}
                    </legend>
                    <p className="text-[#93A6BB] text-sm mb-7">
                      {values.intent === "ecommerce"
                        ? "Dato indicativo, utile per valutare complessità e priorità."
                        : "Seleziona il formato più vicino alle tue esigenze."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dimensionOptions.map((opt) => (
                        <ChoiceCard
                          key={opt.value}
                          title={opt.title}
                          sub={opt.sub}
                          compact
                          checked={values.dimension === opt.value}
                          onSelect={() => {
                            setValues((v) => ({ ...v, dimension: opt.value }));
                            setError(null);
                            setStep(3);
                          }}
                        />
                      ))}
                    </div>
                  </motion.fieldset>
                )}

                {step === 3 && (
                  <motion.fieldset
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="border-0 p-0 m-0"
                  >
                    <legend className="sr-only">
                      Chi guiderà questo progetto?
                    </legend>
                    <p className="text-[#93A6BB] text-sm mb-7">
                      I campi aziendali aiutano a contestualizzare la richiesta.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Nome e cognome *"
                        type="text"
                        value={values.name}
                        onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                        placeholder="Mario Rossi"
                        autoComplete="name"
                      />
                      <Field
                        label="Email aziendale *"
                        type="email"
                        value={values.email}
                        onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                        placeholder="mario@azienda.it"
                        autoComplete="email"
                      />
                      <Field
                        label="Azienda *"
                        type="text"
                        value={values.company}
                        onChange={(v) => setValues((s) => ({ ...s, company: v }))}
                        placeholder="Nome azienda"
                        autoComplete="organization"
                      />
                      <Field
                        label="Ruolo *"
                        type="text"
                        value={values.role}
                        onChange={(v) => setValues((s) => ({ ...s, role: v }))}
                        placeholder="CEO, Marketing Director…"
                        autoComplete="organization-title"
                      />
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-[#dddddd] text-[11px] uppercase tracking-[0.1em]">
                          Contesto e obiettivo *
                        </span>
                        <textarea
                          value={values.message}
                          onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                          rows={4}
                          placeholder="Descrivi il punto di partenza, il risultato atteso e le principali criticità."
                          className="rounded-lg bg-[#0D1218] border border-white/10 text-[#EDF2F7] text-sm p-3 focus:outline-none focus:border-[#00e5ff] transition-colors placeholder:text-[#4F6577] resize-none"
                        />
                      </label>
                    </div>

                    <label className="flex items-start gap-3 mt-6 cursor-pointer group">
                      <span
                        className={`shrink-0 mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center ${
                          values.privacy
                            ? "bg-[#00e5ff] border-[#00e5ff]"
                            : "bg-transparent border-white/25 group-hover:border-[#00e5ff]/50"
                        }`}
                      >
                        {values.privacy && <Check size={12} className="text-[#0D1218]" strokeWidth={3} />}
                      </span>
                      <input
                        type="checkbox"
                        checked={values.privacy}
                        onChange={(e) => setValues((s) => ({ ...s, privacy: e.target.checked }))}
                        className="sr-only"
                      />
                      <span className="text-[#dddddd] text-xs leading-relaxed">
                        Ho letto l&apos;informativa privacy e autorizzo il trattamento dei dati per essere ricontattato.
                      </span>
                    </label>
                  </motion.fieldset>
                )}
              </AnimatePresence>

              {/* Error message */}
              {error && (
                <p className="text-[#FF6B6B] text-xs mt-4" role="alert">
                  {error}
                </p>
              )}

              {/* Actions — only when there is something to show */}
              {step > 1 && (
                <div className="flex flex-wrap gap-3 justify-between mt-6">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="group inline-flex items-center gap-2 px-5 py-3 text-sm text-[#dddddd] hover:text-[#EDF2F7] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-1" />
                    Indietro
                  </button>

                  {step === TOTAL_STEPS && (
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#00e5ff] text-[#0D1218] font-medium pl-5 pr-1.5 py-1.5 text-sm transition-all duration-500 hover:bg-[#33ecff] hover:shadow-[0_0_28px_rgba(0,229,255,0.55)] cursor-pointer"
                    >
                      Invia il briefing
                      <span className="flex items-center justify-center rounded-full bg-[#0D1218] text-[#00e5ff] w-8 h-8 shrink-0">
                        <ArrowRight size={13} className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-rotate-45" />
                      </span>
                    </button>
                  )}
                </div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-start gap-4 py-6"
            >
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#00e5ff] text-[#0D1218]">
                <Check size={26} strokeWidth={3} />
              </span>
              <p className="text-[#dddddd] max-w-md leading-relaxed">
                Grazie per il tempo che hai dedicato. Ti ricontatterò personalmente in uno o due giorni lavorativi.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-2 text-[#00e5ff] text-sm hover:text-[#33ecff] hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                Compila una nuova richiesta ↗
              </button>
            </motion.div>
          )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChoiceCard({
  letter,
  title,
  sub,
  checked,
  onSelect,
  compact = false,
}: {
  letter?: string;
  title: string;
  sub: string;
  checked: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full text-left grid ${
        letter ? "grid-cols-[36px_1fr_auto]" : "grid-cols-[1fr_auto]"
      } items-center gap-4 rounded-xl border px-4 md:px-5 ${
        compact ? "py-4" : "py-5"
      } transition-all duration-300 cursor-pointer ${
        checked
          ? "border-[#00e5ff] bg-[rgba(0,229,255,0.06)]"
          : "border-white/10 bg-white/[0.02] hover:border-[#00e5ff]/40 hover:translate-x-1"
      }`}
    >
      {letter && (
        <span
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums transition-colors ${
            checked ? "bg-[#00e5ff] text-[#0D1218]" : "bg-white/5 text-[#dddddd] group-hover:text-[#EDF2F7]"
          }`}
        >
          {letter}
        </span>
      )}
      <span className="flex flex-col min-w-0">
        <strong className="text-[#EDF2F7] text-base font-medium tracking-tight leading-tight">{title}</strong>
        <small className="text-[#93A6BB] text-xs leading-tight mt-0.5">{sub}</small>
      </span>
      <span
        className={`shrink-0 transition-colors text-lg ${
          checked ? "text-[#00e5ff]" : "text-[#4F6577] group-hover:text-[#dddddd]"
        }`}
      >
        ↗
      </span>
    </button>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[#dddddd] text-[11px] uppercase tracking-[0.1em]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-lg bg-[#0D1218] border border-white/10 text-[#EDF2F7] text-sm p-3 focus:outline-none focus:border-[#00e5ff] transition-colors placeholder:text-[#4F6577]"
      />
    </label>
  );
}
