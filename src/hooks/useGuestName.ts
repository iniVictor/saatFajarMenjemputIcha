import { useMemo } from "react";
import { weddingConfig } from "@/config/wedding";
import { sanitizeGuestName } from "@/utils/sanitize";

function readQueryParam(): string {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("to") ?? "";
  } catch {
    return "";
  }
}

export function useGuestName(): string {
  const fallback = weddingConfig.copy.defaultGuest;

  return useMemo(() => {
    const raw = readQueryParam();
    return sanitizeGuestName(raw, fallback);
  }, [fallback]);
}
