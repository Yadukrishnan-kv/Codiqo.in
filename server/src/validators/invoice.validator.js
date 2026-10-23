import { z } from 'zod'

const itemSchema = z.object({
  description: z.string().trim().min(1, 'Item description is required').max(300),
  amount: z.number().min(0, 'Amount cannot be negative'),
})

const clientSchema = z.object({
  name: z.string().trim().min(1, 'Client name is required').max(120),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email('Enter a valid email').optional().or(z.literal('')),
  phone: z.string().trim().max(30).optional(),
})

export const createInvoiceSchema = z.object({
  client: clientSchema,
  items: z.array(itemSchema).min(1, 'Add at least one line item'),
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP']).optional().default('INR'),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
  issueDate: z.coerce.date().optional(),
  dueDate: z.coerce.date(),
  notes: z.string().trim().max(1000).optional(),
  paymentInstructions: z.string().trim().max(1000).optional(),
})

export const updateInvoiceSchema = createInvoiceSchema.partial().extend({
  items: z.array(itemSchema).min(1, 'Add at least one line item').optional(),
})

export const updateInvoiceStatusSchema = z.object({
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
})
