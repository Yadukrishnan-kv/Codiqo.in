import SiteSettings from '../models/SiteSettings.js'
import { createSingletonController } from '../utils/createSingletonController.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok } from '../utils/apiResponse.js'

const DEFAULTS = {
  siteName: 'Codiqo',
  tagline: 'Web development studio',
  logoText: 'Codiqo',
  logoImageUrl: '',
  footerDescription:
    'A web development studio creating fast, scalable digital products that perform in the real world.',

  seoDescription:
    'Codiqo is a web development studio building static, dynamic and custom websites that are fast, beautiful, responsive and SEO optimised.',
  seoKeywords: [],
  jsonLdServiceTypes: [
    'Static Websites',
    'Dynamic Web Apps',
    'Custom Web Development',
    'E-commerce',
    'SEO',
  ],
  jsonLdAreaServed: 'Worldwide',
  jsonLdTelephone: '+91-85898-41074',
  jsonLdEmail: 'muhammedshifinpkd@gmail.com',

  contactPhone: '+91 97457 06208',
  contactEmail: 'yadhumanoj12@gmail.com',
  contactLocation: 'Kerala, India · Working worldwide',
  whatsappNumber: '919745706208',
  whatsappMessage: 'Hi Codiqo! I would like to discuss a new website/web app project.',

  socialInstagram: '',
  socialLinkedin: '',
  socialTwitter: '',
  socialGithub: '',

  sectionVisibility: {
    logoTicker: false,
    services: true,
    process: true,
    work: true,
    whyUs: true,
    testimonials: true,
    founder: false,
    faq: true,
    contact: true,
  },
}

const base = createSingletonController(SiteSettings, DEFAULTS)

const update = asyncHandler(async (req, res) => {
  const doc = await SiteSettings.findOneAndUpdate(
    {},
    { ...req.body, updatedBy: req.admin._id },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
  )
  ok(res, { item: doc })
})

export default { ...base, update }
