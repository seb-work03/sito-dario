"use client";

import { useCallback, useEffect, useState } from "react";
import { PeriodSelector } from "./PeriodSelector";
import { KpiCard } from "./KpiCard";
import { Timeseries } from "./Timeseries";
import { TopList } from "./TopList";
import type {
  AnalyticsStatus,
  BreakdownResult,
  Dimension,
  OverviewResult,
  PeriodPreset,
  TimeseriesResult,
} from "@/lib/analytics/types";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(String(res.status));
  return res.json() as Promise<T>;
}

const TOP_DIMENSIONS: { title: string; dim: Dimension }[] = [
  { title: "Pagine principali", dim: "requestPath" },
  { title: "Referrer", dim: "referrerHostname" },
  { title: "Paesi", dim: "country" },
  { title: "Dispositivi", dim: "deviceType" },
  { title: "Browser", dim: "browserName" },
];

export function AnalyticsDashboard() {
  const [preset, setPreset] = useState<PeriodPreset>("last7d");
  const [status, setStatus] = useState<AnalyticsStatus | null>(null);
  const [overview, setOverview] = useState<OverviewResult | null>(null);
  const [ts, setTs] = useState<TimeseriesResult | null>(null);
  const [tops, setTops] = useState<Record<Dimension, BreakdownResult | null>>({} as Record<Dimension, BreakdownResult | null>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (p: PeriodPreset) => {
    setLoading(true);
    setError(null);
    try {
      const [s, o, t, ...bds] = await Promise.all([
        fetchJson<AnalyticsStatus>("/api/admin/analytics/status"),
        fetchJson<OverviewResult>(`/api/admin/analytics/overview?preset=${p}`),
        fetchJson<TimeseriesResult>(`/api/admin/analytics/timeseries?preset=${p}`),
        ...TOP_DIMENSIONS.map((d) =>
          fetchJson<BreakdownResult>(`/api/admin/analytics/breakdown?preset=${p}&dimension=${d.dim}&limit=5`)
            .catch((): BreakdownResult => ({ dimension: d.dim, rows: [], hasOthers: false, updatedAt: "" }))
        ),
      ]);
      setStatus(s);
      setOverview(o);
      setTs(t);
      const map: Record<string, BreakdownResult | null> = {};
      TOP_DIMENSIONS.forEach((d, i) => (map[d.dim] = bds[i] ?? null));
      setTops(map as Record<Dimension, BreakdownResult | null>);
    } catch {
      setError("Impossibile caricare i dati Analytics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(preset);
  }, [preset, load]);

  const viewsPerVisitor =
    overview && overview.current.visitors > 0
      ? overview.current.pageviews / overview.current.visitors
      : null;

  const previousViewsPerVisitor =
    overview?.previous && overview.previous.visitors > 0
      ? overview.previous.pageviews / overview.previous.visitors
      : undefined;

  const notConfigured = status && !status.configured;
  const badConnection = status && status.configured && status.connection !== "ok";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Panoramica del traffico basata su Vercel Web Analytics (piano Hobby, retention 30 giorni).
          </p>
        </div>
        <PeriodSelector value={preset} onChange={setPreset} />
      </div>

      {/* Status banners */}
      {notConfigured && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Analytics non configurato. Aggiungi <code className="rounded bg-yellow-100 px-1 text-xs">VERCEL_ACCESS_TOKEN</code> e <code className="rounded bg-yellow-100 px-1 text-xs">VERCEL_PROJECT_ID</code> alle env vars.
        </div>
      )}
      {badConnection && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {status?.message ?? "Errore di connessione all'API Vercel."}
        </div>
      )}
      {error && !notConfigured && !badConnection && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {overview && !overview.comparisonAvailable && (
        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs text-gray-600">
          Confronto non disponibile: il piano Hobby conserva un solo mese di dati.
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Visualizzazioni"
          value={overview?.current.pageviews ?? null}
          previous={overview?.previous?.pageviews}
          loading={loading}
        />
        <KpiCard
          label="Visitatori"
          value={overview?.current.visitors ?? null}
          previous={overview?.previous?.visitors}
          tooltip="I visitatori sono calcolati in forma anonimizzata. Vercel non riconosce lo stesso visitatore tra giorni diversi."
          loading={loading}
        />
        <KpiCard
          label="Views per visitatore"
          value={viewsPerVisitor !== null ? viewsPerVisitor.toFixed(2) : null}
          previous={previousViewsPerVisitor}
          tooltip="Dato calcolato: visualizzazioni ÷ visitatori."
          loading={loading}
        />
        <KpiCard
          label="Pagina principale"
          value={overview?.topPage ? overview.topPage.label : "—"}
          hint={overview?.topPage ? `${overview.topPage.pageviews} visualizzazioni` : undefined}
          loading={loading}
        />
      </div>

      {/* Timeseries */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Andamento</h3>
          {ts && <span className="text-[11px] text-gray-400">Granularità: {ts.granularity}</span>}
        </div>
        <Timeseries data={ts} loading={loading} />
      </div>

      {/* Top lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_DIMENSIONS.map((d) => (
          <TopList key={d.dim} title={d.title} data={tops[d.dim] ?? null} loading={loading} />
        ))}
      </div>
    </div>
  );
}
