import { MongoClient, type MongoClientOptions } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000,
  serverSelectionTimeoutMS: 10000,
};

function firstEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return "";
}

function firstEnvMatching(pattern: RegExp): string {
  for (const [key, value] of Object.entries(process.env)) {
    if (pattern.test(key) && value?.trim()) return value.trim();
  }
  return "";
}

export function readMongoUri(): string {
  const uri =
    firstEnv("MONGODB_URI", "database_MONGODB_URI") ||
    firstEnvMatching(/MONGODB_URI$/);
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }
  return uri;
}

export function readMongoDatabaseName(uri: string): string {
  const named =
    firstEnv(
      "MONGODB_DB",
      "MONGODB_DATABASE",
      "database_MONGODB_DB",
      "database_MONGODB_DATABASE",
    ) || firstEnvMatching(/MONGODB_(DATABASE|DB)$/);
  if (named) return named;

  try {
    const pathname = new URL(uri).pathname.replace(/^\//, "");
    if (pathname) return pathname;
  } catch {
    /* ignore invalid URI until the driver reports it */
  }

  return "atlas-inv-fajic";
}

let client: MongoClient | undefined;

export function getMongoClient(): MongoClient {
  if (!client) {
    client = new MongoClient(readMongoUri(), options);
    attachDatabasePool(client);
  }
  return client;
}

export function getWishesDb() {
  return getMongoClient().db(readMongoDatabaseName(readMongoUri()));
}

export default getMongoClient;
