import "server-only";

type Entry<T> = { value: T; expiresAt: number };
const store = new Map<string, Entry<unknown>>();

export async function withCache<T>(key: string, ttlSeconds: number, load: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expiresAt > now) return hit.value;

  const value = await load();
  store.set(key, { value, expiresAt: now + ttlSeconds * 1000 });
  return value;
}

export function invalidateAll() {
  store.clear();
}
