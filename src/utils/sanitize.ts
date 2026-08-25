const MAX_GUEST_LENGTH = 80;

function stripUnsafeText(raw: string, maxLength: number): string {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[<>{}[\]\\]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeGuestName(raw: string, fallback: string): string {
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    decoded = raw.replace(/\+/g, " ");
  }

  return stripUnsafeText(decoded, MAX_GUEST_LENGTH) || fallback;
}
