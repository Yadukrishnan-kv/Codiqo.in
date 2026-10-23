import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { auditLog } from '../middleware/auditLog.middleware.js'
import { reorderSchema } from '../validators/common.validator.js'

// Wires the standard 7-endpoint shape (public list, admin list, create,
// update, delete, toggle, reorder) for any controller produced by
// createListController — or one that extends it, as long as it exposes the
// same { getPublic, getAll, create, update, remove, toggleActive, reorder }
// shape (see project.controller.js for an example that overrides some).
// `resourceName` drives both audit log labels and has no other effect.
export function createListRouter({ controller, createSchema, updateSchema, resourceName }) {
  const { getPublic, getAll, create, update, remove, toggleActive, reorder } = controller
  const router = Router()

  router.get('/', getPublic)
  router.get('/all', verifyToken, getAll)
  router.post('/', verifyToken, validate(createSchema), auditLog(resourceName, 'create'), create)
  router.patch('/reorder', verifyToken, validate(reorderSchema), auditLog(resourceName, 'reorder'), reorder)
  router.put('/:id', verifyToken, validate(updateSchema), auditLog(resourceName, 'update'), update)
  router.delete('/:id', verifyToken, auditLog(resourceName, 'delete'), remove)
  router.patch('/:id/toggle', verifyToken, auditLog(resourceName, 'toggle'), toggleActive)

  return router
}
