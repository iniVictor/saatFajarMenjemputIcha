export interface GuestRecord {
  token?: string;
  name: string;
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

export async function lookupGuest(token: string): Promise<string | null> {
  const response = await fetch(`/api/guests?g=${encodeURIComponent(token)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await readError(response, "Gagal memuat data tamu."));

  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || typeof (data as GuestRecord).name !== "string") {
    return null;
  }

  const name = (data as GuestRecord).name.trim();
  return name || null;
}

export async function createGuest(name: string): Promise<{ token: string; name: string }> {
  const response = await fetch("/api/guests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
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

  return {
    token: (data as GuestRecord).token as string,
    name: (data as GuestRecord).name,
  };
}

export const guestService = {
  lookupGuest,
  createGuest,
};
