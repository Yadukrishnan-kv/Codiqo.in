import Service from '../models/Service.js'
import { createListController } from '../utils/createListController.js'

export default createListController(Service, {
  searchFields: ['title', 'description'],
  filterFields: ['type'],
})
