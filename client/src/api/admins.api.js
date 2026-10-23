import axiosClient from './axiosClient'

export async function fetchAdmins() {
  const { data } = await axiosClient.get('/auth/admins')
  return data.data.admins
}

export async function createAdminRequest(payload) {
  const { data } = await axiosClient.post('/auth/admins', payload)
  return data.data.admin
}

export async function updateAdminRequest(id, payload) {
  const { data } = await axiosClient.put(`/auth/admins/${id}`, payload)
  return data.data.admin
}
