import { supportTypeLabels } from '@app/web/themes/supportTypes'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'
import { themeLabels } from '@app/web/themes/themes'
import { searchParamsFromQueryString } from '@app/web/utils/searchParamsFromQueryString'
// import * as queryString from 'node:querystring'
import type { SupportType, TargetAudience, Theme } from '@prisma/client'

export const searchTabs = ['ressources', 'bases', 'profils'] as const
export type SearchTab = (typeof searchTabs)[number]
export const searchTabFromString = (
  tab: string | string[] | null,
): SearchTab => {
  if (typeof tab !== 'string') {
    return 'ressources'
  }
  return searchTabs.includes(tab as SearchTab)
    ? (tab as SearchTab)
    : 'ressources'
}

// We need a segment, even when there is no active search term
export const searchSegmentAll = 'tout'

export const sorting = [
  'pertinence',
  'recent',
  'ancien',
  'vues',
  'enregistrements',
  'recommandations',
  'suivis',
  'ressources',
  'a-z',
  'z-a',
] as const
export type Sorting = (typeof sorting)[number]

export const masculineSortingLabels: { [key in Sorting]: string } = {
  pertinence: 'Les plus pertinents',
  recent: 'Les plus récents',
  ancien: 'Les plus anciens',
  vues: 'Les plus vus',
  enregistrements: 'Les plus enregistrés',
  recommandations: 'Les plus recommandés',
  suivis: 'Les plus suivis',
  ressources: 'Le plus de ressources',
  'a-z': 'Alphabétique : A → Z',
  'z-a': 'Alphabétique : Z → A',
}

export const feminineSortingLabels: { [key in Sorting]: string } = {
  pertinence: 'Les plus pertinentes',
  recent: 'Les plus récentes',
  ancien: 'Les plus anciennes',
  vues: 'Les plus vues',
  enregistrements: 'Les plus enregistrées',
  recommandations: 'Les plus recommandées',
  suivis: 'Les plus suivies',
  ressources: 'Le plus de ressources',
  'a-z': 'Alphabétique : A → Z',
  'z-a': 'Alphabétique : Z → A',
}

export const resourcesSorting = [
  'pertinence',
  'recent',
  'ancien',
  'vues',
  'recommandations',
  'enregistrements',
] as const satisfies Sorting[]

export const profilesSorting = [
  'pertinence',
  'recent',
  'ancien',
  'suivis',
  'ressources',
  'a-z',
  'z-a',
] as const satisfies Sorting[]

export const basesSorting = profilesSorting

export const resourcesSortingOptions = resourcesSorting.map((value) => ({
  value,
  name: feminineSortingLabels[value],
}))

export const profilesSortingOptions = profilesSorting.map((value) => ({
  value,
  name: masculineSortingLabels[value],
}))

export const basesSortingOptions = basesSorting.map((value) => ({
  value,
  name: feminineSortingLabels[value],
}))

// Unsanitized params from the URL
export type UrlSearchQueryParams = {
  r?: string | string[] | null
  thematiques?: string | string[] | null
  types?: string | string[] | null
  publics?: string | string[] | null
  departements?: string | string[] | null
  onglet?: string | string[] | null
}

export type UrlPaginationParams = {
  page?: string | string[] | null
  tri?: string | string[] | null
}

// Cleaned params for use in domain logic
export type SearchParams = {
  query: string | null
  themes: Theme[]
  supportTypes: SupportType[]
  targetAudiences: TargetAudience[]
  departements: string[]
}

export type PaginationParams = {
  page: number
  perPage: number
  sort: Sorting
}

export const defaultSearchParams: Readonly<SearchParams> = {
  query: null,
  themes: [],
  supportTypes: [],
  targetAudiences: [],
  departements: [],
}

export const defaultPaginationParams: Readonly<PaginationParams> = {
  page: 1,
  perPage: 16,
  sort: 'pertinence',
}

