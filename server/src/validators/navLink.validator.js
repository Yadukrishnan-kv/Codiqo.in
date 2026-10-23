import { z } from 'zod'

export const createNavLinkSchema = z.object({
  label: z.string().trim().min(1, 'Label is required').max(40),
  href: z.string().trim().min(1, 'Link is required').max(300),
  order: z.number().int().optional(),
})

export const updateNavLinkSchema = createNavLinkSchema.partial()
