import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('testimonials')
const hooks = createListHooks(['admin', 'testimonials'], api)

export const useTestimonialsList = hooks.useList
export const useCreateTestimonial = hooks.useCreate
export const useUpdateTestimonial = hooks.useUpdate
export const useDeleteTestimonial = hooks.useDelete
export const useToggleTestimonial = hooks.useToggle
export const useReorderTestimonials = hooks.useReorder
