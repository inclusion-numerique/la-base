import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'

/**
 * Using the query result of a profile list, we can count the number of resources
 * using the different lists.
 *
 * We do this as we cannot use complex count logic in Prisma findMany query
 * This is not ideal but not a bottleneck for now
 */
export const countProfileResources = (profile: ProfileListItem) => {
  const allResources = new Set([
    ...profile.resources.map(({ resourceId }) => resourceId),
    ...profile.createdResources.map(({ id }) => id),
  ])

  return profile.resourceEvent.filter(({ resourceId }) =>
    allResources.has(resourceId),
  ).length
}
