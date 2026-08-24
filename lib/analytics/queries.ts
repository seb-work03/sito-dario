import "server-only";
import { aggregatePageviews, countPageviews, isConfigured } from "./vercel-client";
import { normalizeBreakdown, normalizeCount, normalizeTimeseries } from "./normalizer";
import type {
  AnalyticsMetrics,
  BreakdownResult,
  Dimension,
  Granularity,
  OverviewResult,
  Period,
  TimeseriesResult,
} from "./types";
import { autoGranularity, comparisonAvailable, previousPeriod } from "./periods";
import { withCache } from "./cache";

function isoRange(p: Period) {
  return { since: p.since.toISOString(), until: p.until.toISOString() };
}

export async function getMetrics(period: Period): Promise<AnalyticsMetrics> {
  const { since, until } = isoRange(period);
  const key = `count:${since}:${until}`;
  return withCache(key, 5 * 60, async () => {
    const raw = await countPageviews({ since, until });
    return normalizeCount(raw);
  });
}

export async function getTimeseries(period: Period, granularity?: Granularity): Promise<TimeseriesResult> {
  const g = granularity ?? autoGranularity(period);
  const { since, until } = isoRange(period);
  const key = `ts:${since}:${until}:${g}`;

  const current = await withCache(key, 5 * 60, async () => {
    // Vercel's aggregate endpoint requires `by`: pass the granularity value
    // ("hour" | "day" | "week" | "month") to get time-bucketed results.
    const raw = await aggregatePageviews({ since, until, by: g });
    return normalizeTimeseries(raw, g);
  });

  if (!comparisonAvailable(period)) return current;

  const prev = previousPeriod(period);
  const prevKey = `ts:${prev.since.toISOString()}:${prev.until.toISOString()}:${g}`;
  const previous = await withCache(prevKey, 5 * 60, async () => {
    const raw = await aggregatePageviews({
      since: prev.since.toISOString(),
      until: prev.until.toISOString(),
      by: g,
    });
    return normalizeTimeseries(raw, g);
  });

  return { ...current, previousPoints: previous.points };
}

export async function getBreakdown(period: Period, dimension: Dimension, limit = 10): Promise<BreakdownResult> {
  const { since, until } = isoRange(period);
  const key = `bd:${since}:${until}:${dimension}:${limit}`;
  return withCache(key, 10 * 60, async () => {
    const raw = await aggregatePageviews({ since, until, by: dimension, limit });
    return normalizeBreakdown(raw, dimension);
  });
}

/**
 * Aggregates everything the Overview page needs in one call so the UI does a
 * single fetch. Failures in individual sub-queries return zeros/empty
 * rather than crashing the whole request.
 */
export async function getOverview(period: Period): Promise<OverviewResult> {
  const canCompare = comparisonAvailable(period);
  const [current, previous, topPages] = await Promise.all([
    getMetrics(period).catch(() => ({ pageviews: 0, visitors: 0 })),
    canCompare
      ? getMetrics(previousPeriod(period)).catch(() => undefined)
      : Promise.resolve(undefined),
    getBreakdown(period, "requestPath", 1).catch(() => ({
      dimension: "requestPath" as Dimension,
      rows: [],
      hasOthers: false,
      updatedAt: new Date().toISOString(),
    })),
  ]);

  return {
    period: {
      sinceIso: period.since.toISOString(),
      untilIso: period.until.toISOString(),
      preset: period.preset,
    },
    comparisonAvailable: canCompare,
    current,
    previous,
    topPage: topPages.rows[0] ?? null,
    totalPageviewsForShare: current.pageviews,
    updatedAt: new Date().toISOString(),
  };
}

export function isAnalyticsConfigured() {
  return isConfigured();
}
