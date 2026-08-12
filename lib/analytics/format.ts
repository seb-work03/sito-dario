export const countryName = (() => {
  const cache = new Map<string, string>();
  return (code: string): string => {
    if (!code) return "(sconosciuto)";
    if (cache.has(code)) return cache.get(code)!;
    try {
      const dn = new Intl.DisplayNames(["it"], { type: "region" });
      const name = dn.of(code.toUpperCase()) ?? code;
      cache.set(code, name);
      return name;
    } catch {
      return code;
    }
  };
})();

export function formatInt(n: number): string {
  return new Intl.NumberFormat("it-IT").format(n);
}

export function formatPercent(n: number | null, digits = 1): string {
  if (n === null) return "Nuovo";
  return `${new Intl.NumberFormat("it-IT", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n)}%`;
}

export function labelForBreakdown(dimension: string, key: string, label: string): string {
  if (dimension === "country") return countryName(key);
  if (dimension === "referrerHostname" && (!key || key === "(sconosciuto)")) return "Diretto / non disponibile";
  return label || "(sconosciuto)";
}
