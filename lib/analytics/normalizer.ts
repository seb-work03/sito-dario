import type {
  AnalyticsMetrics,
  BreakdownResult,
  BreakdownRow,
  Dimension,
  Granularity,
  TimeseriesPoint,
  TimeseriesResult,
} from "./types";

/**
 * The Vercel Web Analytics API is documented but the exact shape is not
 * stable across versions. These helpers defensively extract numbers and
 * rows from whatever the endpoint returns, so a small upstream rename does
 * not crash the UI.
 */

type UnknownRec = Record<string, unknown>;

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

function pickNumber(obj: unknown, keys: string[]): number {
  if (!obj || typeof obj !== "object") return 0;
  const rec = obj as UnknownRec;
  for (const k of keys) {
    if (k in rec) {
      const v = rec[k];
      if (typeof v === "number") return v;
      if (typeof v === "string" && v.trim() !== "") return num(v);
    }
  }
  return 0;
}

function pickRows(obj: unknown): unknown[] {
  if (!obj || typeof obj !== "object") return [];
  const rec = obj as UnknownRec;
  const candidates = ["rows", "data", "results", "items"];
  for (const key of candidates) {
    const val = rec[key];
    if (Array.isArray(val)) return val;
  }
  return [];
}

export function normalizeCount(raw: unknown): AnalyticsMetrics {
  // Common shapes: { pageviews, visitors } | { total, visitors } | { data: {...} }
  const root: unknown = raw && typeof raw === "object" && "data" in (raw as UnknownRec) && typeof (raw as UnknownRec).data === "object"
    ? (raw as UnknownRec).data
    : raw;
  return {
    pageviews: pickNumber(root, ["pageviews", "totalPageviews", "views", "total", "count"]),
    visitors: pickNumber(root, ["visitors", "totalVisitors", "uniqueVisitors", "uniques"]),
  };
}

export function normalizeBreakdown(raw: unknown, dimension: Dimension): BreakdownResult {
  const rows = pickRows(raw).map((r) => normalizeBreakdownRow(r, dimension));
  const total = rows.reduce((s, r) => s + r.pageviews, 0);
  const withShare = rows.map((r) => ({
    ...r,
    sharePageviews: total > 0 ? (r.pageviews / total) * 100 : 0,
  }));
  return {
    dimension,
    rows: withShare,
    hasOthers: withShare.some((r) => r.key === "__others__" || r.label.toLowerCase() === "others"),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeBreakdownRow(row: unknown, dimension: Dimension): BreakdownRow {
  if (!row || typeof row !== "object") {
    return { key: "", label: "", pageviews: 0, visitors: 0, sharePageviews: 0 };
  }
  const rec = row as UnknownRec;
  const rawKey =
    rec[dimension] ??
    rec.dimensionValue ??
    rec.value ??
    rec.key ??
    rec.name ??
    "";
  const key = String(rawKey ?? "");
  const isOthers = key === "__others__" || key.toLowerCase() === "others";
  return {
    key: isOthers ? "__others__" : key,
    label: isOthers ? "Altri" : (key || "(sconosciuto)"),
    pageviews: pickNumber(row, ["pageviews", "views", "total", "count"]),
    visitors: pickNumber(row, ["visitors", "uniqueVisitors", "uniques"]),
    sharePageviews: 0,
  };
}

export function normalizeTimeseries(raw: unknown, granularity: Granularity): TimeseriesResult {
  const points: TimeseriesPoint[] = pickRows(raw).map((r) => {
    if (!r || typeof r !== "object") return { timestamp: "", pageviews: 0, visitors: 0 };
    const rec = r as UnknownRec;
    const ts = rec.timestamp ?? rec.time ?? rec.date ?? rec.bucket ?? "";
    return {
      timestamp: typeof ts === "string" ? ts : new Date(num(ts)).toISOString(),
      pageviews: pickNumber(r, ["pageviews", "views", "total", "count"]),
      visitors: pickNumber(r, ["visitors", "uniqueVisitors", "uniques"]),
    };
  });
  return { granularity, points, updatedAt: new Date().toISOString() };
}
