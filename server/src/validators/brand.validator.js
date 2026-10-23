import { z } from 'zod'

export const createBrandSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(60),
  logoUrl: z.string().trim().optional(),
  order: z.number().int().optional(),
})

export const updateBrandSchema = createBrandSchema.partial()
