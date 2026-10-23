import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import IconPicker from './IconPicker'
import TagListField from './TagListField'
import { Field, inputClass, textareaClass } from './formPrimitives'
import { ICON_KEYS } from '../../../utils/iconOptions'

const schema = z.object({
  icon: z.enum(ICON_KEYS),
  title: z.string().trim().min(1, 'Title is required').max(120),
  description: z.string().trim().min(1, 'Description is required').max(500),
  bullets: z.array(z.object({ value: z.string().trim().min(1).max(120) })).max(6),
})

function toDefaults(defaultValues) {
  return {
    icon: defaultValues?.icon || ICON_KEYS[0],
    title: defaultValues?.title || '',
    description: defaultValues?.description || '',
    bullets: (defaultValues?.bullets || []).map((value) => ({ value })),
  }
}

export default function ServiceForm({ type, defaultValues, onSubmit, submitting, submitLabel = 'Save service' }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: toDefaults(defaultValues),
  })

  useEffect(() => {
    reset(toDefaults(defaultValues))
  }, [defaultValues, reset])

  const submit = (values) => {
    onSubmit({
      type,
      icon: values.icon,
      title: values.title,
      description: values.description,
      bullets: type === 'main' ? values.bullets.map((b) => b.value) : [],
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <Field label={`Service type: ${type === 'main' ? 'Main service' : 'Sub service'}`}>
        <IconPicker value={watch('icon')} onChange={(v) => setValue('icon', v, { shouldDirty: true })} />
      </Field>

      <Field label="Title" error={errors.title?.message}>
        <input {...register('title')} className={inputClass} placeholder="Static Websites" />
      </Field>

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register('description')} rows={3} className={textareaClass} placeholder="Short description…" />
      </Field>

      {type === 'main' && (
        <TagListField
          control={control}
          register={register}
          name="bullets"
          label="Bullet points"
          placeholder="Lightning-Fast Loading"
          max={6}
        />
      )}

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
