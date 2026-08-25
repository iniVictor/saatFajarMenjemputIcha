const MAX_GUEST_LENGTH = 80;

export function sanitizeGuestName(raw: string, fallback: string): string {
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    decoded = raw.replace(/\+/g, " ");
  }

  const cleaned = decoded
    .replace(/<[^>]*>/g, "")
    .replace(/[<>{}[\]\\]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_GUEST_LENGTH);

  return cleaned || fallback;
}
