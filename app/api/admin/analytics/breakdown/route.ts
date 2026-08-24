import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getBreakdown } from "@/lib/analytics/queries";
import { periodFromPreset } from "@/lib/analytics/periods";
import type { Dimension, PeriodPreset } from "@/lib/analytics/types";

const VALID_PRESETS: PeriodPreset[] = ["today", "yesterday", "last24h", "last7d", "last14d", "last30d", "custom"];
const VALID_DIMS: Dimension[] = [
  "country", "deviceType", "environment", "requestPath",
  "referrerHostname", "osName", "browserName", "route", "flags",
];

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const rawPreset = url.searchParams.get("preset") ?? "last7d";
  const preset = (VALID_PRESETS as string[]).includes(rawPreset) ? (rawPreset as PeriodPreset) : "last7d";
  const rawDim = url.searchParams.get("dimension") ?? "";
  if (!(VALID_DIMS as string[]).includes(rawDim)) {
    return NextResponse.json({ error: "invalid_dimension" }, { status: 400 });
  }
  const dimension = rawDim as Dimension;
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "5", 10)));
  const since = url.searchParams.get("since") ?? undefined;
  const until = url.searchParams.get("until") ?? undefined;

  const period = periodFromPreset(preset, since, until);

  try {
    const result = await getBreakdown(period, dimension, limit);
    return NextResponse.json(result);
  } catch (err) {
    const code = (err as { code?: string })?.code ?? "unknown";
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[analytics/breakdown]", dimension, message);
    return NextResponse.json({ error: "analytics_failed", code, message }, { status: 500 });
  }
}
