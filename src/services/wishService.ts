import type { AttendanceStats, Wish } from "@/types/wedding";

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

async function readError(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "error" in data) {
      const error = (data as { error: unknown }).error;
      if (typeof error === "string" && error.trim()) return error;
    }
  } catch {
    /* ignore */
  }
  return "Gagal terhubung ke database ucapan.";
}

export async function getWishes(): Promise<Wish[]> {
  const response = await fetch("/api/wishes");
  if (!response.ok) throw new Error(await readError(response));
  const data: unknown = await response.json();
  if (!Array.isArray(data)) return [];
  return data.filter(isWish);
}

export async function submitWish(input: {
  name: string;
  message: string;
  attendance: Wish["attendance"];
}): Promise<Wish> {
  const response = await fetch("/api/wishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await readError(response));
  const data: unknown = await response.json();
  if (!isWish(data)) throw new Error("Gagal menyimpan ucapan.");
  return data;
}

export function getAttendanceStats(wishes: Wish[]): AttendanceStats {
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
