import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('whyus-reasons')
const hooks = createListHooks(['admin', 'whyus-reasons'], api)

export const useWhyUsList = hooks.useList
export const useCreateWhyUs = hooks.useCreate
export const useUpdateWhyUs = hooks.useUpdate
export const useDeleteWhyUs = hooks.useDelete
export const useToggleWhyUs = hooks.useToggle
export const useReorderWhyUs = hooks.useReorder
