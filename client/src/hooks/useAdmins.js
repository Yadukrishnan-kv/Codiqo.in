import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAdmins, createAdminRequest, updateAdminRequest } from '../api/admins.api'

const QUERY_KEY = ['admin', 'admins']

export function useAdminsList() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: fetchAdmins })
}

function useInvalidateAdmins() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY })
}

export function useCreateAdmin() {
  const invalidate = useInvalidateAdmins()
  return useMutation({ mutationFn: createAdminRequest, onSuccess: invalidate })
}

export function useUpdateAdmin() {
  const invalidate = useInvalidateAdmins()
  return useMutation({
    mutationFn: ({ id, payload }) => updateAdminRequest(id, payload),
    onSuccess: invalidate,
  })
}
