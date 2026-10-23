import { createListApi } from './createListApi'

const api = createListApi('projects')

export const fetchAllProjects = api.fetchAll
export const createProjectRequest = api.create
export const updateProjectRequest = api.update
export const deleteProjectRequest = api.remove
export const toggleProjectRequest = api.toggle
export const reorderProjectsRequest = api.reorder
