import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { getDashboardStats } from '../controllers/admin.controller.js'

const router = Router()

router.get('/dashboard', verifyToken, getDashboardStats)

export default router
