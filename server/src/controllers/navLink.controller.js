import NavLink from '../models/NavLink.js'
import { createListController } from '../utils/createListController.js'

export default createListController(NavLink, { searchFields: ['label', 'href'] })
