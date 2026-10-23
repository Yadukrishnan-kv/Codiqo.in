import { z } from 'zod'
import { ICON_KEYS } from '../utils/iconOptions.js'

export const createWhyUsReasonSchema = z.object({
  icon: z.enum(ICON_KEYS),
  title: z.string().trim().min(1, 'Title is required').max(80),
  description: z.string().trim().min(1, 'Description is required').max(300),
  order: z.number().int().optional(),
})

export const updateWhyUsReasonSchema = createWhyUsReasonSchema.partial()
