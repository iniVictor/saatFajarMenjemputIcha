import { useCallback, useState } from "react";

const SESSION_KEY = "invitation-opened";

function readOpened(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function useInvitationOpen() {
  const [opened, setOpened] = useState(readOpened);
  const [coverVisible, setCoverVisible] = useState(() => !readOpened());

  const open = useCallback(() => {
    setOpened(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setCoverVisible(false), 900);
  }, []);

  return { opened, coverVisible, open };
}
