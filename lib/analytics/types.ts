/**
 * Types for the Analytics dashboard. Shared between server modules and UI.
 * Only the shapes we actually consume from Vercel Web Analytics are declared —
 * the raw API response is normalized in `normalizer.ts` before it reaches
 * anything else.
 */

export type Granularity = "hour" | "day" | "week" | "month";

export type Dimension =
  | "country"
  | "deviceType"
  | "environment"
  | "requestPath"
  | "referrerHostname"
  | "osName"
  | "browserName"
  | "route"
  | "flags";

export type PeriodPreset =
  | "today"
  | "yesterday"
  | "last24h"
  | "last7d"
  | "last14d"
  | "last30d"
  | "custom";

export interface Period {
  since: Date;
  until: Date;
  preset: PeriodPreset;
}

export interface AnalyticsMetrics {
  pageviews: number;
  visitors: number;
}

export interface BreakdownRow {
  key: string;
  label: string;
  pageviews: number;
  visitors: number;
  sharePageviews: number;
  previousPageviews?: number;
  previousVisitors?: number;
  deltaPageviews?: number;
  deltaPercentPageviews?: number | null;
}

export interface BreakdownResult {
  dimension: Dimension;
  rows: BreakdownRow[];
  hasOthers: boolean;
  updatedAt: string;
}

export interface TimeseriesPoint {
  timestamp: string; // ISO
  pageviews: number;
  visitors: number;
}

export interface TimeseriesResult {
  granularity: Granularity;
  points: TimeseriesPoint[];
  previousPoints?: TimeseriesPoint[];
  updatedAt: string;
}

export interface OverviewResult {
  period: { sinceIso: string; untilIso: string; preset: PeriodPreset };
  comparisonAvailable: boolean;
  current: AnalyticsMetrics;
  previous?: AnalyticsMetrics;
  topPage: BreakdownRow | null;
  totalPageviewsForShare: number;
  updatedAt: string;
}

export interface AnalyticsStatus {
  configured: boolean;
  plan: "hobby";
  retentionDays: 30;
  projectIdConfigured: boolean;
  teamIdConfigured: boolean;
  tokenPresent: boolean;
  connection: "ok" | "unauthorized" | "not_found" | "unknown" | "not_configured";
  reachableAt?: string;
  message?: string;
}
