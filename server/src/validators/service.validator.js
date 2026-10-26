import { z } from 'zod'
import { ICON_KEYS } from '../utils/iconOptions.js'

export const createServiceSchema = z.object({
  type: z.enum(['main', 'sub']),
  icon: z.enum(ICON_KEYS),
  title: z.string().trim().min(1, 'Title is required').max(120),
  category: z.string().trim().max(60).optional().default(''),
  description: z.string().trim().min(1, 'Description is required').max(500),
  imageUrl: z.string().trim().optional().default(''),
  price: z.number().nonnegative().optional().default(0),
  priceNote: z.string().trim().max(40).optional().default('one-time'),
  bullets: z.array(z.string().trim().min(1).max(120)).max(6).optional().default([]),
  order: z.number().int().optional(),
})

export const updateServiceSchema = createServiceSchema.partial()
