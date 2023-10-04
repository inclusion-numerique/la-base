import { Resource } from '../server/resources/getResource'

export const hasIndexation = (resource: Resource) =>
  (resource.themes && resource.themes.length > 0) ||
  (resource.supportTypes && resource.supportTypes.length > 0) ||
  (resource.targetAudiences && resource.targetAudiences.length > 0)
