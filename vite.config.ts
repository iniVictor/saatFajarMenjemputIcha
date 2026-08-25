import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
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
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
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
  });
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function wishesDevApi(): Plugin {
  return {
    name: "wishes-dev-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (pathname !== "/api/wishes") {
          next();
          return;
        }

        void (async () => {
          try {
            const store = (await server.ssrLoadModule("/lib/wishStore.ts")) as {
              listWishes: () => Promise<unknown>;
              createWish: (
                input: unknown,
              ) => Promise<
                | { ok: true; wish: unknown }
                | { ok: false; status: number; error: string }
              >;
            };
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
            const message = error instanceof Error ? error.message : "Gagal menyimpan ucapan.";
            sendJson(res, 500, { error: message });
          }
        })();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  process.env.MONGODB_URI ??= env.MONGODB_URI || env.database_MONGODB_URI;
  process.env.database_MONGODB_URI ??= env.database_MONGODB_URI;
  process.env.MONGODB_DB ??= env.MONGODB_DB || "undangan";

  return {
    plugins: [
      react(),
      tailwindcss(),
      wishesDevApi(),
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
