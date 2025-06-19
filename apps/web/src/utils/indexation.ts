import type { Resource } from '@app/web/server/resources/getResource'

export const hasIndexation = (
  resource: Pick<
    Resource,
    'themes' | 'resourceTypes' | 'beneficiaries' | 'professionalSectors'
  >,
) =>
  (resource.themes && resource.themes.length > 0) ||
  (resource.resourceTypes && resource.resourceTypes.length > 0) ||
  (resource.beneficiaries && resource.beneficiaries.length > 0) ||
  (resource.professionalSectors && resource.professionalSectors.length > 0)
