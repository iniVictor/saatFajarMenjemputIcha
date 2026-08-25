import { createWish, listWishes } from "../lib/wishStore";

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): { json(body: unknown): unknown };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "GET") {
      return res.status(200).json(await listWishes());
    }

    if (req.method === "POST") {
      const result = await createWish(req.body);
      if (!result.ok) {
        return res.status(result.status).json({ error: result.error });
      }
      return res.status(201).json(result.wish);
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch {
    return res.status(500).json({
      error: req.method === "POST" ? "Gagal menyimpan ucapan." : "Gagal memuat ucapan.",
    });
  }
}
