import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import { executeResourcesSearch } from '@app/web/server/search/executeSearch'
import Resources from '@app/web/components/Search/Resources'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ResourcesSearchResultPage = async ({
  params,
  searchParams: urlPaginationParams,
}: {
  params: { searchSegment: string }
  searchParams: UrlPaginationParams
}) => {
  const user = await getSessionUser()
  const searchParams = searchParamsFromSegment(params?.searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const { resources, resourcesCount, duration } = await executeResourcesSearch(
    searchParams,
    paginationParams,
    user,
  )

  console.info(
    'Resources search execution',
    duration,
    searchParams,
    paginationParams,
  )

  return (
    <SearchResults
      tab="ressources"
      searchParams={searchParams}
      paginationParams={paginationParams}
      count={resourcesCount}
    >
      <Resources
        resources={resources}
        user={user}
        totalCount={resourcesCount}
      />
    </SearchResults>
  )
}

export default ResourcesSearchResultPage
