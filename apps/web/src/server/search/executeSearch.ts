import { SessionUser } from '@app/web/auth/sessionUser'
import {
  countResources,
  quickSearchResources,
  searchResources,
} from '@app/web/server/resources/searchResources'
import {
  countBases,
  quickSearchBases,
  searchBases,
} from '@app/web/server/bases/searchBases'
import {
  countProfiles,
  quickSearchProfiles,
  searchProfiles,
} from '@app/web/server/profiles/searchProfiles'
import {
  defaultSearchParams,
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'

export const countSearchResults = async (
  searchParams: SearchParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const start = Date.now()

  const [resourcesCount, basesCount, profilesCount] = await Promise.all([
    countResources(searchParams, user),
    countBases(searchParams, user),
    countProfiles(searchParams, user),
  ])
  const end = Date.now()

  return {
    resourcesCount,
    basesCount,
    profilesCount,
    duration: end - start,
  }
}

export const executeResourcesSearch = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const start = Date.now()

  const [resourcesCount, resources] = await Promise.all([
    countResources(searchParams, user),
    searchResources(searchParams, paginationParams, user),
  ])
  const end = Date.now()

  return {
    resourcesCount,
    resources,
    duration: end - start,
  }
}

export const executeBasesSearch = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const start = Date.now()

  const [basesCount, bases] = await Promise.all([
    countBases(searchParams, user),
    searchBases(searchParams, paginationParams, user),
  ])
  const end = Date.now()

  return {
    basesCount,
    bases,
    duration: end - start,
  }
}

export const executeProfilesSearch = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const start = Date.now()

  const [profilesCount, profiles] = await Promise.all([
    countProfiles(searchParams, user),
    searchProfiles(searchParams, paginationParams, user),
  ])
  const end = Date.now()

  return {
    profilesCount,
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
