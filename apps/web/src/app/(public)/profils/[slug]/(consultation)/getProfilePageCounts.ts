import { cache } from 'react'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { getProfileBasesCount } from '@app/web/server/bases/getBasesList'
import { getProfileCollectionsCount } from '@app/web/server/collections/getCollectionsList'
import { getProfileFollowsCount } from '@app/web/server/follows/getFollowsList'
import { getProfileResourcesCount } from '@app/web/server/resources/getResourcesList'

// Counts are cached per request https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
export const getProfilePageCounts = cache(async (profileSlug: string) => {
  const { user, profile } = await getProfilePageContext(profileSlug)

  const [resourcesCount, basesCount, collectionsCount, followsCount] =
    await Promise.all([
      getProfileResourcesCount(profile.id, user),
      getProfileBasesCount(profile.id, user),
      getProfileCollectionsCount(profile.id, user),
      getProfileFollowsCount(profile.id),
    ])

  return {
    resourcesCount,
    basesCount,
    collectionsCount,
    followsCount,
  }
})

export type ProfilePageCounts = Awaited<ReturnType<typeof getProfilePageCounts>>
