import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('process-steps')
const hooks = createListHooks(['admin', 'process-steps'], api)

export const useProcessStepsList = hooks.useList
export const useCreateProcessStep = hooks.useCreate
export const useUpdateProcessStep = hooks.useUpdate
export const useDeleteProcessStep = hooks.useDelete
export const useToggleProcessStep = hooks.useToggle
export const useReorderProcessSteps = hooks.useReorder
