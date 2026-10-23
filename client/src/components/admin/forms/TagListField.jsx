import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { Plus, X } from 'lucide-react'
import { inputClass } from './formPrimitives'

export default function TagListField({ control, register, name, label, placeholder, max = 10 }) {
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <div>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="mt-2 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              {...register(`${name}.${index}.value`)}
              className={inputClass + ' mt-0'}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="w-10 h-10 shrink-0 rounded-xl border border-border flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {fields.length < max && (
          <button
            type="button"
            onClick={() => append({ value: '' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>
    </div>
  )
}
