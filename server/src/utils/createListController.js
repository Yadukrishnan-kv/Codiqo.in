import { asyncHandler } from './asyncHandler.js'
import { ok, ApiError } from './apiResponse.js'

// Shared CRUD + reorder behaviour for every ordered content list (projects,
// services, process steps, why-us reasons, testimonials, faqs, nav links,
// brands). Module-specific controllers call this and override only the
// handlers that need extra behaviour (e.g. Project's image cleanup).
export function createListController(Model, { searchFields = [], filterFields = [] } = {}) {
  function applyExactFilters(req, filter) {
    for (const field of filterFields) {
      if (req.query[field] !== undefined) filter[field] = req.query[field]
    }
  }

  const getPublic = asyncHandler(async (req, res) => {
    const filter = { isActive: true }
    applyExactFilters(req, filter)
    const items = await Model.find(filter).sort({ order: 1 })
    ok(res, { items })
  })

  const getAll = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25))
    const filter = {}
    applyExactFilters(req, filter)

    if (req.query.isActive === 'true') filter.isActive = true
    if (req.query.isActive === 'false') filter.isActive = false

    if (req.query.search && searchFields.length) {
      const regex = new RegExp(req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      filter.$or = searchFields.map((field) => ({ [field]: regex }))
    }

    const [items, total] = await Promise.all([
      Model.find(filter)
        .sort({ order: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Model.countDocuments(filter),
    ])

    ok(res, { items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) })
  })

  const create = asyncHandler(async (req, res) => {
    if (req.body.order === undefined) {
      const last = await Model.findOne().sort({ order: -1 })
      req.body.order = last ? last.order + 1 : 0
    }
    const item = await Model.create(req.body)
    ok(res, { item }, 201)
  })

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) throw new ApiError(404, 'Item not found')
    ok(res, { item })
  })

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id)
    if (!item) throw new ApiError(404, 'Item not found')
    ok(res, { deleted: true, item })
  })

  const toggleActive = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id)
    if (!item) throw new ApiError(404, 'Item not found')
    item.isActive = !item.isActive
    await item.save()
    ok(res, { item })
  })

  const reorder = asyncHandler(async (req, res) => {
    const updates = req.body
    await Model.bulkWrite(
      updates.map(({ id, order }) => ({
        updateOne: { filter: { _id: id }, update: { order } },
      }))
    )
    ok(res, { reordered: true })
  })

  return { getPublic, getAll, create, update, remove, toggleActive, reorder }
}
