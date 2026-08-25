import { getMongoClient, getWishesDb } from "./mongodb.js";

const COLLECTION = "wishes";
const MAX_NAME = 80;
const MAX_MESSAGE = 500;

function stripUnsafeText(raw, maxLength) {
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

function isAttendance(value) {
  return value === "attending" || value === "not_attending";
}

function toWish(doc) {
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

export async function listWishes() {
  await getMongoClient().connect();
  const docs = await wishes().find({}).sort({ createdAt: -1 }).limit(200).toArray();
  return docs.map(toWish).filter(Boolean);
}

export async function createWish(input) {
  if (!input || typeof input !== "object") {
    return { ok: false, status: 400, error: "Data ucapan tidak valid." };
  }

  const name = typeof input.name === "string" ? stripUnsafeText(input.name, MAX_NAME) : "";
  const message =
    typeof input.message === "string" ? stripUnsafeText(input.message, MAX_MESSAGE) : "";

  if (name.length < 2) {
    return { ok: false, status: 400, error: "Mohon isi nama Anda." };
  }
  if (message.length < 3) {
    return { ok: false, status: 400, error: "Mohon tulis ucapan Anda." };
  }
  if (!isAttendance(input.attendance)) {
    return { ok: false, status: 400, error: "Pilihan kehadiran tidak valid." };
  }

  const createdAt = new Date();
  await getMongoClient().connect();
  const result = await wishes().insertOne({
    name,
    message,
    attendance: input.attendance,
    createdAt,
  });

  return {
    ok: true,
    wish: {
      id: result.insertedId.toString(),
      name,
      message,
      attendance: input.attendance,
      createdAt: createdAt.toISOString(),
    },
  };
}
