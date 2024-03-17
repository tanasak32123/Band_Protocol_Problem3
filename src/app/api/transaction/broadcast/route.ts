import { BroadcastResponse } from "@/schemas/transaction.schema";
import { fetchJson } from "@/utils/fetch";

const BACKEND_URL = process.env.BACKEND_URL

export async function POST(request: Request) {
    const body = await request.json()

    const data = await fetchJson<BroadcastResponse>(
        `${BACKEND_URL}/broadcast`,
        "POST",
        { body: JSON.stringify(body) }
    );

    return Response.json(data)
}