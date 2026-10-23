import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import IconPicker from './IconPicker'
import { Field, inputClass, textareaClass } from './formPrimitives'
import { ICON_KEYS } from '../../../utils/iconOptions'

const schema = z.object({
  icon: z.enum(ICON_KEYS),
  title: z.string().trim().min(1, 'Title is required').max(80),
  description: z.string().trim().min(1, 'Description is required').max(300),
})

export default function WhyUsForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save reason' }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { icon: ICON_KEYS[0], title: '', description: '', ...defaultValues },
  })

  useEffect(() => {
    reset({ icon: ICON_KEYS[0], title: '', description: '', ...defaultValues })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Icon">
        <IconPicker value={watch('icon')} onChange={(v) => setValue('icon', v, { shouldDirty: true })} />
      </Field>

      <Field label="Title" error={errors.title?.message}>
        <input {...register('title')} className={inputClass} placeholder="Fast Delivery" />
      </Field>

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register('description')} rows={3} className={textareaClass} placeholder="Short description…" />
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
