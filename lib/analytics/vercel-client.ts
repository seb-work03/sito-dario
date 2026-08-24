import "server-only";
import type { Dimension, Granularity } from "./types";

const BASE = "https://api.vercel.com";

export interface VercelAuth {
  token: string;
  projectId: string;
  teamId?: string;
}

export interface VercelClientError extends Error {
  status?: number;
  code?: "unauthorized" | "not_found" | "rate_limited" | "server" | "other";
}

function getAuth(): VercelAuth | null {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID || undefined;
  if (!token || !projectId) return null;
  return { token, projectId, teamId };
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    usp.set(k, String(v));
  }
  return usp.toString();
}

async function callApi(path: string, params: Record<string, string | number | undefined>): Promise<unknown> {
  const auth = getAuth();
  if (!auth) {
    const err = new Error("VERCEL_ACCESS_TOKEN or VERCEL_PROJECT_ID not configured") as VercelClientError;
    err.code = "other";
    throw err;
  }

  const merged = { ...params, projectId: auth.projectId, teamId: auth.teamId };
  const url = `${BASE}${path}?${buildQuery(merged)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${auth.token}`, Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
      // Trim to avoid dumping huge HTML error pages
      if (body.length > 500) body = body.slice(0, 500) + "…";
    } catch {}
    const err = new Error(`Vercel API ${res.status} ${res.statusText}${body ? ` — ${body}` : ""}`) as VercelClientError;
    err.status = res.status;
    err.code =
      res.status === 401 || res.status === 403 ? "unauthorized" :
      res.status === 404 ? "not_found" :
      res.status === 429 ? "rate_limited" :
      res.status >= 500 ? "server" : "other";
    throw err;
  }

  return res.json();
}

export function isConfigured(): boolean {
  return getAuth() !== null;
}

export function authSnapshot() {
  const a = getAuth();
  return {
    projectIdConfigured: !!a?.projectId,
    teamIdConfigured: !!a?.teamId,
    tokenPresent: !!a?.token,
  };
}

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

export interface CountParams {
  since: string; // ISO
  until: string; // ISO
  environment?: "production" | "preview";
  filter?: string; // OData
}

/** GET /v1/query/web-analytics/visits/count */
export async function countPageviews(p: CountParams): Promise<unknown> {
  return callApi("/v1/query/web-analytics/visits/count", {
    since: p.since,
    until: p.until,
    environment: p.environment,
    filter: p.filter,
  });
}

export interface AggregateParams {
  since: string;
  until: string;
  /**
   * `by` is required. For time series pass a granularity value ("hour",
   * "day", "week", "month"); for breakdowns pass a Dimension.
   */
  by: Dimension | Granularity;
  limit?: number;
  environment?: "production" | "preview";
  filter?: string;
}

/** GET /v1/query/web-analytics/visits/aggregate */
export async function aggregatePageviews(p: AggregateParams): Promise<unknown> {
  return callApi("/v1/query/web-analytics/visits/aggregate", {
    since: p.since,
    until: p.until,
    by: p.by,
    limit: p.limit,
    environment: p.environment,
    filter: p.filter,
  });
}
