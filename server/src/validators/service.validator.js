import { z } from 'zod'
import { ICON_KEYS } from '../utils/iconOptions.js'

export const createServiceSchema = z.object({
  type: z.enum(['main', 'sub']),
  icon: z.enum(ICON_KEYS),
  title: z.string().trim().min(1, 'Title is required').max(120),
  description: z.string().trim().min(1, 'Description is required').max(500),
  bullets: z.array(z.string().trim().min(1).max(120)).max(6).optional().default([]),
  order: z.number().int().optional(),
})

export const updateServiceSchema = createServiceSchema.partial()
