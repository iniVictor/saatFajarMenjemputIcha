import { createWish, listWishes } from "../lib/wishStore.js";

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  if (req.body !== undefined) {
    if (typeof req.body === "string") {
      return req.body.trim() ? JSON.parse(req.body) : {};
    }
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET" || req.method === "HEAD") {
      send(res, 200, await listWishes());
      return;
    }

    if (req.method === "POST") {
      const result = await createWish(await readBody(req));
      if (!result.ok) {
        send(res, result.status, { error: result.error });
        return;
      }
      send(res, 201, result.wish);
      return;
    }

    res.setHeader("Allow", "GET, POST");
    send(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error("api/wishes", error);
    send(res, 500, { error: "Gagal memuat ucapan." });
  }
}
