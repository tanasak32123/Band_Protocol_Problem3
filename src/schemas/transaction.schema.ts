import { z } from 'zod'

export const transactionSchema = z.object({
    symbol: z.string().trim().min(1),
    price: z.coerce.number().min(1),
    timestamp: z.number().int()
})

export type Transaction = z.infer<typeof transactionSchema>;

export const broadcastResponseSchema = z.object({
    tx_hash: z.string()
})

export type BroadcastResponse = z.infer<typeof broadcastResponseSchema>

export const checkStatusResponseSchema = z.object({
    tx_status: z.enum(["CONFIRMED", "FAILED", "PENDING", "DNE"])
})

export type CheckStatusResponse = z.infer<typeof checkStatusResponseSchema>