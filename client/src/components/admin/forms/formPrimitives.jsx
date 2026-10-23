import React from 'react'

export const inputClass =
  'mt-2 w-full bg-background border border-border rounded-2xl py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm'

export const textareaClass = `${inputClass} resize-none`

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </label>
  )
}
