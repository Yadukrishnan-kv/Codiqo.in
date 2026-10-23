import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { auditLog } from '../middleware/auditLog.middleware.js'
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  updateInvoiceStatusSchema,
} from '../validators/invoice.validator.js'
import invoiceController from '../controllers/invoice.controller.js'

const router = Router()

router.use(verifyToken)

router.get('/', invoiceController.getAll)
router.get('/:id', invoiceController.getOne)
router.get('/:id/pdf', invoiceController.downloadPdf)
router.post('/', validate(createInvoiceSchema), auditLog('invoice', 'create'), invoiceController.create)
router.put('/:id', validate(updateInvoiceSchema), auditLog('invoice', 'update'), invoiceController.update)
router.patch(
  '/:id/status',
  validate(updateInvoiceStatusSchema),
  auditLog('invoice', 'update'),
  invoiceController.updateStatus
)
router.delete('/:id', auditLog('invoice', 'delete'), invoiceController.remove)

export default router
