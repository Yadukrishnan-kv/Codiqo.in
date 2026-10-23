import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('services')
const hooks = createListHooks(['admin', 'services'], api)

export const useServicesList = hooks.useList
export const useCreateService = hooks.useCreate
export const useUpdateService = hooks.useUpdate
export const useDeleteService = hooks.useDelete
export const useToggleService = hooks.useToggle
export const useReorderServices = hooks.useReorder
