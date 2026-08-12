"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { TimeseriesResult } from "@/lib/analytics/types";

function formatX(ts: string, granularity: string): string {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  if (granularity === "hour") return d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  if (granularity === "week" || granularity === "month") {
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
  }
  return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
}

export function Timeseries({ data, loading }: { data: TimeseriesResult | null; loading: boolean }) {
  if (loading) {
    return <div className="h-72 w-full rounded-lg bg-gray-50 animate-pulse" />;
  }
  if (!data || data.points.length === 0) {
    return (
      <div className="h-72 w-full rounded-lg border border-gray-200 flex items-center justify-center text-sm text-gray-400">
        Nessun dato per il periodo selezionato.
      </div>
    );
  }

  const merged = data.points.map((p, i) => ({
    x: formatX(p.timestamp, data.granularity),
    pageviews: p.pageviews,
    visitors: p.visitors,
    previous: data.previousPoints?.[i]?.pageviews ?? undefined,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={merged} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="vsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="x" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 6 }}
            labelStyle={{ fontWeight: 600, color: "#111827" }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="pageviews" name="Visualizzazioni" stroke="#0ea5e9" strokeWidth={2} fill="url(#pvGrad)" />
          <Area type="monotone" dataKey="visitors" name="Visitatori" stroke="#10b981" strokeWidth={2} fill="url(#vsGrad)" />
          {data.previousPoints && (
            <Area type="monotone" dataKey="previous" name="Precedente (visualizzazioni)" stroke="#9ca3af" strokeDasharray="4 3" strokeWidth={1.5} fill="none" />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
