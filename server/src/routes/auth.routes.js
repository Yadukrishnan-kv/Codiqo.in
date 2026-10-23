import { Router } from 'express'
import { verifyToken, requireRole } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { auditLog } from '../middleware/auditLog.middleware.js'
import { loginLimiter } from '../middleware/rateLimiter.js'
import {
  loginSchema,
  changePasswordSchema,
  createAdminSchema,
  updateAdminSchema,
} from '../validators/auth.validator.js'
import {
  login,
  logout,
  me,
  changePassword,
  listAdmins,
  createAdmin,
  updateAdmin,
} from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', loginLimiter, validate(loginSchema), login)
router.post('/logout', verifyToken, logout)
router.get('/me', verifyToken, me)
router.post('/change-password', verifyToken, validate(changePasswordSchema), changePassword)

router.get('/admins', verifyToken, requireRole('superadmin'), listAdmins)
router.post(
  '/admins',
  verifyToken,
  requireRole('superadmin'),
  validate(createAdminSchema),
  auditLog('admins', 'create'),
  createAdmin
)
router.put(
  '/admins/:id',
  verifyToken,
  requireRole('superadmin'),
  validate(updateAdminSchema),
  auditLog('admins', 'update'),
  updateAdmin
)

export default router
