import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('projects')
const hooks = createListHooks(['admin', 'projects'], api)

export const useProjectsList = hooks.useList
export const useCreateProject = hooks.useCreate
export const useUpdateProject = hooks.useUpdate
export const useDeleteProject = hooks.useDelete
export const useToggleProject = hooks.useToggle
export const useReorderProjects = hooks.useReorder
