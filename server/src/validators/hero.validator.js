import { z } from 'zod'

export const heroSchema = z.object({
  badgeText: z.string().trim().min(1, 'Badge text is required').max(80),
  headingLine1: z.string().trim().min(1, 'Required').max(60),
  headingLine2: z.string().trim().min(1, 'Required').max(60),
  headingLine3: z.string().trim().min(1, 'Required').max(60),
  paragraph: z.string().trim().min(1, 'Paragraph is required').max(400),
  primaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  primaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  secondaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  secondaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  widgetTopLeft: z.string().trim().max(60).optional(),
  widgetBottomLeft: z.string().trim().max(60).optional(),
  widgetTopRight: z.string().trim().max(60).optional(),
  widgetBottomRight: z.string().trim().max(60).optional(),
})

export const updateHeroSchema = heroSchema.partial()
