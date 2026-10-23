import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ImageUploader from '../ui/ImageUploader'
import { Field, inputClass } from './formPrimitives'

const GRADIENT_PRESETS = [
  { label: 'Emerald / Teal / Indigo', from: 'from-emerald-950', via: 'via-teal-900', to: 'to-indigo-950' },
  { label: 'Blue / Slate / Sky', from: 'from-blue-950', via: 'via-slate-900', to: 'to-sky-950' },
  { label: 'Teal / Cyan / Emerald', from: 'from-teal-950', via: 'via-cyan-900', to: 'to-emerald-950' },
  { label: 'Neutral / Stone / Red', from: 'from-neutral-950', via: 'via-stone-900', to: 'to-red-950' },
  { label: 'Indigo / Purple / Pink', from: 'from-indigo-950', via: 'via-purple-900', to: 'to-pink-950' },
]

const schema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  tag: z.string().trim().min(1, 'Tag is required').max(160),
  year: z.string().trim().length(4, 'Use a 4-digit year'),
  url: z.string().trim().url('Enter a valid URL'),
  imageUrl: z.string().trim().optional(),
  gradientFrom: z.string().trim().optional(),
  gradientVia: z.string().trim().optional(),
  gradientTo: z.string().trim().optional(),
  isFeatured: z.boolean().optional(),
})

function emptyDefaults() {
  return {
    title: '',
    tag: '',
    year: String(new Date().getFullYear()),
    url: '',
    imageUrl: '',
    gradientFrom: GRADIENT_PRESETS[0].from,
    gradientVia: GRADIENT_PRESETS[0].via,
    gradientTo: GRADIENT_PRESETS[0].to,
    isFeatured: false,
  }
}

export default function ProjectForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save project' }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...emptyDefaults(), ...defaultValues },
  })

  useEffect(() => {
    reset({ ...emptyDefaults(), ...defaultValues })
  }, [defaultValues, reset])

  const imageUrl = watch('imageUrl')
  const activePresetIndex = GRADIENT_PRESETS.findIndex((p) => p.from === watch('gradientFrom'))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" error={errors.title?.message}>
          <input {...register('title')} className={inputClass} placeholder="Fitbite" />
        </Field>
        <Field label="Year" error={errors.year?.message}>
          <input {...register('year')} className={inputClass} placeholder="2026" />
        </Field>
      </div>

      <Field label="Tag line" error={errors.tag?.message}>
        <input {...register('tag')} className={inputClass} placeholder="Where Nutrition Meets Results" />
      </Field>

      <Field label="Project URL" error={errors.url?.message}>
        <input {...register('url')} className={inputClass} placeholder="https://example.com" />
      </Field>

      <Field label="Cover image (optional — falls back to a gradient motif)">
        <ImageUploader value={imageUrl} onChange={(url) => setValue('imageUrl', url, { shouldDirty: true })} />
      </Field>

      {!imageUrl && (
        <Field label="Gradient theme">
          <select
            className={inputClass}
            value={activePresetIndex === -1 ? 0 : activePresetIndex}
            onChange={(e) => {
              const preset = GRADIENT_PRESETS[Number(e.target.value)]
              setValue('gradientFrom', preset.from)
              setValue('gradientVia', preset.via)
              setValue('gradientTo', preset.to)
            }}
          >
            {GRADIENT_PRESETS.map((preset, index) => (
              <option key={preset.label} value={index}>
                {preset.label}
              </option>
            ))}
          </select>
        </Field>
      )}

      <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
        <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 accent-primary" />
        Feature this project
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-60"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
