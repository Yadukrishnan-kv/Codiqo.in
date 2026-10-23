import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, ApiError } from '../utils/apiResponse.js'

export const uploadImageHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No image file received')
  }
  ok(res, { url: `/uploads/${req.file.filename}` }, 201)
})
