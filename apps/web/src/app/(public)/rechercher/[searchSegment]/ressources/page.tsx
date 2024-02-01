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
  executeResourcesSearch,
} from '@app/web/server/search/executeSearch'
import ResourcesSearchResults from '@app/web/components/Search/ResourcesSearchResults'
import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ResourcesSearchResultPage = async ({
  params,
  searchParams: urlPaginationParams,
}: {
  params: {
    searchSegment: string
  }
  searchParams: UrlPaginationParams
}) => {
  const user = await getSessionUser()
  const searchParams = searchParamsFromSegment(params?.searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const [{ resources, resourcesCount }, tabCounts] = await Promise.all([
    executeResourcesSearch(searchParams, paginationParams, user),
    countSearchResults(searchParams, user),
  ])

  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        tab="ressources"
        searchParams={searchParams}
        paginationParams={paginationParams}
        count={resourcesCount}
      >
        <ResourcesSearchResults
          searchParams={searchParams}
          paginationParams={paginationParams}
          resources={resources}
          user={user}
          totalCount={resourcesCount}
        />
      </SearchResults>
    </>
  )
}

export default ResourcesSearchResultPage
