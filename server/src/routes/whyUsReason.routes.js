import { createListRouter } from '../utils/createListRouter.js'
import { createWhyUsReasonSchema, updateWhyUsReasonSchema } from '../validators/whyUsReason.validator.js'
import whyUsReasonController from '../controllers/whyUsReason.controller.js'

export default createListRouter({
  controller: whyUsReasonController,
  createSchema: createWhyUsReasonSchema,
  updateSchema: updateWhyUsReasonSchema,
  resourceName: 'why-us reasons',
})
