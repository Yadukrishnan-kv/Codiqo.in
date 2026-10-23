import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true, default: '' },
    gradientFrom: { type: String, trim: true, default: 'from-slate-950' },
    gradientVia: { type: String, trim: true, default: 'via-slate-900' },
    gradientTo: { type: String, trim: true, default: 'to-slate-950' },
    isFullImage: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

projectSchema.index({ order: 1 })
projectSchema.index({ isFeatured: 1 })

export default mongoose.model('Project', projectSchema)
