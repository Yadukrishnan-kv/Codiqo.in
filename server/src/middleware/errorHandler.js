import { ApiError } from '../utils/apiResponse.js'

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}

export function errorHandler(err, req, res, next) {
  const status = err instanceof ApiError ? err.status : err.status || 500
  const message = status === 500 ? 'Internal server error' : err.message

  if (status === 500) {
    console.error('[error]', err)
  }

  res.status(status).json({ success: false, message })
}
