import { createSingletonApi } from '../api/createSingletonApi'
import { createSingletonHooks } from './createSingletonHooks'

const api = createSingletonApi('/content/founder')
const hooks = createSingletonHooks(['admin', 'founder'], api)

export const useFounder = hooks.useGet
export const useUpdateFounder = hooks.useUpdate
