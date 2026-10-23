import Project from '../models/Project.js'
import { createListController } from '../utils/createListController.js'
import { deleteUploadedFile } from '../utils/fileCleanup.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, ApiError } from '../utils/apiResponse.js'

const base = createListController(Project, { searchFields: ['title', 'tag'] })

const create = asyncHandler(async (req, res) => {
  const payload = { ...req.body, isFullImage: Boolean(req.body.imageUrl) }

  if (payload.order === undefined) {
    const last = await Project.findOne().sort({ order: -1 })
    payload.order = last ? last.order + 1 : 0
  }

  const item = await Project.create(payload)
  ok(res, { item }, 201)
})

const update = asyncHandler(async (req, res) => {
  const existing = await Project.findById(req.params.id)
  if (!existing) throw new ApiError(404, 'Project not found')

  const payload = { ...req.body }
  if ('imageUrl' in payload) {
    payload.isFullImage = Boolean(payload.imageUrl)
    if (existing.imageUrl && existing.imageUrl !== payload.imageUrl) {
      await deleteUploadedFile(existing.imageUrl)
    }
  }

  Object.assign(existing, payload)
  await existing.save()
  ok(res, { item: existing })
})

const remove = asyncHandler(async (req, res) => {
  const item = await Project.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Project not found')
  await deleteUploadedFile(item.imageUrl)
  ok(res, { deleted: true, item })
})

export default { ...base, create, update, remove }
