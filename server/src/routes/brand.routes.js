import { createListRouter } from '../utils/createListRouter.js'
import { createBrandSchema, updateBrandSchema } from '../validators/brand.validator.js'
import brandController from '../controllers/brand.controller.js'

export default createListRouter({
  controller: brandController,
  createSchema: createBrandSchema,
  updateSchema: updateBrandSchema,
  resourceName: 'brands',
})
