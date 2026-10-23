import { createSingletonApi } from '../api/createSingletonApi'
import { createSingletonHooks } from './createSingletonHooks'

const api = createSingletonApi('/settings')
const hooks = createSingletonHooks(['admin', 'settings'], api)

export const useSiteSettings = hooks.useGet
export const useUpdateSiteSettings = hooks.useUpdate
