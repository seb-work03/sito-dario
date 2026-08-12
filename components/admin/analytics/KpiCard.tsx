"use client";

import { useState } from "react";
import { formatInt, formatPercent } from "@/lib/analytics/format";
import { deltaPercent } from "@/lib/analytics/comparison";

export function KpiCard({
  label,
  value,
  previous,
  tooltip,
  hint,
  loading,
}: {
  label: string;
  value: number | string | null;
  previous?: number;
  tooltip?: string;
  hint?: string;
  loading?: boolean;
}) {
  const [showTip, setShowTip] = useState(false);
  const pct = typeof value === "number" && typeof previous === "number"
    ? deltaPercent(value, previous)
    : undefined;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 flex flex-col gap-2 min-w-0">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500">
        <span>{label}</span>
        {tooltip && (
          <span
            className="relative inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-[10px] cursor-help"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
          >
            ?
            {showTip && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-md bg-gray-900 text-white text-[11px] font-normal normal-case tracking-normal px-2.5 py-1.5 shadow-lg z-10">
                {tooltip}
              </span>
            )}
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-gray-900 min-h-8">
        {loading ? <span className="inline-block h-7 w-16 rounded bg-gray-100 animate-pulse" /> :
          value === null ? "—" :
          typeof value === "number" ? formatInt(value) : value}
      </div>
      {(pct !== undefined || hint) && (
        <div className="flex items-center gap-2 text-xs">
          {pct !== undefined && (
            <span className={`font-medium ${pct === null ? "text-gray-500" : pct >= 0 ? "text-green-600" : "text-red-600"}`}>
              {pct === null ? "Nuovo" : `${pct >= 0 ? "+" : ""}${formatPercent(pct)}`}
            </span>
          )}
          {hint && <span className="text-gray-400 truncate">{hint}</span>}
        </div>
      )}
    </div>
  );
}
