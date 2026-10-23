import axiosClient from './axiosClient'

export async function loginRequest(email, password) {
  const { data } = await axiosClient.post('/auth/login', { email, password })
  return data.data.admin
}

export async function logoutRequest() {
  await axiosClient.post('/auth/logout')
}

export async function fetchCurrentAdmin() {
  const { data } = await axiosClient.get('/auth/me')
  return data.data.admin
}

export async function changePasswordRequest(currentPassword, newPassword) {
  await axiosClient.post('/auth/change-password', { currentPassword, newPassword })
}
