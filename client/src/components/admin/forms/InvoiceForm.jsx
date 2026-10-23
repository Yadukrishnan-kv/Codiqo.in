import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, X } from 'lucide-react'
import { Field, inputClass, textareaClass } from './formPrimitives'

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP']

const itemSchema = z.object({
  description: z.string().trim().min(1, 'Required'),
  amount: z.coerce.number().min(0, 'Must be 0 or more'),
})

const schema = z.object({
  client: z.object({
    name: z.string().trim().min(1, 'Client name is required').max(120),
    company: z.string().trim().max(120).optional(),
    email: z.string().trim().email('Enter a valid email').optional().or(z.literal('')),
    phone: z.string().trim().max(30).optional(),
  }),
  items: z.array(itemSchema).min(1, 'Add at least one line item'),
  currency: z.enum(CURRENCIES),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  notes: z.string().trim().max(1000).optional(),
  paymentInstructions: z.string().trim().max(1000).optional(),
})

function toDateInput(value) {
  if (!value) return ''
  return new Date(value).toISOString().slice(0, 10)
}

function emptyDefaults() {
  return {
    client: { name: '', company: '', email: '', phone: '' },
    items: [{ description: '', amount: 0 }],
    currency: 'INR',
    issueDate: toDateInput(new Date()),
    dueDate: '',
    notes: '',
    paymentInstructions: '',
  }
}

export default function InvoiceForm({ defaultValues, onSubmit, submitting, submitLabel = 'Create invoice' }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...emptyDefaults(),
      ...defaultValues,
      issueDate: toDateInput(defaultValues?.issueDate || new Date()),
      dueDate: toDateInput(defaultValues?.dueDate),
    },
  })

  useEffect(() => {
    reset({
      ...emptyDefaults(),
      ...defaultValues,
      issueDate: toDateInput(defaultValues?.issueDate || new Date()),
      dueDate: toDateInput(defaultValues?.dueDate),
    })
  }, [defaultValues, reset])

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const items = watch('items')
  const currency = watch('currency')

  const total = (items || []).reduce((sum, item) => sum + (Number(item?.amount) || 0), 0)

  const money = (value) =>
    `${currency} ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
      value || 0
    )}`

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Client</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Client name" error={errors.client?.name?.message}>
            <input {...register('client.name')} className={inputClass} placeholder="Jane Doe" />
          </Field>
          <Field label="Company (optional)" error={errors.client?.company?.message}>
            <input {...register('client.company')} className={inputClass} placeholder="Acme Inc." />
          </Field>
          <Field label="Email (optional)" error={errors.client?.email?.message}>
            <input {...register('client.email')} className={inputClass} placeholder="jane@acme.com" />
          </Field>
          <Field label="Phone (optional)" error={errors.client?.phone?.message}>
            <input {...register('client.phone')} className={inputClass} placeholder="+91 90000 00000" />
          </Field>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Issue date" error={errors.issueDate?.message}>
          <input type="date" {...register('issueDate')} className={inputClass} />
        </Field>
        <Field label="Due date" error={errors.dueDate?.message}>
          <input type="date" {...register('dueDate')} className={inputClass} />
        </Field>
        <Field label="Currency">
          <select {...register('currency')} className={inputClass}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Line items</h3>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_130px_auto] gap-2 items-start">
              <Field label={index === 0 ? 'Description' : ''} error={errors.items?.[index]?.description?.message}>
                <input
                  {...register(`items.${index}.description`)}
                  className={inputClass}
                  placeholder="Website design & development"
                />
              </Field>
              <Field label={index === 0 ? 'Amount' : ''} error={errors.items?.[index]?.amount?.message}>
                <input type="number" step="0.01" {...register(`items.${index}.amount`)} className={inputClass} />
              </Field>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className={`shrink-0 w-11 h-11 rounded-xl border border-border flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors disabled:opacity-30 ${
                  index === 0 ? 'mt-7' : ''
                }`}
                aria-label="Remove item"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {errors.items?.message && <p className="mt-1.5 text-xs text-red-400">{errors.items.message}</p>}
        <button
          type="button"
          onClick={() => append({ description: '', amount: 0 })}
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add line item
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-background p-4 flex justify-between font-bold text-base">
        <span>Total due</span>
        <span>{money(total)}</span>
      </div>

      <Field label="Notes (optional)" error={errors.notes?.message}>
        <textarea {...register('notes')} rows={2} className={textareaClass} placeholder="Thanks for your business!" />
      </Field>

      <Field label="Payment instructions (optional)" error={errors.paymentInstructions?.message}>
        <textarea
          {...register('paymentInstructions')}
          rows={2}
          className={textareaClass}
          placeholder="Bank transfer / UPI details…"
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
