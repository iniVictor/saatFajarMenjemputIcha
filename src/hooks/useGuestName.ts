import { useEffect, useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { lookupGuest } from "@/services/guestService";
import { readGuestToken } from "@/utils/inviteLink";
import { sanitizeGuestName } from "@/utils/sanitize";

export interface GuestInviteState {
  guestName: string;
  blocked: boolean;
  loading: boolean;
}

export function useGuestName(): GuestInviteState {
  const fallback = weddingConfig.copy.defaultGuest;
  const [state, setState] = useState<GuestInviteState>({
    guestName: fallback,
    blocked: true,
    loading: true,
  });

  useEffect(() => {
    const token = readGuestToken();
    let cancelled = false;

    if (!token) {
      setState({ guestName: fallback, blocked: true, loading: false });
      return;
    }

    setState({ guestName: fallback, blocked: true, loading: true });

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
