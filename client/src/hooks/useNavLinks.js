import { createListApi } from '../api/createListApi'
import { createListHooks } from './createListHooks'

const api = createListApi('nav-links')
const hooks = createListHooks(['admin', 'nav-links'], api)

export const useNavLinksList = hooks.useList
export const useCreateNavLink = hooks.useCreate
export const useUpdateNavLink = hooks.useUpdate
export const useDeleteNavLink = hooks.useDelete
export const useToggleNavLink = hooks.useToggle
export const useReorderNavLinks = hooks.useReorder
