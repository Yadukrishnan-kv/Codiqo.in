import { createSingletonRouter } from '../utils/createSingletonRouter.js'
import { updateFounderSchema } from '../validators/founder.validator.js'
import founderController from '../controllers/founder.controller.js'

export default createSingletonRouter({
  controller: founderController,
  updateSchema: updateFounderSchema,
  resourceName: 'founder',
})
