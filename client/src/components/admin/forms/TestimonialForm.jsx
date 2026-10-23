import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star } from 'lucide-react'
import ImageUploader from '../ui/ImageUploader'
import { Field, inputClass, textareaClass } from './formPrimitives'

const schema = z.object({
  quote: z.string().trim().min(1, 'Quote is required').max(500),
  name: z.string().trim().min(1, 'Name is required').max(100),
  role: z.string().trim().min(1, 'Role is required').max(120),
  rating: z.number().int().min(1).max(5),
  avatarUrl: z.string().trim().optional(),
})

function defaults(defaultValues) {
  return {
    quote: '',
    name: '',
    role: '',
    rating: 5,
    avatarUrl: '',
    ...defaultValues,
  }
}

export default function TestimonialForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save testimonial' }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults(defaultValues),
  })

  useEffect(() => {
    reset(defaults(defaultValues))
  }, [defaultValues, reset])

  const rating = watch('rating')
  const avatarUrl = watch('avatarUrl')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Quote" error={errors.quote?.message}>
        <textarea {...register('quote')} rows={3} className={textareaClass} placeholder="What they said about working with you…" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" error={errors.name?.message}>
          <input {...register('name')} className={inputClass} placeholder="Vinayak T V" />
        </Field>
        <Field label="Role" error={errors.role?.message}>
          <input {...register('role')} className={inputClass} placeholder="Founder, Fitbite" />
        </Field>
      </div>

      <Field label="Rating">
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue('rating', n, { shouldDirty: true })}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
            >
              <Star className={`w-6 h-6 ${n <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            </button>
          ))}
        </div>
      </Field>

      <Field label="Avatar (optional)">
        <ImageUploader
          value={avatarUrl}
          onChange={(url) => setValue('avatarUrl', url, { shouldDirty: true })}
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
