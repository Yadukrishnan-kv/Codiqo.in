import Testimonial from '../models/Testimonial.js'
import { createListController } from '../utils/createListController.js'
import { deleteUploadedFile } from '../utils/fileCleanup.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, ApiError } from '../utils/apiResponse.js'

const base = createListController(Testimonial, { searchFields: ['name', 'role', 'quote'] })

const update = asyncHandler(async (req, res) => {
  const existing = await Testimonial.findById(req.params.id)
  if (!existing) throw new ApiError(404, 'Testimonial not found')

  if ('avatarUrl' in req.body && existing.avatarUrl && existing.avatarUrl !== req.body.avatarUrl) {
    await deleteUploadedFile(existing.avatarUrl)
  }

  Object.assign(existing, req.body)
  await existing.save()
  ok(res, { item: existing })
})

const remove = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Testimonial not found')
  await deleteUploadedFile(item.avatarUrl)
  ok(res, { deleted: true, item })
})

export default { ...base, update, remove }
