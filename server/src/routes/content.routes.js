import { Router } from 'express'
import projectRoutes from './project.routes.js'
import serviceRoutes from './service.routes.js'
import processStepRoutes from './processStep.routes.js'
import whyUsReasonRoutes from './whyUsReason.routes.js'
import testimonialRoutes from './testimonial.routes.js'
import faqRoutes from './faq.routes.js'
import navLinkRoutes from './navLink.routes.js'
import brandRoutes from './brand.routes.js'
import heroRoutes from './hero.routes.js'
import founderRoutes from './founder.routes.js'
import { getHomepage } from '../controllers/homepage.controller.js'

const router = Router()

router.get('/homepage', getHomepage)

router.use('/projects', projectRoutes)
router.use('/services', serviceRoutes)
router.use('/process-steps', processStepRoutes)
router.use('/whyus-reasons', whyUsReasonRoutes)
router.use('/testimonials', testimonialRoutes)
router.use('/faqs', faqRoutes)
router.use('/nav-links', navLinkRoutes)
router.use('/brands', brandRoutes)
router.use('/hero', heroRoutes)
router.use('/founder', founderRoutes)

export default router
