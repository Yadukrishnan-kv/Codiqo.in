import { z } from 'zod'

export const reorderSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      order: z.number().int(),
    })
  )
  .min(1, 'Provide at least one item to reorder')
