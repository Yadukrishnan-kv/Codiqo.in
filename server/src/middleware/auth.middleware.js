import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AUTH_COOKIE_NAME } from '../utils/generateToken.js'
import { ApiError } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import Admin from '../models/Admin.js'

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME]
  if (!token) {
    throw new ApiError(401, 'Not authenticated')
  }

  let payload
  try {
    payload = jwt.verify(token, env.jwtSecret)
  } catch {
    throw new ApiError(401, 'Session expired, please log in again')
  }

  const admin = await Admin.findById(payload.sub)
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Account no longer active')
  }

  req.admin = admin
  next()
})

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      throw new ApiError(403, 'You do not have permission to perform this action')
    }
    next()
  }
}
