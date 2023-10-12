import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import { executeProfilesSearch } from '@app/web/server/search/executeSearch'
import Profiles from '@app/web/components/Search/Profiles'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ProfilesSearchResultPage = async ({
  params,
  searchParams: urlPaginationParams,
}: {
  params: { searchSegment: string }
  searchParams: UrlPaginationParams
}) => {
  const user = await getSessionUser()
  const searchParams = searchParamsFromSegment(params?.searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const { profiles, profilesCount, duration } = await executeProfilesSearch(
    searchParams,
    paginationParams,
    user,
  )

  console.info(
    'Profiles search execution',
    duration,
    searchParams,
    paginationParams,
  )

  return (
    <SearchResults
      tab="profils"
      searchParams={searchParams}
      paginationParams={paginationParams}
      count={profilesCount}
    >
      <Profiles profiles={profiles} totalCount={profilesCount} />
    </SearchResults>
  )
}

export default ProfilesSearchResultPage
