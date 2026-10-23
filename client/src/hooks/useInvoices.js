import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchInvoices,
  fetchInvoice,
  createInvoice,
  updateInvoice,
  updateInvoiceStatus,
  deleteInvoice,
} from '../api/invoices.api'

const QUERY_KEY = ['admin', 'invoices']

export function useInvoicesList(params) {
  return useQuery({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchInvoices(params),
    placeholderData: keepPreviousData,
  })
}

export function useInvoice(id) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => fetchInvoice(id),
    enabled: Boolean(id),
  })
}

function useInvalidateInvoices() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY })
}

export function useCreateInvoice() {
  const invalidate = useInvalidateInvoices()
  return useMutation({ mutationFn: createInvoice, onSuccess: invalidate })
}

export function useUpdateInvoice() {
  const invalidate = useInvalidateInvoices()
  return useMutation({
    mutationFn: ({ id, payload }) => updateInvoice(id, payload),
    onSuccess: invalidate,
  })
}

export function useUpdateInvoiceStatus() {
  const invalidate = useInvalidateInvoices()
  return useMutation({
    mutationFn: ({ id, status }) => updateInvoiceStatus(id, status),
    onSuccess: invalidate,
  })
}

export function useDeleteInvoice() {
  const invalidate = useInvalidateInvoices()
  return useMutation({ mutationFn: deleteInvoice, onSuccess: invalidate })
}
