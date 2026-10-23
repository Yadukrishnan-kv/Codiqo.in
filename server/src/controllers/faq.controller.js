import Faq from '../models/Faq.js'
import { createListController } from '../utils/createListController.js'

export default createListController(Faq, { searchFields: ['question', 'answer'] })
