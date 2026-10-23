import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { auditLog } from '../middleware/auditLog.middleware.js'

export function createSingletonRouter({ controller, updateSchema, resourceName }) {
  const router = Router()

  router.get('/', controller.getPublic)
  router.put('/', verifyToken, validate(updateSchema), auditLog(resourceName, 'update'), controller.update)

  return router
}
