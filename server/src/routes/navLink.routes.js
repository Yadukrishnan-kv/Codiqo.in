import { createListRouter } from '../utils/createListRouter.js'
import { createNavLinkSchema, updateNavLinkSchema } from '../validators/navLink.validator.js'
import navLinkController from '../controllers/navLink.controller.js'

export default createListRouter({
  controller: navLinkController,
  createSchema: createNavLinkSchema,
  updateSchema: updateNavLinkSchema,
  resourceName: 'nav links',
})
