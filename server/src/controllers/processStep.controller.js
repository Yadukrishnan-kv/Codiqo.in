import ProcessStep from '../models/ProcessStep.js'
import { createListController } from '../utils/createListController.js'

export default createListController(ProcessStep, { searchFields: ['title', 'description'] })
