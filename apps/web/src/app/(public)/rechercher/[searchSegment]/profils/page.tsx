import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import {
  countSearchResults,
  executeProfilesSearch,
} from '@app/web/server/search/executeSearch'
import ProfilesSearchResult from '@app/web/components/Search/ProfilesSearchResult'
import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'

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

  const [{ profiles, profilesCount }, tabCounts] = await Promise.all([
    executeProfilesSearch(searchParams, paginationParams, user),
    countSearchResults(searchParams, user),
  ])

  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        tab="profils"
        searchParams={searchParams}
        paginationParams={paginationParams}
        count={profilesCount}
      >
        <ProfilesSearchResult
          user={user}
          profiles={profiles}
          totalCount={profilesCount}
          paginationParams={paginationParams}
          searchParams={searchParams}
        />
      </SearchResults>
    </>
  )
}

export default ProfilesSearchResultPage
