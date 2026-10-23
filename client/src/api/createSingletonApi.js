import axiosClient from './axiosClient'

// Mirrors createListApi, for one-document resources (Hero, Founder, Site
// Settings). `basePath` is the full API path, e.g. '/content/hero' or
// '/settings'.
export function createSingletonApi(basePath) {
  return {
    fetch: async () => {
      const { data } = await axiosClient.get(basePath)
      return data.data.item
    },
    update: async (payload) => {
      const { data } = await axiosClient.put(basePath, payload)
      return data.data.item
    },
  }
}
