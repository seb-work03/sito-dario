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
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Genera ora */}
      <div className="rounded border border-gray-200 bg-white p-5 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-800">Genera articolo ora</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Argomento</label>
          <select
            value={selectedIndex}
            onChange={(e) =>
              setSelectedIndex(e.target.value === "auto" ? "auto" : Number(e.target.value))
            }
            className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
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
          className="self-start rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {pending && (
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {pending ? "Generazione in corso (30-60 sec)…" : "Genera articolo"}
        </button>

        {result && (
          <div className={`rounded border px-4 py-3 text-sm ${
            result.success
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}>
            {result.success ? (
              <>
                <p className="font-medium">Articolo creato in bozza.</p>
                <p className="mt-0.5 text-gray-600">{result.title}</p>
                <a
                  href={`/admin/articles/${result.articleId}/edit`}
                  className="mt-2 inline-block text-gray-800 underline text-sm"
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

      {/* Argomenti */}
      <div className="rounded border border-gray-200 bg-white p-5 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-800">Argomenti configurati</h2>
        <p className="text-xs text-gray-500">
          Per modificare gli argomenti, edita <code>lib/auto-generate/topics.ts</code>.
        </p>
        <ul className="flex flex-col divide-y divide-gray-100">
          {AUTO_GENERATE_TOPICS.map((t, i) => (
            <li key={i} className="flex items-start gap-3 py-2 text-sm">
              <span className="shrink-0 w-6 text-right text-xs text-gray-400 mt-0.5">#{i + 1}</span>
              <div>
                <p className="text-gray-800">{t.topic}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  categoria: {t.categorySlug} · immagine: &ldquo;{t.imageKeywords}&rdquo;
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Setup */}
      <div className="rounded border border-amber-200 bg-amber-50 p-5 flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-amber-800">Variabili d&apos;ambiente richieste</h2>
        <p className="text-xs text-gray-600">
          Aggiungi su Vercel → Settings → Environment Variables:
        </p>
        <ul className="flex flex-col gap-1 text-sm font-mono text-gray-700">
          <li><span className="font-semibold">ANTHROPIC_API_KEY</span> — da console.anthropic.com</li>
          <li><span className="font-semibold">UNSPLASH_ACCESS_KEY</span> — da unsplash.com/developers</li>
          <li><span className="font-semibold">CRON_SECRET</span> — stringa casuale segreta</li>
        </ul>
      </div>
    </div>
  );
}
