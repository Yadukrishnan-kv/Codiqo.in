import { z } from 'zod'

export const createFaqSchema = z.object({
  question: z.string().trim().min(1, 'Question is required').max(200),
  answer: z.string().trim().min(1, 'Answer is required').max(1000),
  order: z.number().int().optional(),
})

export const updateFaqSchema = createFaqSchema.partial()
