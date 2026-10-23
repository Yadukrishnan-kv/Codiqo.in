import Admin from '../models/Admin.js'
import AuditLog from '../models/AuditLog.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, ApiError } from '../utils/apiResponse.js'
import { generateToken, authCookieOptions, AUTH_COOKIE_NAME } from '../utils/generateToken.js'

function toSafeAdmin(admin) {
  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    lastLoginAt: admin.lastLoginAt,
  }
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email }).select('+password')
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const matches = await admin.matchPassword(password)
  if (!matches) {
    throw new ApiError(401, 'Invalid email or password')
  }

  admin.lastLoginAt = new Date()
  await admin.save()

  const token = generateToken(admin._id.toString())
  res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions())

  AuditLog.create({
    admin: admin._id,
    adminName: admin.name,
    action: 'login',
    module: 'auth',
    summary: 'Logged in',
    ip: req.ip,
  }).catch((err) => console.error('[audit] failed to record entry:', err.message))

  ok(res, { admin: toSafeAdmin(admin) })
})

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, { ...authCookieOptions(), maxAge: 0 })
  ok(res, { loggedOut: true })
})

export const me = asyncHandler(async (req, res) => {
  ok(res, { admin: toSafeAdmin(req.admin) })
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const admin = await Admin.findById(req.admin._id).select('+password')
  const matches = await admin.matchPassword(currentPassword)
  if (!matches) {
    throw new ApiError(400, 'Current password is incorrect')
  }

  admin.password = newPassword
  await admin.save()

  ok(res, { changed: true })
})

export const listAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: 1 })
  ok(res, { admins: admins.map(toSafeAdmin) })
})

export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  const exists = await Admin.findOne({ email })
  if (exists) {
    throw new ApiError(409, 'An admin with this email already exists')
  }

  const admin = await Admin.create({ name, email, password, role })
  ok(res, { admin: toSafeAdmin(admin) }, 201)
})

export const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (id === req.admin._id.toString() && req.body.isActive === false) {
    throw new ApiError(400, 'You cannot deactivate your own account')
  }

  const admin = await Admin.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!admin) {
    throw new ApiError(404, 'Admin not found')
  }

  ok(res, { admin: toSafeAdmin(admin) })
})
