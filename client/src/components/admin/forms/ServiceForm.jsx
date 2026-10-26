import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import IconPicker from './IconPicker'
import TagListField from './TagListField'
import ImageUploader from '../ui/ImageUploader'
import { Field, inputClass, textareaClass } from './formPrimitives'
import { ICON_KEYS } from '../../../utils/iconOptions'

const schema = z.object({
  icon: z.enum(ICON_KEYS),
  title: z.string().trim().min(1, 'Title is required').max(120),
  category: z.string().trim().max(60).optional(),
  description: z.string().trim().min(1, 'Description is required').max(500),
  imageUrl: z.string().trim().optional(),
  price: z.coerce.number().nonnegative('Price cannot be negative'),
  priceNote: z.string().trim().max(40).optional(),
  bullets: z.array(z.object({ value: z.string().trim().min(1).max(120) })).max(6),
})

function toDefaults(defaultValues) {
  return {
    icon: defaultValues?.icon || ICON_KEYS[0],
    title: defaultValues?.title || '',
    category: defaultValues?.category || '',
    description: defaultValues?.description || '',
    imageUrl: defaultValues?.imageUrl || '',
    price: defaultValues?.price ?? 0,
    priceNote: defaultValues?.priceNote || 'one-time',
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
      category: values.category,
      description: values.description,
      imageUrl: values.imageUrl,
      price: values.price,
      priceNote: values.priceNote,
      bullets: values.bullets.map((b) => b.value),
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <Field label="Card image">
        <div className="mt-2">
          <ImageUploader value={watch('imageUrl')} onChange={(url) => setValue('imageUrl', url, { shouldDirty: true })} />
        </div>
      </Field>

      <Field label={`Icon (admin list only — card type: ${type === 'main' ? 'Main service' : 'Sub service'})`}>
        <IconPicker value={watch('icon')} onChange={(v) => setValue('icon', v, { shouldDirty: true })} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" error={errors.title?.message}>
          <input {...register('title')} className={inputClass} placeholder="Static Website" />
        </Field>
        <Field label="Category tag" error={errors.category?.message}>
          <input {...register('category')} className={inputClass} placeholder="Business" />
        </Field>
      </div>

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register('description')} rows={3} className={textareaClass} placeholder="Short description…" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Price (₹)" error={errors.price?.message}>
          <input {...register('price')} type="number" min="0" step="1" className={inputClass} placeholder="1999" />
        </Field>
        <Field label="Price note" error={errors.priceNote?.message}>
          <input {...register('priceNote')} className={inputClass} placeholder="one-time" />
        </Field>
      </div>

      <TagListField
        control={control}
        register={register}
        name="bullets"
        label="Bullet points"
        placeholder="Mobile friendly"
        max={6}
      />

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
