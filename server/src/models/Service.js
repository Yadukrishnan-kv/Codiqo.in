import mongoose from 'mongoose'
import { ICON_KEYS } from '../utils/iconOptions.js'

const serviceSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['main', 'sub'], required: true },
    icon: { type: String, enum: ICON_KEYS, required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: '' },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true, default: '' },
    price: { type: Number, default: 0, min: 0 },
    priceNote: { type: String, trim: true, default: 'one-time' },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

serviceSchema.index({ type: 1, order: 1 })

export default mongoose.model('Service', serviceSchema)
