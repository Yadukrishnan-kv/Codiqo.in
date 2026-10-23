import { createListRouter } from '../utils/createListRouter.js'
import { createTestimonialSchema, updateTestimonialSchema } from '../validators/testimonial.validator.js'
import testimonialController from '../controllers/testimonial.controller.js'

export default createListRouter({
  controller: testimonialController,
  createSchema: createTestimonialSchema,
  updateSchema: updateTestimonialSchema,
  resourceName: 'testimonials',
})
