import { createListRouter } from '../utils/createListRouter.js'
import { createServiceSchema, updateServiceSchema } from '../validators/service.validator.js'
import serviceController from '../controllers/service.controller.js'

export default createListRouter({
  controller: serviceController,
  createSchema: createServiceSchema,
  updateSchema: updateServiceSchema,
  resourceName: 'services',
})
