import { z } from 'zod'
import { ICON_KEYS } from '../utils/iconOptions.js'

export const founderSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  initials: z.string().trim().min(1, 'Initials are required').max(10),
  establishedLabel: z.string().trim().max(40).optional(),
  bioParagraph1: z.string().trim().min(1, 'First paragraph is required').max(600),
  bioParagraph2: z.string().trim().max(600).optional(),
  highlight1Icon: z.enum(ICON_KEYS),
  highlight1Label: z.string().trim().min(1).max(30),
  highlight1Value: z.string().trim().min(1).max(60),
  highlight2Icon: z.enum(ICON_KEYS),
  highlight2Label: z.string().trim().min(1).max(30),
  highlight2Value: z.string().trim().min(1).max(60),
  highlight3Icon: z.enum(ICON_KEYS),
  highlight3Label: z.string().trim().min(1).max(30),
  highlight3Value: z.string().trim().min(1).max(60),
  primaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  primaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  secondaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  secondaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  photoUrl: z.string().trim().optional(),
})

export const updateFounderSchema = founderSchema.partial()
