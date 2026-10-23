import { createListRouter } from '../utils/createListRouter.js'
import { createFaqSchema, updateFaqSchema } from '../validators/faq.validator.js'
import faqController from '../controllers/faq.controller.js'

export default createListRouter({
  controller: faqController,
  createSchema: createFaqSchema,
  updateSchema: updateFaqSchema,
  resourceName: 'faqs',
})
