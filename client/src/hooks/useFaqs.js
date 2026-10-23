import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('faqs')
const hooks = createListHooks(['admin', 'faqs'], api)

export const useFaqsList = hooks.useList
export const useCreateFaq = hooks.useCreate
export const useUpdateFaq = hooks.useUpdate
export const useDeleteFaq = hooks.useDelete
export const useToggleFaq = hooks.useToggle
export const useReorderFaqs = hooks.useReorder
