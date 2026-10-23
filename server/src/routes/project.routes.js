import { createListRouter } from '../utils/createListRouter.js'
import { createProjectSchema, updateProjectSchema } from '../validators/project.validator.js'
import projectController from '../controllers/project.controller.js'

export default createListRouter({
  controller: projectController,
  createSchema: createProjectSchema,
  updateSchema: updateProjectSchema,
  resourceName: 'projects',
})
