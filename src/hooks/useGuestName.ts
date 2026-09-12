import { useEffect, useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { lookupGuest, readCachedGuest } from "@/services/guestService";
import { readGuestToken } from "@/utils/inviteLink";
import { sanitizeGuestName } from "@/utils/sanitize";

export interface GuestInviteState {
  guestName: string;
  blocked: boolean;
  loading: boolean;
}

function initialGuestState(fallback: string): GuestInviteState {
  if (typeof window === "undefined") {
    return { guestName: fallback, blocked: true, loading: true };
  }

  const token = readGuestToken();
  if (!token) {
    return { guestName: fallback, blocked: true, loading: false };
  }

  const cached = readCachedGuest(token);
  if (cached) {
    return { guestName: sanitizeGuestName(cached, fallback), blocked: false, loading: false };
  }

  return { guestName: fallback, blocked: true, loading: true };
}

export function useGuestName(): GuestInviteState {
  const fallback = weddingConfig.copy.defaultGuest;
  const [state, setState] = useState<GuestInviteState>(() => initialGuestState(fallback));

  useEffect(() => {
    const token = readGuestToken();
    let cancelled = false;

    if (!token) {
      setState({ guestName: fallback, blocked: true, loading: false });
      return;
    }

    const cached = readCachedGuest(token);
    if (cached) {
      setState({
        guestName: sanitizeGuestName(cached, fallback),
        blocked: false,
        loading: false,
      });
      return;
    }

    void lookupGuest(token)
      .then((name) => {
        if (cancelled) return;
        if (!name) {
          setState({ guestName: fallback, blocked: true, loading: false });
          return;
        }
        setState({
          guestName: sanitizeGuestName(name, fallback),
          blocked: false,
          loading: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ guestName: fallback, blocked: true, loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [fallback]);

  return state;
}
