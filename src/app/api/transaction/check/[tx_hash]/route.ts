import { CheckStatusResponse } from "@/schemas/transaction.schema";
import { fetchJson } from "@/utils/fetch";

const BACKEND_URL = process.env.BACKEND_URL

export async function GET(
    request: Request,
    { params }: { params: { tx_hash: string } }
) {
    const tx_hash = params.tx_hash

    const data = await fetchJson<CheckStatusResponse>(
        `${BACKEND_URL}/check/${tx_hash}`,
        "GET"
    );

    return Response.json(data)
}