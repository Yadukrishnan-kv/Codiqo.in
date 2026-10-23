import { useQuery } from '@tanstack/react-query'
import { fetchDashboard } from '../api/admin.api'

export function useDashboard() {
  return useQuery({ queryKey: ['admin', 'dashboard'], queryFn: fetchDashboard })
}
