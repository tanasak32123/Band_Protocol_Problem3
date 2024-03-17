import { BroadcastResponse, CheckStatusResponse, Transaction, broadcastResponseSchema, checkStatusResponseSchema } from "@/schemas/transaction.schema"
import { fetchJson } from "@/utils/fetch"
import { validateSchema } from "@/utils/validateSchema";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const broadcastTransaction = async (t: Transaction) => {
    const data = await fetchJson<BroadcastResponse>(
        `api/transaction/broadcast`,
        "POST",
        { body: JSON.stringify(t) }
    );

    return validateSchema<BroadcastResponse>(data, broadcastResponseSchema)
}

export const checkStatusTransaction = async (tx_hash: string) => {
    const data = await fetchJson<CheckStatusResponse>(
        `api/transaction/check/${tx_hash}`,
        "GET"
    );

    return validateSchema<CheckStatusResponse>(data, checkStatusResponseSchema)
}