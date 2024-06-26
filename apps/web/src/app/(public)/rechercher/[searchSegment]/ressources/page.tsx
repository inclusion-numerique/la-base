import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  searchUrl,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import {
  countSearchResults,
  executeResourcesSearch,
} from '@app/web/server/search/executeSearch'
import SearchResults from '@app/web/components/Search/SearchResults'
import ResourcesSearchResults from '@app/web/components/Search/ResourcesSearchResults'
import { SearchUrlResultSortingSelect } from '@app/web/components/Search/SearchUrlResultSortingSelect'
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
        paginationParams={paginationParams}
        count={resourcesCount}
        createPageLink={(page: number) =>
          searchUrl('ressources', searchParams, { ...paginationParams, page })
        }
      >
        <ResourcesSearchResults
          resources={resources}
          user={user}
          totalCount={resourcesCount}
        >
          <SearchUrlResultSortingSelect
            paginationParams={paginationParams}
            searchParams={searchParams}
            tab="ressources"
          />
        </ResourcesSearchResults>
      </SearchResults>
    </>
  )
}

export default ResourcesSearchResultPage
