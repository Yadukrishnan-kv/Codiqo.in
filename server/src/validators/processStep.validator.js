import { z } from 'zod'

export const createProcessStepSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(80),
  description: z.string().trim().min(1, 'Description is required').max(400),
  order: z.number().int().optional(),
})

export const updateProcessStepSchema = createProcessStepSchema.partial()
