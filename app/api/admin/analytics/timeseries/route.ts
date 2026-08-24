import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getTimeseries } from "@/lib/analytics/queries";
import { periodFromPreset } from "@/lib/analytics/periods";
import type { Granularity, PeriodPreset } from "@/lib/analytics/types";

const VALID_PRESETS: PeriodPreset[] = ["today", "yesterday", "last24h", "last7d", "last14d", "last30d", "custom"];
const VALID_GRAN: Granularity[] = ["hour", "day", "week", "month"];

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
  const gRaw = url.searchParams.get("granularity");
  const granularity = gRaw && (VALID_GRAN as string[]).includes(gRaw) ? (gRaw as Granularity) : undefined;
  const since = url.searchParams.get("since") ?? undefined;
  const until = url.searchParams.get("until") ?? undefined;

  const period = periodFromPreset(preset, since, until);

  try {
    const result = await getTimeseries(period, granularity);
    return NextResponse.json(result);
  } catch (err) {
    const code = (err as { code?: string })?.code ?? "unknown";
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[analytics/timeseries]", message);
    return NextResponse.json({ error: "analytics_failed", code, message }, { status: 500 });
  }
}
