import { z } from 'zod'

export const createTestimonialSchema = z.object({
  quote: z.string().trim().min(1, 'Quote is required').max(500),
  name: z.string().trim().min(1, 'Name is required').max(100),
  role: z.string().trim().min(1, 'Role is required').max(120),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatarUrl: z.string().trim().optional(),
  order: z.number().int().optional(),
})

export const updateTestimonialSchema = createTestimonialSchema.partial()
