import type { SessionUser } from '@app/web/auth/sessionUser'
import { quickSearchBases } from '@app/web/server/bases/searchBases'
import { quickSearchProfiles } from '@app/web/server/profiles/searchProfiles'
import { quickSearchResources } from '@app/web/server/resources/searchResources'

export type SearchType = 'resource' | 'base' | 'profile'

type ResourceResults = Awaited<ReturnType<typeof quickSearchResources>>
type BaseResults = Awaited<ReturnType<typeof quickSearchBases>>
type ProfileResults = Awaited<ReturnType<typeof quickSearchProfiles>>

export type ResourceResult = ResourceResults[number]
export type BaseResult = BaseResults[number]
export type ProfileResult = ProfileResults[number]

export type SearchResult<T extends SearchType> = T extends 'resource'
  ? ResourceResults
  : T extends 'base'
    ? BaseResults
    : T extends 'profile'
      ? ProfileResults
      : never

export const executeFeaturedBlockQuickSearch = async (
  input: { query: string; type: 'resource' | 'base' | 'profile' },
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { query, type } = input

  if (type === 'resource') {
    return quickSearchResources(query, user)
  }
  if (type === 'base') {
    return quickSearchBases(query, user)
  }
  if (type === 'profile') {
    return quickSearchProfiles(query, user)
  }
}
