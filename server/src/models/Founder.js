import mongoose from 'mongoose'
import { ICON_KEYS } from '../utils/iconOptions.js'

const founderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    initials: { type: String, required: true, trim: true },
    establishedLabel: { type: String, trim: true, default: '' },
    bioParagraph1: { type: String, required: true, trim: true },
    bioParagraph2: { type: String, trim: true, default: '' },
    highlight1Icon: { type: String, enum: ICON_KEYS, required: true },
    highlight1Label: { type: String, required: true, trim: true },
    highlight1Value: { type: String, required: true, trim: true },
    highlight2Icon: { type: String, enum: ICON_KEYS, required: true },
    highlight2Label: { type: String, required: true, trim: true },
    highlight2Value: { type: String, required: true, trim: true },
    highlight3Icon: { type: String, enum: ICON_KEYS, required: true },
    highlight3Label: { type: String, required: true, trim: true },
    highlight3Value: { type: String, required: true, trim: true },
    primaryCtaLabel: { type: String, required: true, trim: true },
    primaryCtaHref: { type: String, required: true, trim: true },
    secondaryCtaLabel: { type: String, required: true, trim: true },
    secondaryCtaHref: { type: String, required: true, trim: true },
    photoUrl: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Founder', founderSchema)
