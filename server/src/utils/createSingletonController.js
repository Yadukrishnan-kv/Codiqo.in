import { asyncHandler } from './asyncHandler.js'
import { ok } from './apiResponse.js'

// For one-document content (Hero, Founder, Site Settings). The first GET
// lazily creates the doc from `defaults` so the admin never sees a blank
// form; every PUT thereafter upserts the same single document.
export function createSingletonController(Model, defaults = {}) {
  async function getOrCreate() {
    let doc = await Model.findOne()
    if (!doc) {
      doc = await Model.create(defaults)
    }
    return doc
  }

  const getPublic = asyncHandler(async (req, res) => {
    const doc = await getOrCreate()
    ok(res, { item: doc })
  })

  const update = asyncHandler(async (req, res) => {
    const doc = await Model.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    })
    ok(res, { item: doc })
  })

  return { getPublic, update, getOrCreate }
}
