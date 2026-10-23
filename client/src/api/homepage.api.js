import axiosClient from './axiosClient'

export async function fetchHomepage() {
  const { data } = await axiosClient.get('/content/homepage')
  return data.data
}
