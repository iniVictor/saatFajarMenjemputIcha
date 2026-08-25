import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ToastContextValue {
  message: string | null;
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((next: string) => {
    setMessage(next);
    window.setTimeout(() => {
      setMessage((current) => (current === next ? null : current));
    }, 2200);
  }, []);

  const value = useMemo(() => ({ message, showToast }), [message, showToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      message: null,
      showToast: () => {},
    };
  }
  return ctx;
}
