import { useQuery } from '@tanstack/react-query'
import { fetchHomepage } from '../api/homepage.api'

export function useHomepage() {
  return useQuery({
    queryKey: ['public', 'homepage'],
    queryFn: fetchHomepage,
    staleTime: 60 * 1000,
  })
}
