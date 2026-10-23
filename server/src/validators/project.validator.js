import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  tag: z.string().trim().min(1, 'Tag is required').max(160),
  year: z.string().trim().length(4, 'Use a 4-digit year'),
  url: z.string().trim().url('Enter a valid URL'),
  imageUrl: z.string().trim().optional(),
  gradientFrom: z.string().trim().optional(),
  gradientVia: z.string().trim().optional(),
  gradientTo: z.string().trim().optional(),
  isFeatured: z.boolean().optional().default(false),
  order: z.number().int().optional(),
})

export const updateProjectSchema = createProjectSchema.partial()
