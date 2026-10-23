import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema(
  {
    badgeText: { type: String, required: true, trim: true },
    headingLine1: { type: String, required: true, trim: true },
    headingLine2: { type: String, required: true, trim: true },
    headingLine3: { type: String, required: true, trim: true },
    paragraph: { type: String, required: true, trim: true },
    primaryCtaLabel: { type: String, required: true, trim: true },
    primaryCtaHref: { type: String, required: true, trim: true },
    secondaryCtaLabel: { type: String, required: true, trim: true },
    secondaryCtaHref: { type: String, required: true, trim: true },
    widgetTopLeft: { type: String, trim: true, default: '' },
    widgetBottomLeft: { type: String, trim: true, default: '' },
    widgetTopRight: { type: String, trim: true, default: '' },
    widgetBottomRight: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Hero', heroSchema)
