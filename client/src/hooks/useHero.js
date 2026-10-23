import { createSingletonApi } from '../api/createSingletonApi'
import { createSingletonHooks } from './createSingletonHooks'

const api = createSingletonApi('/content/hero')
const hooks = createSingletonHooks(['admin', 'hero'], api)

export const useHero = hooks.useGet
export const useUpdateHero = hooks.useUpdate
