import axiosClient from './axiosClient'

// Mirrors the server's createListController — one factory call replaces a
// hand-written CRUD api file for every ordered content module.
export function createListApi(resourcePath) {
  const base = `/content/${resourcePath}`

  return {
    fetchAll: async (params = {}) => {
      const { data } = await axiosClient.get(`${base}/all`, { params })
      return data.data
    },
    create: async (payload) => {
      const { data } = await axiosClient.post(base, payload)
      return data.data.item
    },
    update: async (id, payload) => {
      const { data } = await axiosClient.put(`${base}/${id}`, payload)
      return data.data.item
    },
    remove: async (id) => {
      await axiosClient.delete(`${base}/${id}`)
    },
    toggle: async (id) => {
      const { data } = await axiosClient.patch(`${base}/${id}/toggle`)
      return data.data.item
    },
    reorder: async (updates) => {
      await axiosClient.patch(`${base}/reorder`, updates)
    },
  }
}
