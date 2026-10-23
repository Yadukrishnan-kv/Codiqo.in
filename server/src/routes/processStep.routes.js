import { createListRouter } from '../utils/createListRouter.js'
import { createProcessStepSchema, updateProcessStepSchema } from '../validators/processStep.validator.js'
import processStepController from '../controllers/processStep.controller.js'

export default createListRouter({
  controller: processStepController,
  createSchema: createProcessStepSchema,
  updateSchema: updateProcessStepSchema,
  resourceName: 'process steps',
})
