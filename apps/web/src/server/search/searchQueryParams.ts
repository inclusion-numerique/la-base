import { SupportType, TargetAudience, Theme } from '@prisma/client'
import { themeLabels } from '@app/web/themes/themes'
import { supportTypeLabels } from '@app/web/themes/supportTypes'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'

export const searchTabs = ['ressources', 'bases', 'profils'] as const
export type SearchTab = (typeof searchTabs)[number]

export const sortOptions = [
  'pertinence',
  'recent',
  'ancien',
  'vues',
  'enregistrements',
] as const
export type SortOption = (typeof sortOptions)[number]

// Unsanitized params from the URL
export type UrlSearchQueryParams = {
  recherche?: string | string[] | null
  thematiques?: string | string[] | null
  types?: string | string[] | null
  publics?: string | string[] | null
  departements?: string | string[] | null
  onglet?: string | string[] | null
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
  tab: SearchTab
  page: number
  perPage: number
  sort: SortOption
}

export const defaultSearchParams: Readonly<SearchParams> = {
  query: null,
  tab: 'ressources',
  themes: [],
  supportTypes: [],
  targetAudiences: [],
  departements: [],
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

  const trimmedRecherche =
    typeof params?.recherche === 'string' ? params.recherche.trim() : ''

  const query = trimmedRecherche || null

  const sortOptionString =
    typeof params?.tri === 'string' ? params.tri.trim() : ''

  const sort = sortOptions.includes(sortOptionString as SortOption)
    ? (sortOptionString as SortOption)
    : query
    ? 'pertinence'
    : 'recent'

  const themes = thematiquesAsArray.filter(
    (theme) => theme in themeLabels,
  ) as Theme[]

  const supportTypes = typesAsArray.filter(
    (type) => type in supportTypeLabels,
  ) as SupportType[]

  const targetAudiences = publicsAsArray.filter(
    (target) => target in targetAudienceLabels,
  ) as TargetAudience[]

  const page =
    typeof params?.page === 'string' ? Number.parseInt(params.page, 10) || 1 : 1

  return {
    query,
    themes,
    supportTypes,
    targetAudiences,
    departements: departementsAsArray,
    page: page > 0 ? page : 1,
    tab:
      params?.onglet &&
      typeof params.onglet === 'string' &&
      searchTabs.includes(params.onglet as SearchTab)
        ? (params.onglet as SearchTab)
        : 'ressources',
    perPage: defaultSearchParams.perPage,
    sort,
  }
}

// Remove default value from params to avoid polluting the URL
const searchParamsToUrlQueryParams = (
  params: SearchParams,
): UrlSearchQueryParams => ({
  recherche: params.query ?? undefined,
  thematiques: params.themes.length > 0 ? params.themes : undefined,
  departements:
    params.departements.length > 0 ? params.departements : undefined,
  types: params.supportTypes.length > 0 ? params.supportTypes : undefined,
  publics:
    params.targetAudiences.length > 0 ? params.targetAudiences : undefined,
  onglet: params.tab === 'ressources' ? undefined : params.tab,
  page: params.page > 1 ? params.page.toString(10) : undefined,
  tri: params.query
    ? params.sort === 'pertinence'
      ? undefined
      : params.sort
    : params.sort === 'recent'
    ? undefined
    : params.sort,
})

export const searchParamsToUrl = (params: SearchParams): string => {
  const urlParams = searchParamsToUrlQueryParams(params)
  const urlSafeParams = new URLSearchParams()
  for (const [key, value] of Object.entries(urlParams)) {
    if (!value) {
      continue
    }
    if (Array.isArray(value)) {
      for (const element of value) {
        urlSafeParams.append(key, element)
      }
      continue
    }
    urlSafeParams.append(key, value)
  }
  return `/rechercher?${urlSafeParams.toString()}`
}
