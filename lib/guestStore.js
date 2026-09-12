import { randomBytes } from "node:crypto";
import { getMongoClient, getWishesDb } from "./mongodb.js";

const COLLECTION = "guests";
const MAX_NAME = 80;
const TOKEN_BYTES = 18;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,48}$/;

function stripUnsafeText(raw, maxLength) {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[<>{}[\]\\]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function guests() {
  return getWishesDb().collection(COLLECTION);
}

let indexesPromise;

function ensureIndexes() {
  if (!indexesPromise) {
    indexesPromise = guests()
      .createIndex({ token: 1 }, { unique: true })
      .catch((error) => {
        console.error("guestStore index", error);
        indexesPromise = undefined;
      });
  }
  return indexesPromise;
}

export function isGuestToken(value) {
  return typeof value === "string" && TOKEN_PATTERN.test(value.trim());
}

export async function findGuestByToken(token) {
  if (!isGuestToken(token)) return null;

  await getMongoClient().connect();
  const doc = await guests().findOne(
    { token: token.trim() },
    { projection: { name: 1, token: 1 } },
  );
  if (!doc || typeof doc.name !== "string" || !doc.name.trim()) return null;

  return { token: doc.token, name: doc.name };
}

export async function createGuest(input) {
  if (!input || typeof input !== "object") {
    return { ok: false, status: 400, error: "Data tamu tidak valid." };
  }

  const name = typeof input.name === "string" ? stripUnsafeText(input.name, MAX_NAME) : "";
  if (name.length < 2) {
    return { ok: false, status: 400, error: "Mohon isi nama tamu undangan." };
  }

  await getMongoClient().connect();
  void ensureIndexes();

  const existing = await guests().findOne({ name });
  if (existing && typeof existing.token === "string") {
    return { ok: true, guest: { token: existing.token, name } };
  }

  const token = randomBytes(TOKEN_BYTES).toString("base64url");
  await guests().insertOne({
    token,
    name,
    createdAt: new Date(),
  });

  return { ok: true, guest: { token, name } };
}
