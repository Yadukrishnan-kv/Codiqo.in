import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, inputClass } from './formPrimitives'

const schema = z.object({
  label: z.string().trim().min(1, 'Label is required').max(40),
  href: z.string().trim().min(1, 'Link is required').max(300),
})

export default function NavLinkForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save link' }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { label: '', href: '', ...defaultValues },
  })

  useEffect(() => {
    reset({ label: '', href: '', ...defaultValues })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Label" error={errors.label?.message}>
        <input {...register('label')} className={inputClass} placeholder="Services" />
      </Field>

      <Field label="Link (in-page anchor or URL)" error={errors.href?.message}>
        <input {...register('href')} className={inputClass} placeholder="#services" />
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
