import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, inputClass, textareaClass } from './formPrimitives'

const schema = z.object({
  badgeText: z.string().trim().min(1, 'Required').max(80),
  headingLine1: z.string().trim().min(1, 'Required').max(60),
  headingLine2: z.string().trim().min(1, 'Required').max(60),
  headingLine3: z.string().trim().min(1, 'Required').max(60),
  paragraph: z.string().trim().min(1, 'Required').max(400),
  primaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  primaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  secondaryCtaLabel: z.string().trim().min(1, 'Required').max(40),
  secondaryCtaHref: z.string().trim().min(1, 'Required').max(200),
  widgetTopLeft: z.string().trim().max(60).optional(),
  widgetBottomLeft: z.string().trim().max(60).optional(),
  widgetTopRight: z.string().trim().max(60).optional(),
  widgetBottomRight: z.string().trim().max(60).optional(),
})

export default function HeroForm({ defaultValues, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues })

  useEffect(() => {
    if (defaultValues) reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      <section>
        <h2 className="font-display text-lg font-bold mb-4">Badge &amp; heading</h2>
        <div className="space-y-5">
          <Field label="Badge text" error={errors.badgeText?.message}>
            <input {...register('badgeText')} className={inputClass} />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Heading line 1" error={errors.headingLine1?.message}>
              <input {...register('headingLine1')} className={inputClass} />
            </Field>
            <Field label="Heading line 2" error={errors.headingLine2?.message}>
              <input {...register('headingLine2')} className={inputClass} />
            </Field>
            <Field label="Heading line 3 (highlighted)" error={errors.headingLine3?.message}>
              <input {...register('headingLine3')} className={inputClass} />
            </Field>
          </div>
          <Field label="Paragraph" error={errors.paragraph?.message}>
            <textarea {...register('paragraph')} rows={3} className={textareaClass} />
          </Field>
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

      <section>
        <h2 className="font-display text-lg font-bold mb-1">Floating widget labels</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The four small chips floating around the hero visual.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Top left">
            <input {...register('widgetTopLeft')} className={inputClass} />
          </Field>
          <Field label="Top right">
            <input {...register('widgetTopRight')} className={inputClass} />
          </Field>
          <Field label="Bottom left">
            <input {...register('widgetBottomLeft')} className={inputClass} />
          </Field>
          <Field label="Bottom right">
            <input {...register('widgetBottomRight')} className={inputClass} />
          </Field>
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
