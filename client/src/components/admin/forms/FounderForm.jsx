import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import IconPicker from './IconPicker'
import ImageUploader from '../ui/ImageUploader'
import { Field, inputClass, textareaClass } from './formPrimitives'
import { ICON_KEYS } from '../../../utils/iconOptions'

const schema = z.object({
  name: z.string().trim().min(1, 'Required').max(100),
  initials: z.string().trim().min(1, 'Required').max(10),
  establishedLabel: z.string().trim().max(40).optional(),
  bioParagraph1: z.string().trim().min(1, 'Required').max(600),
  bioParagraph2: z.string().trim().max(600).optional(),
  highlight1Icon: z.enum(ICON_KEYS),
  highlight1Label: z.string().trim().min(1).max(30),
  highlight1Value: z.string().trim().min(1).max(60),
  highlight2Icon: z.enum(ICON_KEYS),
  highlight2Label: z.string().trim().min(1).max(30),
  highlight2Value: z.string().trim().min(1).max(60),
  highlight3Icon: z.enum(ICON_KEYS),
  highlight3Label: z.string().trim().min(1).max(30),
  highlight3Value: z.string().trim().min(1).max(60),
  primaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  primaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  secondaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  secondaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  photoUrl: z.string().trim().optional(),
})

export default function FounderForm({ defaultValues, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      <section>
        <h2 className="font-display text-lg font-bold mb-4">Identity</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <Field label="Name" error={errors.name?.message}>
            <input {...register('name')} className={inputClass} />
          </Field>
          <Field label="Initials" error={errors.initials?.message}>
            <input {...register('initials')} className={inputClass} />
          </Field>
          <Field label="Established label">
            <input {...register('establishedLabel')} className={inputClass} placeholder="Est. 2024" />
          </Field>
        </div>
        <Field label="Photo (optional — falls back to the initials graphic)">
          <ImageUploader
            value={watch('photoUrl')}
            onChange={(url) => setValue('photoUrl', url, { shouldDirty: true })}
            aspect="aspect-square"
            className="w-32"
          />
        </Field>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold mb-4">Bio</h2>
        <div className="space-y-5">
          <Field label="Paragraph 1" error={errors.bioParagraph1?.message}>
            <textarea {...register('bioParagraph1')} rows={3} className={textareaClass} />
          </Field>
          <Field label="Paragraph 2" error={errors.bioParagraph2?.message}>
            <textarea {...register('bioParagraph2')} rows={3} className={textareaClass} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold mb-4">Highlights</h2>
        <div className="space-y-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="grid sm:grid-cols-3 gap-4 p-4 rounded-2xl border border-border">
              <Field label={`Highlight ${n} icon`}>
                <IconPicker
                  value={watch(`highlight${n}Icon`)}
                  onChange={(v) => setValue(`highlight${n}Icon`, v, { shouldDirty: true })}
                />
              </Field>
              <Field label="Label" error={errors[`highlight${n}Label`]?.message}>
                <input {...register(`highlight${n}Label`)} className={inputClass} />
              </Field>
              <Field label="Value" error={errors[`highlight${n}Value`]?.message}>
                <input {...register(`highlight${n}Value`)} className={inputClass} />
              </Field>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold mb-4">Call to action buttons</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-5">
            <Field label="Primary button label" error={errors.primaryCtaLabel?.message}>
              <input {...register('primaryCtaLabel')} className={inputClass} />
            </Field>
            <Field label="Primary button link" error={errors.primaryCtaHref?.message}>
              <input {...register('primaryCtaHref')} className={inputClass} />
            </Field>
          </div>
          <div className="space-y-5">
            <Field label="Secondary button label" error={errors.secondaryCtaLabel?.message}>
              <input {...register('secondaryCtaLabel')} className={inputClass} />
            </Field>
            <Field label="Secondary button link" error={errors.secondaryCtaHref?.message}>
              <input {...register('secondaryCtaHref')} className={inputClass} />
            </Field>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-60"
      >
        {submitting ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}
