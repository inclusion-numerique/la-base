import type { Resource } from '@app/web/server/resources/getResource'

export const hasIndexation = (
  resource: Pick<Resource, 'themes' | 'resourceTypes' | 'targetAudiences'>,
) =>
  (resource.themes && resource.themes.length > 0) ||
  (resource.resourceTypes && resource.resourceTypes.length > 0) ||
  (resource.targetAudiences && resource.targetAudiences.length > 0)
