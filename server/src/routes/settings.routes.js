import { createSingletonRouter } from '../utils/createSingletonRouter.js'
import { updateSiteSettingsSchema } from '../validators/siteSettings.validator.js'
import siteSettingsController from '../controllers/siteSettings.controller.js'

export default createSingletonRouter({
  controller: siteSettingsController,
  updateSchema: updateSiteSettingsSchema,
  resourceName: 'site settings',
})
