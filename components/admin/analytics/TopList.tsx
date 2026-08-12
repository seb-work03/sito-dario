"use client";

import { formatInt } from "@/lib/analytics/format";
import type { BreakdownResult } from "@/lib/analytics/types";
import { labelForBreakdown } from "@/lib/analytics/format";

export function TopList({
  title,
  data,
  loading,
  emptyLabel = "Nessun dato",
}: {
  title: string;
  data: BreakdownResult | null;
  loading: boolean;
  emptyLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 flex flex-col gap-4 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 rounded bg-gray-50 animate-pulse" />
          ))}
        </div>
      ) : !data || data.rows.length === 0 ? (
        <p className="text-xs text-gray-400 py-4 text-center">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {data.rows.slice(0, 5).map((r) => {
            const label = labelForBreakdown(data.dimension, r.key, r.label);
            const pct = Math.max(0, Math.min(100, r.sharePageviews));
            return (
              <li key={r.key || label} className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-gray-700 truncate min-w-0 flex-1" title={label}>{label}</span>
                  <span className="tabular-nums text-gray-900 font-medium shrink-0">{formatInt(r.pageviews)}</span>
                </div>
                <div className="h-1.5 rounded bg-gray-100 overflow-hidden">
                  <div className="h-full bg-gray-900" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
          {data.hasOthers && (
            <li className="text-[10px] text-gray-400 italic mt-1">Include voce &quot;Altri&quot;</li>
          )}
        </ul>
      )}
    </div>
  );
}
