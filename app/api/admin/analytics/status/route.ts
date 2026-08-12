import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { authSnapshot, countPageviews, isConfigured } from "@/lib/analytics/vercel-client";
import type { AnalyticsStatus } from "@/lib/analytics/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const snap = authSnapshot();
  if (!isConfigured()) {
    const status: AnalyticsStatus = {
      configured: false,
      plan: "hobby",
      retentionDays: 30,
      projectIdConfigured: snap.projectIdConfigured,
      teamIdConfigured: snap.teamIdConfigured,
      tokenPresent: snap.tokenPresent,
      connection: "not_configured",
      message: "VERCEL_ACCESS_TOKEN o VERCEL_PROJECT_ID mancanti.",
    };
    return NextResponse.json(status);
  }

  // Try a minimal call over the last hour to verify the token + project id.
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  try {
    await countPageviews({ since: oneHourAgo.toISOString(), until: now.toISOString() });
    const status: AnalyticsStatus = {
      configured: true,
      plan: "hobby",
      retentionDays: 30,
      projectIdConfigured: snap.projectIdConfigured,
      teamIdConfigured: snap.teamIdConfigured,
      tokenPresent: snap.tokenPresent,
      connection: "ok",
      reachableAt: new Date().toISOString(),
    };
    return NextResponse.json(status);
  } catch (err) {
    const code =
      (err as { code?: string })?.code === "unauthorized" ? "unauthorized" :
      (err as { code?: string })?.code === "not_found" ? "not_found" : "unknown";
    const status: AnalyticsStatus = {
      configured: true,
      plan: "hobby",
      retentionDays: 30,
      projectIdConfigured: snap.projectIdConfigured,
      teamIdConfigured: snap.teamIdConfigured,
      tokenPresent: snap.tokenPresent,
      connection: code,
      message: code === "unauthorized"
        ? "Token non autorizzato o senza permessi Analytics per questo progetto."
        : code === "not_found"
        ? "Project ID non trovato o Analytics non abilitato per il progetto."
        : "Errore durante l'interrogazione dell'API Vercel.",
    };
    return NextResponse.json(status);
  }
}
