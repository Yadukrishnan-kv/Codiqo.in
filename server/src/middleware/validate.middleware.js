import { ApiError } from '../utils/apiResponse.js'

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const message = result.error.issues[0]?.message || 'Invalid request data'
      throw new ApiError(400, message)
    }
    req.body = result.data
    next()
  }
}
