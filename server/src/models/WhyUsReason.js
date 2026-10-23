import mongoose from 'mongoose'
import { ICON_KEYS } from '../utils/iconOptions.js'

const whyUsReasonSchema = new mongoose.Schema(
  {
    icon: { type: String, enum: ICON_KEYS, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

whyUsReasonSchema.index({ order: 1 })

export default mongoose.model('WhyUsReason', whyUsReasonSchema)
