import { createSingletonRouter } from '../utils/createSingletonRouter.js'
import { updateHeroSchema } from '../validators/hero.validator.js'
import heroController from '../controllers/hero.controller.js'

export default createSingletonRouter({
  controller: heroController,
  updateSchema: updateHeroSchema,
  resourceName: 'hero',
})
