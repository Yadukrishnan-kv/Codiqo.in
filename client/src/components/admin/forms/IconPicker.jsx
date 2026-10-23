import React from 'react'
import { ICON_OPTIONS, ICON_KEYS } from '../../../utils/iconOptions'
import { inputClass } from './formPrimitives'

export default function IconPicker({ value, onChange }) {
  const SelectedIcon = ICON_OPTIONS[value]

  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {SelectedIcon && <SelectedIcon className="w-5 h-5" />}
      </div>
      <select className={inputClass + ' mt-0'} value={value} onChange={(e) => onChange(e.target.value)}>
        {ICON_KEYS.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}
