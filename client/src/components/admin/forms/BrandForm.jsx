import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ImageUploader from '../ui/ImageUploader'
import { Field, inputClass } from './formPrimitives'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(60),
  logoUrl: z.string().trim().optional(),
})

export default function BrandForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save brand' }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', logoUrl: '', ...defaultValues },
  })

  useEffect(() => {
    reset({ name: '', logoUrl: '', ...defaultValues })
  }, [defaultValues, reset])

  const logoUrl = watch('logoUrl')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Brand name" error={errors.name?.message}>
        <input {...register('name')} className={inputClass} placeholder="Nordic" />
      </Field>

      <Field label="Logo (optional — falls back to a text wordmark)">
        <ImageUploader
          value={logoUrl}
          onChange={(url) => setValue('logoUrl', url, { shouldDirty: true })}
          aspect="aspect-square"
          className="w-24"
        />
      </Field>

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
