import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getOverview } from "@/lib/analytics/queries";
import { periodFromPreset } from "@/lib/analytics/periods";
import type { PeriodPreset } from "@/lib/analytics/types";

const VALID_PRESETS: PeriodPreset[] = ["today", "yesterday", "last24h", "last7d", "last14d", "last30d", "custom"];

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
  const since = url.searchParams.get("since") ?? undefined;
  const until = url.searchParams.get("until") ?? undefined;

  const period = periodFromPreset(preset, since, until);

  try {
    const result = await getOverview(period);
    return NextResponse.json(result);
  } catch (err) {
    const code = (err as { code?: string })?.code;
    const status =
      code === "unauthorized" ? 502 :
      code === "not_found" ? 502 :
      code === "rate_limited" ? 429 : 500;
    return NextResponse.json({ error: "analytics_failed", code: code ?? "unknown" }, { status });
  }
}
