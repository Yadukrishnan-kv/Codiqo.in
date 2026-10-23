import { z } from 'zod'

const sectionVisibilitySchema = z
  .object({
    logoTicker: z.boolean(),
    services: z.boolean(),
    process: z.boolean(),
    work: z.boolean(),
    whyUs: z.boolean(),
    testimonials: z.boolean(),
    founder: z.boolean(),
    faq: z.boolean(),
    contact: z.boolean(),
  })
  .partial()

export const siteSettingsSchema = z.object({
  siteName: z.string().trim().min(1, 'Site name is required').max(60),
  tagline: z.string().trim().max(120).optional(),
  logoText: z.string().trim().min(1, 'Logo text is required').max(30),
  logoImageUrl: z.string().trim().optional(),
  footerDescription: z.string().trim().max(300).optional(),

  seoDescription: z.string().trim().max(300).optional(),
  seoKeywords: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
  jsonLdServiceTypes: z.array(z.string().trim().min(1).max(60)).max(20).optional(),
  jsonLdAreaServed: z.string().trim().max(60).optional(),
  jsonLdTelephone: z.string().trim().max(30).optional(),
  jsonLdEmail: z.string().trim().max(120).optional(),

  contactPhone: z.string().trim().max(30).optional(),
  contactEmail: z.string().trim().max(120).optional(),
  contactLocation: z.string().trim().max(120).optional(),
  whatsappNumber: z.string().trim().max(20).optional(),
  whatsappMessage: z.string().trim().max(300).optional(),

  socialInstagram: z.string().trim().max(200).optional(),
  socialLinkedin: z.string().trim().max(200).optional(),
  socialTwitter: z.string().trim().max(200).optional(),
  socialGithub: z.string().trim().max(200).optional(),

  sectionVisibility: sectionVisibilitySchema.optional(),
})

export const updateSiteSettingsSchema = siteSettingsSchema.partial()
