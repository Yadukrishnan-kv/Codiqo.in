import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, inputClass, textareaClass } from './formPrimitives'

const schema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(80),
  description: z.string().trim().min(1, 'Description is required').max(400),
})

export default function ProcessStepForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save step' }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', ...defaultValues },
  })

  useEffect(() => {
    reset({ title: '', description: '', ...defaultValues })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Title" error={errors.title?.message}>
        <input {...register('title')} className={inputClass} placeholder="Research" />
      </Field>

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register('description')} rows={3} className={textareaClass} placeholder="What this step covers…" />
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
