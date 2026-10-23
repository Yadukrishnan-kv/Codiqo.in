import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatarUrl: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

testimonialSchema.index({ order: 1 })

export default mongoose.model('Testimonial', testimonialSchema)