const queryParamToArray = (param?: string | string[] | null): string[] => {
  if (!param) {
    return []
  }
  if (typeof param === 'string') {
    return [param]
  }
  return param
}

// Sanitize params from the URL for search features
export const sanitizeUrlSearchQueryParams = (
  params?: UrlSearchQueryParams,
): SearchParams => {
  const thematiquesAsArray = queryParamToArray(params?.thematiques)

  const typesAsArray = queryParamToArray(params?.types)

  const publicsAsArray = queryParamToArray(params?.publics)

  const departementsAsArray = queryParamToArray(params?.departements)

  const trimmedRecherche = typeof params?.r === 'string' ? params.r.trim() : ''

  const query = trimmedRecherche || null

  const themes = thematiquesAsArray.filter(
    (theme) => theme in themeLabels,
  ) as Theme[]

  const supportTypes = typesAsArray.filter(
    (type) => type in supportTypeLabels,
  ) as SupportType[]

  const targetAudiences = publicsAsArray.filter(
    (target) => target in targetAudienceLabels,
  ) as TargetAudience[]

  return {
    query,
    themes,
    supportTypes,
    targetAudiences,
    departements: departementsAsArray,
  }
}

export const searchParamsFromSegment = (segment: string) => {
  if (segment === searchSegmentAll) {
    return defaultSearchParams
  }

  const parsed = searchParamsFromQueryString(segment)

  return sanitizeUrlSearchQueryParams(parsed)
}

export const sanitizeUrlPaginationParams = (
  params?: UrlPaginationParams,
): PaginationParams => {
  const page =
    typeof params?.page === 'string' ? Number.parseInt(params.page, 10) || 1 : 1

  const sortOptionString =
    typeof params?.tri === 'string' ? params.tri.trim() : ''

  const sort = sorting.includes(sortOptionString as Sorting)
    ? (sortOptionString as Sorting)
    : 'pertinence'

  return {
    page: page > 0 ? page : 1,
    perPage: defaultPaginationParams.perPage,
    sort,
  }
}

// Remove default value from params to avoid polluting the URL
const searchParamsToUrlQueryParams = (
  params: SearchParams,
): UrlSearchQueryParams => ({
  r: params.query ?? undefined,
  thematiques: params.themes.length > 0 ? params.themes : undefined,
  departements:
    params.departements.length > 0 ? params.departements : undefined,
  types: params.supportTypes.length > 0 ? params.supportTypes : undefined,
  publics:
    params.targetAudiences.length > 0 ? params.targetAudiences : undefined,
})

export const paginationParamsToUrlQueryParams = (
  params: PaginationParams,
): UrlPaginationParams => ({
  page: params.page > 1 ? params.page.toString(10) : undefined,
  tri: params.sort === 'pertinence' ? undefined : params.sort,
})

const objectToQueryString = (params: Record<string, unknown>): string => {
  const urlSafeParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue
    }
    if (Array.isArray(value)) {
      for (const element of value) {
        if (typeof element === 'string') {
          urlSafeParams.append(key, element)
        }
      }
      continue
    }
    if (typeof value === 'string') {
      urlSafeParams.append(key, value)
    }
  }
  return urlSafeParams.toString()
}

const searchParamsToUrl = (params: SearchParams): string => {
  const urlParams = searchParamsToUrlQueryParams(params)
  return objectToQueryString(urlParams)
}

const paginationParamsToUrl = (params: PaginationParams): string => {
  const urlParams = paginationParamsToUrlQueryParams(params)
  return objectToQueryString(urlParams)
}

export const searchUrl = (
  tab: SearchTab,
  params: SearchParams,
  pagination?: PaginationParams,
): string => {
  const searchPart = searchParamsToUrl(params)
  // We always need a segment, even if it's empty
  const searchSegment = searchPart || searchSegmentAll

  const paginationPart = pagination ? paginationParamsToUrl(pagination) : ''

  const paginationQuery = paginationPart ? `?${paginationPart}` : ''

  return `/rechercher/${searchSegment}/${tab}${paginationQuery}`
}
