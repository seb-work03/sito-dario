"use client";

import type { PeriodPreset } from "@/lib/analytics/types";

const PRESETS: { value: PeriodPreset; label: string }[] = [
  { value: "today", label: "Oggi" },
  { value: "yesterday", label: "Ieri" },
  { value: "last24h", label: "Ultime 24h" },
  { value: "last7d", label: "Ultimi 7 giorni" },
  { value: "last14d", label: "Ultimi 14 giorni" },
  { value: "last30d", label: "Ultimi 30 giorni" },
];

export function PeriodSelector({
  value,
  onChange,
}: {
  value: PeriodPreset;
  onChange: (v: PeriodPreset) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PRESETS.map((p) => {
        const active = p.value === value;
        return (
          <button
            key={p.value}
            type="button"
            onClick={() => onChange(p.value)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
