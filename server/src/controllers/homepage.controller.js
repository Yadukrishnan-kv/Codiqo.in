import Service from '../models/Service.js'
import ProcessStep from '../models/ProcessStep.js'
import Project from '../models/Project.js'
import WhyUsReason from '../models/WhyUsReason.js'
import Testimonial from '../models/Testimonial.js'
import Faq from '../models/Faq.js'
import NavLink from '../models/NavLink.js'
import Brand from '../models/Brand.js'
import heroController from './hero.controller.js'
import founderController from './founder.controller.js'
import siteSettingsController from './siteSettings.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok } from '../utils/apiResponse.js'

const activeOrdered = (Model) => Model.find({ isActive: true }).sort({ order: 1 })

export const getHomepage = asyncHandler(async (req, res) => {
  const [hero, founder, settings, services, processSteps, projects, whyUsReasons, testimonials, faqs, navLinks, brands] =
    await Promise.all([
      heroController.getOrCreate(),
      founderController.getOrCreate(),
      siteSettingsController.getOrCreate(),
      activeOrdered(Service),
      activeOrdered(ProcessStep),
      activeOrdered(Project),
      activeOrdered(WhyUsReason),
      activeOrdered(Testimonial),
      activeOrdered(Faq),
      activeOrdered(NavLink),
      activeOrdered(Brand),
    ])

  ok(res, {
    hero,
    founder,
    settings,
    services: {
      main: services.filter((s) => s.type === 'main'),
      sub: services.filter((s) => s.type === 'sub'),
    },
    processSteps,
    projects,
    whyUsReasons,
    testimonials,
    faqs,
    navLinks,
    brands,
  })
})
