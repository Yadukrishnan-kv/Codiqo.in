import mongoose from 'mongoose'

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true, default: '' },
    logoText: { type: String, required: true, trim: true },
    logoImageUrl: { type: String, trim: true, default: '' },
    footerDescription: { type: String, trim: true, default: '' },

    seoDescription: { type: String, trim: true, default: '' },
    seoKeywords: { type: [String], default: [] },
    jsonLdServiceTypes: { type: [String], default: [] },
    jsonLdAreaServed: { type: String, trim: true, default: '' },
    jsonLdTelephone: { type: String, trim: true, default: '' },
    jsonLdEmail: { type: String, trim: true, default: '' },

    contactPhone: { type: String, trim: true, default: '' },
    contactEmail: { type: String, trim: true, default: '' },
    contactLocation: { type: String, trim: true, default: '' },
    whatsappNumber: { type: String, trim: true, default: '' },
    whatsappMessage: { type: String, trim: true, default: '' },

    socialInstagram: { type: String, trim: true, default: '' },
    socialLinkedin: { type: String, trim: true, default: '' },
    socialTwitter: { type: String, trim: true, default: '' },
    socialGithub: { type: String, trim: true, default: '' },

    sectionVisibility: {
      logoTicker: { type: Boolean, default: false },
      services: { type: Boolean, default: true },
      process: { type: Boolean, default: true },
      work: { type: Boolean, default: true },
      whyUs: { type: Boolean, default: true },
      testimonials: { type: Boolean, default: true },
      founder: { type: Boolean, default: false },
      faq: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
)

export default mongoose.model('SiteSettings', siteSettingsSchema)
