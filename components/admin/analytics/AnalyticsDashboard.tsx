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

type FetchState<T> = { data: T | null; error: string | null; loading: boolean };
const initial = <T,>(): FetchState<T> => ({ data: null, error: null, loading: true });

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.message ? ` — ${body.message}` : body?.code ? ` (${body.code})` : "";
    } catch {}
    throw new Error(`HTTP ${res.status}${detail}`);
  }
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
  const [status, setStatus] = useState<FetchState<AnalyticsStatus>>(initial());
  const [overview, setOverview] = useState<FetchState<OverviewResult>>(initial());
  const [ts, setTs] = useState<FetchState<TimeseriesResult>>(initial());
  const [tops, setTops] = useState<Record<Dimension, FetchState<BreakdownResult>>>(() =>
    TOP_DIMENSIONS.reduce((acc, d) => ({ ...acc, [d.dim]: initial() }), {} as Record<Dimension, FetchState<BreakdownResult>>)
  );

  const load = useCallback((p: PeriodPreset) => {
    // Status is independent; always fetch it first so we know if the token/project are configured.
    setStatus((s) => ({ ...s, loading: true }));
    fetchJson<AnalyticsStatus>("/api/admin/analytics/status")
      .then((data) => setStatus({ data, error: null, loading: false }))
      .catch((err) => setStatus({ data: null, error: String(err.message ?? err), loading: false }));

    setOverview((s) => ({ ...s, loading: true }));
    fetchJson<OverviewResult>(`/api/admin/analytics/overview?preset=${p}`)
      .then((data) => setOverview({ data, error: null, loading: false }))
      .catch((err) => setOverview({ data: null, error: String(err.message ?? err), loading: false }));

    setTs((s) => ({ ...s, loading: true }));
    fetchJson<TimeseriesResult>(`/api/admin/analytics/timeseries?preset=${p}`)
      .then((data) => setTs({ data, error: null, loading: false }))
      .catch((err) => setTs({ data: null, error: String(err.message ?? err), loading: false }));

    for (const d of TOP_DIMENSIONS) {
      setTops((prev) => ({ ...prev, [d.dim]: { ...prev[d.dim], loading: true } }));
      fetchJson<BreakdownResult>(`/api/admin/analytics/breakdown?preset=${p}&dimension=${d.dim}&limit=5`)
        .then((data) => setTops((prev) => ({ ...prev, [d.dim]: { data, error: null, loading: false } })))
        .catch((err) => setTops((prev) => ({ ...prev, [d.dim]: { data: null, error: String(err.message ?? err), loading: false } })));
    }
  }, []);

  useEffect(() => {
    load(preset);
    const interval = setInterval(() => load(preset), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [preset, load]);

  const ov = overview.data;
  const viewsPerVisitor =
    ov && ov.current.visitors > 0 ? ov.current.pageviews / ov.current.visitors : null;
  const previousViewsPerVisitor =
    ov?.previous && ov.previous.visitors > 0
      ? ov.previous.pageviews / ov.previous.visitors
      : undefined;

  const s = status.data;
  const notConfigured = s && !s.configured;
  const badConnection = s && s.configured && s.connection !== "ok";

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
        <div className="flex items-center gap-3">
          <PeriodSelector value={preset} onChange={setPreset} />
        </div>
      </div>

      {/* Status banners */}
      {notConfigured && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Analytics non configurato. Aggiungi <code className="rounded bg-yellow-100 px-1 text-xs">VERCEL_ACCESS_TOKEN</code> e <code className="rounded bg-yellow-100 px-1 text-xs">VERCEL_PROJECT_ID</code> alle env vars su Vercel e ridistribuisci.
        </div>
      )}
      {badConnection && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="font-medium">Connessione API Vercel: {s?.connection}</div>
          <div className="mt-0.5">{s?.message ?? "Errore sconosciuto."}</div>
        </div>
      )}
      {status.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Errore endpoint /status: {status.error}
        </div>
      )}
      {(overview.error || ts.error) && !notConfigured && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 space-y-1">
          {overview.error && <div>Overview: {overview.error}</div>}
          {ts.error && <div>Andamento: {ts.error}</div>}
        </div>
      )}
      {ov && !ov.comparisonAvailable && (
        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs text-gray-600">
          Confronto non disponibile: il piano Hobby conserva un solo mese di dati.
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Visualizzazioni"
          value={ov?.current.pageviews ?? null}
          previous={ov?.previous?.pageviews}
          loading={overview.loading}
        />
        <KpiCard
          label="Visitatori"
          value={ov?.current.visitors ?? null}
          previous={ov?.previous?.visitors}
          tooltip="I visitatori sono calcolati in forma anonimizzata. Vercel non riconosce lo stesso visitatore tra giorni diversi."
          loading={overview.loading}
        />
        <KpiCard
          label="Views per visitatore"
          value={viewsPerVisitor !== null ? viewsPerVisitor.toFixed(2) : null}
          previous={previousViewsPerVisitor}
          tooltip="Dato calcolato: visualizzazioni ÷ visitatori."
          loading={overview.loading}
        />
        <KpiCard
          label="Pagina principale"
          value={ov?.topPage ? ov.topPage.label : "—"}
          hint={ov?.topPage ? `${ov.topPage.pageviews} visualizzazioni` : undefined}
          loading={overview.loading}
        />
      </div>

      {/* Timeseries */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Andamento</h3>
          {ts.data && <span className="text-[11px] text-gray-400">Granularità: {ts.data.granularity}</span>}
        </div>
        <Timeseries data={ts.data} loading={ts.loading} />
      </div>

      {/* Top lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_DIMENSIONS.map((d) => (
          <TopList
            key={d.dim}
            title={d.title}
            data={tops[d.dim]?.data ?? null}
            loading={tops[d.dim]?.loading ?? false}
            emptyLabel={tops[d.dim]?.error ? `Errore: ${tops[d.dim]!.error}` : "Nessun dato"}
          />
        ))}
      </div>

      {/* Debug status (small) */}
      {s && (
        <div className="rounded-md border border-gray-200 bg-white px-4 py-3 text-[11px] text-gray-500 flex flex-wrap gap-x-6 gap-y-1">
          <span>Piano: {s.plan}</span>
          <span>Retention: {s.retentionDays}g</span>
          <span>Token: {s.tokenPresent ? "✓" : "✗"}</span>
          <span>Project ID: {s.projectIdConfigured ? "✓" : "✗"}</span>
          <span>Team ID: {s.teamIdConfigured ? "✓" : "—"}</span>
          <span>Connessione: {s.connection}</span>
          {s.reachableAt && <span>Ultimo check: {new Date(s.reachableAt).toLocaleTimeString("it-IT")}</span>}
        </div>
      )}
    </div>
  );
}
