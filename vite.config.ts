import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

function omitFromDist(relativePaths: string[]) {
  return {
    name: "omit-from-dist",
    closeBundle() {
      for (const relativePath of relativePaths) {
        fs.rmSync(path.resolve(import.meta.dirname, "dist", relativePath), {
          recursive: true,
          force: true,
        });
      }
    },
  };
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    if (req.readableEnded) {
      resolve({});
      return;
    }

    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw) as unknown);
      } catch {
        reject(new Error("Body JSON tidak valid."));
      }
    });
    req.on("error", reject);
    req.resume();
  });
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

async function loadStore<T>(relativePath: string): Promise<T> {
  return import(pathToFileURL(path.resolve(import.meta.dirname, relativePath)).href) as Promise<T>;
}

function invitationDevApi(): Plugin {
  return {
    name: "invitation-dev-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestUrl = new URL(req.url ?? "/", "http://localhost");
        const pathname = requestUrl.pathname;

        if (pathname !== "/api/wishes" && pathname !== "/api/guests") {
          next();
          return;
        }

        void (async () => {
          try {
            if (pathname === "/api/guests") {
              const store = await loadStore<{
                findGuestByToken: (token: string) => Promise<{ name: string } | null>;
                createGuest: (
                  input: unknown,
                ) => Promise<
                  | { ok: true; guest: unknown }
                  | { ok: false; status: number; error: string }
                >;
              }>("lib/guestStore.js");
              if (req.method === "GET") {
                const guest = await store.findGuestByToken(requestUrl.searchParams.get("g") ?? "");
                if (!guest) {
                  sendJson(res, 404, { error: "Link undangan tidak valid." });
                  return;
                }
                sendJson(res, 200, { name: guest.name });
                return;
              }
              if (req.method === "POST") {
                const result = await store.createGuest(await readJsonBody(req));
                if (!result.ok) {
                  sendJson(res, result.status, { error: result.error });
                  return;
                }
                sendJson(res, 201, result.guest);
                return;
              }
              res.setHeader("Allow", "GET, POST");
              sendJson(res, 405, { error: "Method not allowed" });
              return;
            }

            const store = await loadStore<{
              listWishes: () => Promise<unknown>;
              createWish: (
                input: unknown,
              ) => Promise<
                | { ok: true; wish: unknown }
                | { ok: false; status: number; error: string }
              >;
            }>("lib/wishStore.js");
            if (req.method === "GET") {
              sendJson(res, 200, await store.listWishes());
              return;
            }
            if (req.method === "POST") {
              const result = await store.createWish(await readJsonBody(req));
              if (!result.ok) {
                sendJson(res, result.status, { error: result.error });
                return;
              }
              sendJson(res, 201, result.wish);
              return;
            }
            res.setHeader("Allow", "GET, POST");
            sendJson(res, 405, { error: "Method not allowed" });
          } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal terhubung ke database.";
            sendJson(res, 500, { error: message });
          }
        })();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  for (const [key, value] of Object.entries(env)) {
    if (key.includes("MONGODB") && value) {
      process.env[key] ??= value;
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      invitationDevApi(),
      omitFromDist(["images/fromGDrive"]),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },
    ssr: {
      external: ["mongodb", "@vercel/functions"],
    },
  };
});
