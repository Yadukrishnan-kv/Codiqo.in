import { Router } from 'express'
import authRoutes from './auth.routes.js'
import contentRoutes from './content.routes.js'
import uploadRoutes from './upload.routes.js'
import settingsRoutes from './settings.routes.js'
import adminRoutes from './admin.routes.js'
import invoiceRoutes from './invoice.routes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok', uptime: process.uptime() } })
})

router.use('/auth', authRoutes)
router.use('/content', contentRoutes)
router.use('/upload', uploadRoutes)
router.use('/settings', settingsRoutes)
router.use('/admin', adminRoutes)
router.use('/invoices', invoiceRoutes)

export default router
