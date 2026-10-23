import WhyUsReason from '../models/WhyUsReason.js'
import { createListController } from '../utils/createListController.js'

export default createListController(WhyUsReason, { searchFields: ['title', 'description'] })
