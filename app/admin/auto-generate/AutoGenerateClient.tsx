"use client";

import { useState, useTransition } from "react";
import { AUTO_GENERATE_TOPICS } from "@/lib/auto-generate/topics";
import { generateArticleNow, type GenerateActionResult } from "@/app/admin/actions/auto-generate";

export function AutoGenerateClient() {
  const [selectedIndex, setSelectedIndex] = useState<number | "auto">("auto");
  const [result, setResult] = useState<GenerateActionResult | null>(null);
  const [pending, startTransition] = useTransition();

  function generate() {
    setResult(null);
    startTransition(async () => {
      const res = await generateArticleNow(selectedIndex);
      setResult(res);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-ink-600 bg-ink-800 p-5 flex flex-col gap-4">
        <h2 className="text-paper-50 font-medium">Genera articolo ora</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-paper-300">Argomento</label>
          <select
            value={selectedIndex}
            onChange={(e) =>
              setSelectedIndex(e.target.value === "auto" ? "auto" : Number(e.target.value))
            }
            className="rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-celeste-500 focus:outline-none"
          >
            <option value="auto">Automatico (rotazione mensile)</option>
            {AUTO_GENERATE_TOPICS.map((t, i) => (
              <option key={i} value={i}>
                {t.topic.slice(0, 80)}…
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generate}
          disabled={pending}
          className="self-start rounded-md bg-celeste-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-celeste-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {pending && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {pending ? "Generazione in corso (30-60 sec)…" : "Genera articolo"}
        </button>

        {result && (
          <div
            className={`rounded-md px-4 py-3 text-sm ${
              result.success
                ? "bg-green-900/40 border border-green-700 text-green-300"
                : "bg-red-900/40 border border-red-700 text-red-300"
            }`}
          >
            {result.success ? (
              <>
                <p className="font-medium">Articolo creato in bozza!</p>
                <p className="mt-1 text-paper-400">{result.title}</p>
                <a
                  href={`/admin/articles/${result.articleId}/edit`}
                  className="mt-2 inline-block text-celeste-400 underline"
                >
                  Apri e rivedi →
                </a>
              </>
            ) : (
              <p>Errore: {result.error}</p>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-ink-600 bg-ink-800 p-5 flex flex-col gap-3">
        <h2 className="text-paper-50 font-medium">Argomenti configurati</h2>
        <p className="text-sm text-paper-400">
          Modifica <code className="text-celeste-400">lib/auto-generate/topics.ts</code> per cambiare gli argomenti o aggiungerne di nuovi.
        </p>
        <ul className="flex flex-col gap-2">
          {AUTO_GENERATE_TOPICS.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="shrink-0 rounded bg-ink-700 px-2 py-0.5 text-xs text-paper-400 font-mono">
                #{i + 1}
              </span>
              <div>
                <p className="text-paper-200">{t.topic}</p>
                <p className="text-paper-500 text-xs mt-0.5">
                  categoria: {t.categorySlug} · immagine: &ldquo;{t.imageKeywords}&rdquo;
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-amber-800/50 bg-amber-950/30 p-5 flex flex-col gap-2">
        <h2 className="text-amber-300 font-medium text-sm">Configurazione richiesta</h2>
        <p className="text-sm text-paper-400">
          Aggiungi queste variabili d&apos;ambiente su Vercel (Settings → Environment Variables):
        </p>
        <ul className="flex flex-col gap-1 text-sm font-mono">
          <li><span className="text-celeste-400">ANTHROPIC_API_KEY</span> — chiave da console.anthropic.com</li>
          <li><span className="text-celeste-400">UNSPLASH_ACCESS_KEY</span> — chiave da unsplash.com/developers</li>
          <li><span className="text-celeste-400">CRON_SECRET</span> — stringa casuale (es. <code>openssl rand -hex 32</code>)</li>
        </ul>
        <p className="text-xs text-paper-500 mt-1">
          Il cron è impostato al 1° di ogni mese alle 8:00 UTC (vedi <code>vercel.json</code>).
        </p>
      </div>
    </div>
  );
}
