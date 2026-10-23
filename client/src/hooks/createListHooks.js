import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Mirrors createListApi — one factory call produces the standard
// list/create/update/delete/toggle/reorder hooks for an admin CRUD screen.
export function createListHooks(queryKey, api) {
  function useList(params) {
    return useQuery({
      queryKey: [...queryKey, params],
      queryFn: () => api.fetchAll(params),
      placeholderData: keepPreviousData,
    })
  }

  function useInvalidate() {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey })
  }

  function useCreate() {
    const invalidate = useInvalidate()
    return useMutation({ mutationFn: api.create, onSuccess: invalidate })
  }

  function useUpdate() {
    const invalidate = useInvalidate()
    return useMutation({
      mutationFn: ({ id, payload }) => api.update(id, payload),
      onSuccess: invalidate,
    })
  }

  function useDelete() {
    const invalidate = useInvalidate()
    return useMutation({ mutationFn: api.remove, onSuccess: invalidate })
  }

  function useToggle() {
    const invalidate = useInvalidate()
    return useMutation({ mutationFn: api.toggle, onSuccess: invalidate })
  }

  function useReorder() {
    const invalidate = useInvalidate()
    return useMutation({ mutationFn: api.reorder, onSuccess: invalidate })
  }

  return { useList, useCreate, useUpdate, useDelete, useToggle, useReorder }
}
