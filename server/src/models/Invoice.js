import mongoose from 'mongoose'

const invoiceItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
)

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },

    client: {
      name: { type: String, required: true, trim: true },
      company: { type: String, trim: true, default: '' },
      email: { type: String, trim: true, lowercase: true, default: '' },
      phone: { type: String, trim: true, default: '' },
    },

    items: {
      type: [invoiceItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'Invoice must have at least one line item',
      },
    },

    currency: { type: String, enum: ['INR', 'USD', 'EUR', 'GBP'], default: 'INR' },

    total: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled'],
      default: 'draft',
    },

    issueDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date, required: true },

    notes: { type: String, trim: true, default: '' },
    paymentInstructions: { type: String, trim: true, default: '' },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
)

invoiceSchema.index({ status: 1 })
invoiceSchema.index({ 'client.name': 1 })

invoiceSchema.pre('validate', function computeTotal(next) {
  this.total = Math.round(this.items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100
  next()
})

export default mongoose.model('Invoice', invoiceSchema)
