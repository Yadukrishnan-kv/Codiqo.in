import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function createSingletonHooks(queryKey, api) {
  function useGet() {
    return useQuery({ queryKey, queryFn: api.fetch })
  }

  function useUpdate() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: api.update,
      onSuccess: (item) => queryClient.setQueryData(queryKey, item),
    })
  }

  return { useGet, useUpdate }
}
