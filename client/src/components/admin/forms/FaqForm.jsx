import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, inputClass, textareaClass } from './formPrimitives'

const schema = z.object({
  question: z.string().trim().min(1, 'Question is required').max(200),
  answer: z.string().trim().min(1, 'Answer is required').max(1000),
})

export default function FaqForm({ defaultValues, onSubmit, submitting, submitLabel = 'Save FAQ' }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { question: '', answer: '', ...defaultValues },
  })

  useEffect(() => {
    reset({ question: '', answer: '', ...defaultValues })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Question" error={errors.question?.message}>
        <input {...register('question')} className={inputClass} placeholder="How long does a project take?" />
      </Field>

      <Field label="Answer" error={errors.answer?.message}>
        <textarea {...register('answer')} rows={4} className={textareaClass} placeholder="Write a clear answer…" />
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
