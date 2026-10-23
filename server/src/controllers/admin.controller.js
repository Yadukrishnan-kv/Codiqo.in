import Service from '../models/Service.js'
import ProcessStep from '../models/ProcessStep.js'
import Project from '../models/Project.js'
import WhyUsReason from '../models/WhyUsReason.js'
import Testimonial from '../models/Testimonial.js'
import Faq from '../models/Faq.js'
import NavLink from '../models/NavLink.js'
import Brand from '../models/Brand.js'
import AuditLog from '../models/AuditLog.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok } from '../utils/apiResponse.js'

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [services, processSteps, projects, whyUsReasons, testimonials, faqs, navLinks, brands, recentActivity] =
    await Promise.all([
      Service.countDocuments(),
      ProcessStep.countDocuments(),
      Project.countDocuments(),
      WhyUsReason.countDocuments(),
      Testimonial.countDocuments(),
      Faq.countDocuments(),
      NavLink.countDocuments(),
      Brand.countDocuments(),
      AuditLog.find().sort({ createdAt: -1 }).limit(8),
    ])

  ok(res, {
    counts: { services, processSteps, projects, whyUsReasons, testimonials, faqs, navLinks, brands },
    recentActivity,
  })
})
