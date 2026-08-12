/**
 * Delta / percent helpers. Handles the "previous is zero" case explicitly:
 * returns null so the UI can render "Nuovo" instead of Infinity.
 */
export function delta(current: number, previous: number): number {
  return current - previous;
}

export function deltaPercent(current: number, previous: number): number | null {
  if (previous === 0) {
    if (current === 0) return 0;
    return null; // caller renders "Nuovo"
  }
  return ((current - previous) / previous) * 100;
}

export function share(value: number, total: number): number {
  if (total <= 0) return 0;
  return (value / total) * 100;
}
