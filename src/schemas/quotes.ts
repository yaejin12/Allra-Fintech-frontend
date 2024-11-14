import { z } from 'zod'

// quotes schema
export const quotesSchema = z.object({
  id: z.number(),
  quote: z.string(),
  author: z.string(),
})

export type Quotes = z.infer<typeof quotesSchema>

export const getInfiniteQuotesSchema = z.object({
  quotes: z.array(quotesSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type GetInfiniteQuotes = z.infer<typeof getInfiniteQuotesSchema>
