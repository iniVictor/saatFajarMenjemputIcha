import { getMongoClient, getWishesDb } from "./mongodb";

type Attendance = "attending" | "not_attending";

interface Wish {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  createdAt: string;
}

const COLLECTION = "wishes";
const MAX_NAME = 80;
const MAX_MESSAGE = 500;

function stripUnsafeText(raw: string, maxLength: number): string {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[<>{}[\]\\]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function wishes() {
  return getWishesDb().collection(COLLECTION);
}

function isAttendance(value: unknown): value is Attendance {
  return value === "attending" || value === "not_attending";
}

function toWish(doc: {
  _id?: { toString(): string };
  name?: unknown;
  message?: unknown;
  attendance?: unknown;
  createdAt?: unknown;
}): Wish | null {
  if (
    typeof doc.name !== "string" ||
    typeof doc.message !== "string" ||
    !isAttendance(doc.attendance)
  ) {
    return null;
  }

  const createdAt =
    doc.createdAt instanceof Date
      ? doc.createdAt.toISOString()
      : typeof doc.createdAt === "string"
        ? doc.createdAt
        : new Date().toISOString();

  return {
    id: doc._id?.toString() ?? `wish-${createdAt}`,
    name: doc.name,
    message: doc.message,
    attendance: doc.attendance,
    createdAt,
  };
}

export async function listWishes(): Promise<Wish[]> {
  await getMongoClient().connect();
  const docs = await wishes()
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return docs.map(toWish).filter((wish): wish is Wish => wish !== null);
}

export async function createWish(input: unknown): Promise<
  | { ok: true; wish: Wish }
  | { ok: false; status: number; error: string }
> {
  if (!input || typeof input !== "object") {
    return { ok: false, status: 400, error: "Data ucapan tidak valid." };
  }

  const body = input as { name?: unknown; message?: unknown; attendance?: unknown };
  const name = typeof body.name === "string" ? stripUnsafeText(body.name, MAX_NAME) : "";
  const message =
    typeof body.message === "string" ? stripUnsafeText(body.message, MAX_MESSAGE) : "";

  if (name.length < 2) {
    return { ok: false, status: 400, error: "Mohon isi nama Anda." };
  }
  if (message.length < 3) {
    return { ok: false, status: 400, error: "Mohon tulis ucapan Anda." };
  }
  if (!isAttendance(body.attendance)) {
    return { ok: false, status: 400, error: "Pilihan kehadiran tidak valid." };
  }

  const createdAt = new Date();
  await getMongoClient().connect();
  const result = await wishes().insertOne({
    name,
    message,
    attendance: body.attendance,
    createdAt,
  });

  return {
    ok: true,
    wish: {
      id: result.insertedId.toString(),
      name,
      message,
      attendance: body.attendance,
      createdAt: createdAt.toISOString(),
    },
  };
}
