export function ok(res, data, status = 200) {
  return res.status(status).json({ success: true, data })
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}
