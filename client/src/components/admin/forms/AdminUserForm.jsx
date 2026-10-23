import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, inputClass } from './formPrimitives'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['superadmin', 'editor']),
})

export default function AdminUserForm({ onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', role: 'editor' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Name" error={errors.name?.message}>
        <input {...register('name')} className={inputClass} placeholder="Jane Doe" />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input {...register('email')} className={inputClass} placeholder="jane@codiqo.in" />
      </Field>

      <Field label="Temporary password" error={errors.password?.message}>
        <input {...register('password')} type="password" className={inputClass} placeholder="At least 8 characters" />
      </Field>

      <Field label="Role">
        <select {...register('role')} className={inputClass}>
          <option value="editor">Editor — content access</option>
          <option value="superadmin">Superadmin — full access</option>
        </select>
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-60"
      >
        {submitting ? 'Inviting…' : 'Invite admin'}
      </button>
    </form>
  )
}
