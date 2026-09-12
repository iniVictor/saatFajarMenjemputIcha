export interface GuestRecord {
  token?: string;
  name: string;
}

const GUEST_CACHE_PREFIX = "invitation-guest:";

declare global {
  interface Window {
    __GUEST_LOOKUP_TOKEN__?: string;
    __GUEST_LOOKUP__?: Promise<unknown> | null;
  }
}

function cacheKey(token: string): string {
  return `${GUEST_CACHE_PREFIX}${token}`;
}

export function readCachedGuest(token: string): string | null {
  try {
    const name = sessionStorage.getItem(cacheKey(token))?.trim() ?? "";
    return name || null;
  } catch {
    return null;
  }
}

export function writeCachedGuest(token: string, name: string): void {
  try {
    sessionStorage.setItem(cacheKey(token), name);
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearCachedGuest(token: string): void {
  try {
    sessionStorage.removeItem(cacheKey(token));
  } catch {
    /* ignore */
  }
}

function readGuestName(data: unknown): string | null {
  if (!data || typeof data !== "object" || typeof (data as GuestRecord).name !== "string") {
    return null;
  }
  return (data as GuestRecord).name.trim() || null;
}

async function readError(response: Response, fallback: string): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "error" in data) {
      const error = (data as { error: unknown }).error;
      if (typeof error === "string" && error.trim()) return error;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

async function fetchGuest(token: string): Promise<string | null> {
  const pending =
    typeof window !== "undefined" && window.__GUEST_LOOKUP_TOKEN__ === token
      ? window.__GUEST_LOOKUP__
      : null;

  if (pending) {
    window.__GUEST_LOOKUP__ = null;
    return readGuestName(await pending);
  }

  const response = await fetch(`/api/guests?g=${encodeURIComponent(token)}`, {
    headers: { Accept: "application/json" },
    priority: "high",
  } as RequestInit);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await readError(response, "Gagal memuat data tamu."));
  return readGuestName(await response.json());
}

export async function lookupGuest(token: string): Promise<string | null> {
  const cached = readCachedGuest(token);
  if (cached) return cached;

  const name = await fetchGuest(token);
  if (name) writeCachedGuest(token, name);
  else clearCachedGuest(token);
  return name;
}

export async function createGuest(name: string): Promise<{ token: string; name: string }> {
  let response: Response;
  try {
    response = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    throw new Error("Gagal menyimpan nama tamu. Coba generate lagi.");
  }
  if (!response.ok) throw new Error(await readError(response, "Gagal menyimpan nama tamu."));

  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    typeof (data as GuestRecord).token !== "string" ||
    typeof (data as GuestRecord).name !== "string"
  ) {
    throw new Error("Gagal menyimpan nama tamu.");
  }

  const guest = {
    token: (data as GuestRecord).token as string,
    name: (data as GuestRecord).name,
  };
  writeCachedGuest(guest.token, guest.name);
  return guest;
}

export const guestService = {
  lookupGuest,
  createGuest,
};
