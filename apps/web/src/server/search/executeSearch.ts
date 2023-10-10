import { SessionUser } from '@app/web/auth/sessionUser'
import {
  countResources,
  quickSearchResources,
  searchResources,
  SearchResourcesResult,
} from '@app/web/server/resources/searchResources'
import {
  countBases,
  quickSearchBases,
  searchBases,
  SearchBasesResult,
} from '@app/web/server/bases/searchBases'
import {
  countProfiles,
  quickSearchProfiles,
  searchProfiles,
} from '@app/web/server/profiles/searchProfiles'
import {
  defaultSearchParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'

export const executeSearch = async (
  searchParams: SearchParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const start = Date.now()

  const [
    resourcesCount,
    basesCount,
    profilesCount,
    resources,
    bases,
    profiles,
  ] = await Promise.all([
    countResources(searchParams, user),
    countBases(searchParams, user),
    countProfiles(searchParams, user),
    // Only search item if the requested tab matches the item type
    searchParams.tab === 'ressources'
      ? searchResources(searchParams, user)
      : ([] as SearchResourcesResult),
    searchParams.tab === 'bases'
      ? searchBases(searchParams, user)
      : ([] as SearchBasesResult),
    searchParams.tab === 'profils' ? searchProfiles(searchParams, user) : [],
  ])
  const end = Date.now()

  return {
    resourcesCount,
    basesCount,
    profilesCount,
    resources,
    bases,
    profiles,
    duration: end - start,
  }
}

export const executeQuickSearch = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const quickSearchParams = {
    ...defaultSearchParams,
    query,
    perPage: 3,
  }
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const start = Date.now()

  const [
    resourcesCount,
    basesCount,
    profilesCount,
    resources,
    bases,
    profiles,
  ] = await Promise.all([
    countResources(quickSearchParams, user),
    countBases(quickSearchParams, user),
    countProfiles(quickSearchParams, user),
    quickSearchResources(query, user),
    quickSearchBases(query, user),
    quickSearchProfiles(query, user),
  ])
  const end = Date.now()

  return {
    resourcesCount,
    basesCount,
    profilesCount,
    resources,
    bases,
    profiles,
    duration: end - start,
  }
}
