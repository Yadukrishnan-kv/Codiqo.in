import axiosClient from './axiosClient'

export async function fetchDashboard() {
  const { data } = await axiosClient.get('/admin/dashboard')
  return data.data
}
