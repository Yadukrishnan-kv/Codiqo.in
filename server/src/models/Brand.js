import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

brandSchema.index({ order: 1 })

export default mongoose.model('Brand', brandSchema)
