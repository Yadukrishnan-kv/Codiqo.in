import mongoose from 'mongoose'

const auditLogSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    adminName: { type: String, trim: true, default: '' },
    action: {
      type: String,
      enum: ['create', 'update', 'delete', 'toggle', 'reorder', 'login'],
      required: true,
    },
    module: { type: String, required: true, trim: true },
    recordId: { type: mongoose.Schema.Types.ObjectId },
    summary: { type: String, trim: true, default: '' },
    ip: { type: String, trim: true, default: '' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

auditLogSchema.index({ createdAt: -1 })
auditLogSchema.index({ admin: 1, createdAt: -1 })
auditLogSchema.index({ module: 1, createdAt: -1 })

export default mongoose.model('AuditLog', auditLogSchema)
