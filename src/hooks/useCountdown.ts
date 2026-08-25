import { useEffect, useMemo, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  isValid: boolean;
  totalMs: number;
}

function empty(isValid: boolean, isComplete = false): CountdownValue {
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete,
    isValid,
    totalMs: 0,
  };
}

function compute(target: number, now: number): CountdownValue {
  const totalMs = target - now;
  if (totalMs <= 0) return empty(true, true);

  const days = Math.floor(totalMs / 86_400_000);
  const hours = Math.floor((totalMs / 3_600_000) % 24);
  const minutes = Math.floor((totalMs / 60_000) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: false,
    isValid: true,
    totalMs,
  };
}

export function useCountdown(isoDate: string): CountdownValue {
  const target = useMemo(() => {
    const parsed = new Date(isoDate).getTime();
    return Number.isNaN(parsed) ? null : parsed;
  }, [isoDate]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (target === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (target === null) return empty(false);
  return compute(target, now);
}
