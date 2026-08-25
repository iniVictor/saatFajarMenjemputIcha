const KIRIM_UNDANGAN_PATH = "/kirimUndangan";

export function isKirimUndanganPath(pathname = window.location.pathname): boolean {
  return pathname.replace(/\/+$/, "") === KIRIM_UNDANGAN_PATH;
}

export function buildGuestInviteUrl(name: string, origin = window.location.origin): string {
  const trimmed = name.replace(/\s+/g, " ").trim();
  if (!trimmed) return "";
  return `${origin}/?to=${encodeURIComponent(trimmed)}`;
}
