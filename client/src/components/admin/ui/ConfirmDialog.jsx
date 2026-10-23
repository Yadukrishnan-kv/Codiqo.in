import React from 'react'
import Modal from './Modal'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
  danger = true,
  submitting = false,
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-foreground transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={submitting}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-60 ${
            danger
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {submitting ? 'Working…' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
