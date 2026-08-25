import { createWish, listWishes } from "../lib/wishStore";

function json(status: number, payload: unknown) {
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  try {
    return json(200, await listWishes());
  } catch (error) {
    console.error("GET /api/wishes", error);
    return json(500, { error: "Gagal memuat ucapan." });
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = await createWish(body);
    if (!result.ok) {
      return json(result.status, { error: result.error });
    }
    return json(201, result.wish);
  } catch (error) {
    console.error("POST /api/wishes", error);
    return json(500, { error: "Gagal menyimpan ucapan." });
  }
}
