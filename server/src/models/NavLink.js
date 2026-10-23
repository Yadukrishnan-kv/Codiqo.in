import mongoose from 'mongoose'

const navLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

navLinkSchema.index({ order: 1 })

export default mongoose.model('NavLink', navLinkSchema)
