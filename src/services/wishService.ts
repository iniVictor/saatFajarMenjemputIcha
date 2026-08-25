import { initialWishes } from "@/data/mock";
import type { AttendanceStats, Wish } from "@/types/wedding";

const STORAGE_KEY = "wedding-wishes-v2";

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

function readStored(): Wish[] | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(isWish);
  } catch {
    return null;
  }
}

function isWish(value: unknown): value is Wish {
  if (!value || typeof value !== "object") return false;
  const item = value as Wish;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.message === "string" &&
    (item.attendance === "attending" || item.attendance === "not_attending") &&
    typeof item.createdAt === "string"
  );
}

function persist(wishes: Wish[]): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    /* private mode / quota */
  }
}

export function getWishes(): Wish[] {
  return readStored() ?? [...initialWishes];
}

export function submitWish(input: {
  name: string;
  message: string;
  attendance: Wish["attendance"];
}): Wish {
  const wish: Wish = {
    id: `wish-${Date.now()}`,
    name: input.name.trim(),
    message: input.message.trim(),
    attendance: input.attendance,
    createdAt: new Date().toISOString(),
  };
  const next = [wish, ...getWishes()];
  persist(next);
  return wish;
}

export function getAttendanceStats(wishes: Wish[] = getWishes()): AttendanceStats {
  return wishes.reduce<AttendanceStats>(
    (acc, wish) => {
      if (wish.attendance === "attending") acc.attending += 1;
      else acc.notAttending += 1;
      return acc;
    },
    { attending: 0, notAttending: 0 },
  );
}

export const wishService = {
  getWishes,
  submitWish,
  getAttendanceStats,
};
