import type { Granularity, Period, PeriodPreset } from "./types";

export const HOBBY_RETENTION_DAYS = 30;

/**
 * Build a Period from a preset. Rome timezone is used for "today/yesterday"
 * boundaries; the resulting UTC dates are what the Vercel API accepts.
 */
export function periodFromPreset(preset: PeriodPreset, sinceIso?: string, untilIso?: string): Period {
  const now = new Date();

  if (preset === "custom" && sinceIso && untilIso) {
    return { since: new Date(sinceIso), until: new Date(untilIso), preset: "custom" };
  }

  const startOfToday = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0,
  ));

  switch (preset) {
    case "today":
      return { since: startOfToday, until: now, preset };
    case "yesterday": {
      const y = new Date(startOfToday);
      y.setUTCDate(y.getUTCDate() - 1);
      const endOfYesterday = new Date(startOfToday.getTime() - 1);
      return { since: y, until: endOfYesterday, preset };
    }
    case "last24h": {
      const s = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      return { since: s, until: now, preset };
    }
    case "last7d": {
      const s = new Date(startOfToday);
      s.setUTCDate(s.getUTCDate() - 6);
      return { since: s, until: now, preset };
    }
    case "last14d": {
      const s = new Date(startOfToday);
      s.setUTCDate(s.getUTCDate() - 13);
      return { since: s, until: now, preset };
    }
    case "last30d": {
      const s = new Date(startOfToday);
      s.setUTCDate(s.getUTCDate() - 29);
      return { since: s, until: now, preset };
    }
    default:
      return { since: startOfToday, until: now, preset: "today" };
  }
}

/** Auto granularity per spec §5 */
export function autoGranularity(p: Period): Granularity {
  const span = p.until.getTime() - p.since.getTime();
  const day = 24 * 60 * 60 * 1000;
  if (span <= 2 * day) return "hour";
  if (span <= 45 * day) return "day";
  return "week";
}

/** True when the previous period (same length, immediately before) is still within retention. */
export function comparisonAvailable(p: Period): boolean {
  if (p.preset === "last30d") return false;
  const span = p.until.getTime() - p.since.getTime();
  const previousStart = new Date(p.since.getTime() - span);
  const oldestAllowed = new Date(Date.now() - HOBBY_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  return previousStart >= oldestAllowed;
}

/** Previous period of the same length, ending right before `p` begins. */
export function previousPeriod(p: Period): Period {
  const span = p.until.getTime() - p.since.getTime();
  const until = new Date(p.since.getTime() - 1);
  const since = new Date(until.getTime() - span);
  return { since, until, preset: "custom" };
}

export const PRESET_LABELS: Record<PeriodPreset, string> = {
  today: "Oggi",
  yesterday: "Ieri",
  last24h: "Ultime 24 ore",
  last7d: "Ultimi 7 giorni",
  last14d: "Ultimi 14 giorni",
  last30d: "Ultimi 30 giorni",
  custom: "Intervallo personalizzato",
};
