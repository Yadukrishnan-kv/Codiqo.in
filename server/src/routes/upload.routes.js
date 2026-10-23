import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { uploadImage } from '../middleware/upload.middleware.js'
import { uploadLimiter } from '../middleware/rateLimiter.js'
import { uploadImageHandler } from '../controllers/upload.controller.js'
import { ApiError } from '../utils/apiResponse.js'

const router = Router()

router.post(
  '/image',
  verifyToken,
  uploadLimiter,
  (req, res, next) => {
    uploadImage(req, res, (err) => {
      if (err) return next(new ApiError(400, err.message))
      next()
    })
  },
  uploadImageHandler
)

export default router
