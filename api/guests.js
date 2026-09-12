import { createGuest, findGuestByToken } from "../lib/guestStore.js";

function send(res, status, payload, cacheControl = "no-store") {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cacheControl);
  res.end(JSON.stringify(payload));
}

function readToken(req) {
  try {
    const host = req.headers.host || "localhost";
    const url = new URL(req.url || "/", `http://${host}`);
    return url.searchParams.get("g") ?? "";
  } catch {
    return "";
  }
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
      const guest = await findGuestByToken(readToken(req));
      if (!guest) {
        send(res, 404, { error: "Link undangan tidak valid." });
        return;
      }
      send(res, 200, { name: guest.name }, "private, max-age=300");
      return;
    }

    if (req.method === "POST") {
      const result = await createGuest(await readBody(req));
      if (!result.ok) {
        send(res, result.status, { error: result.error });
        return;
      }
      send(res, 201, result.guest);
      return;
    }

    res.setHeader("Allow", "GET, POST");
    send(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error("api/guests", error);
    send(res, 500, { error: "Gagal memuat data tamu." });
  }
}
