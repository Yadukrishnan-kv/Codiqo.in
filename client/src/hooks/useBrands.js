import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('brands')
const hooks = createListHooks(['admin', 'brands'], api)

export const useBrandsList = hooks.useList
export const useCreateBrand = hooks.useCreate
export const useUpdateBrand = hooks.useUpdate
export const useDeleteBrand = hooks.useDelete
export const useToggleBrand = hooks.useToggle
export const useReorderBrands = hooks.useReorder
