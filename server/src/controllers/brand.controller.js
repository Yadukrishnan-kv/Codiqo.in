import Brand from '../models/Brand.js'
import { createListController } from '../utils/createListController.js'
import { deleteUploadedFile } from '../utils/fileCleanup.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, ApiError } from '../utils/apiResponse.js'

const base = createListController(Brand, { searchFields: ['name'] })

const update = asyncHandler(async (req, res) => {
  const existing = await Brand.findById(req.params.id)
  if (!existing) throw new ApiError(404, 'Brand not found')

  if ('logoUrl' in req.body && existing.logoUrl && existing.logoUrl !== req.body.logoUrl) {
    await deleteUploadedFile(existing.logoUrl)
  }

  Object.assign(existing, req.body)
  await existing.save()
  ok(res, { item: existing })
})

const remove = asyncHandler(async (req, res) => {
  const item = await Brand.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Brand not found')
  await deleteUploadedFile(item.logoUrl)
  ok(res, { deleted: true, item })
})

export default { ...base, update, remove }
