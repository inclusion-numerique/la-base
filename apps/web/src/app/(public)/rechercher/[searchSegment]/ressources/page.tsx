import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import ResourcesSearchResults from '@app/web/components/Search/ResourcesSearchResults'
import SearchResults from '@app/web/components/Search/SearchResults'
import { SearchUrlResultSortingSelect } from '@app/web/components/Search/SearchUrlResultSortingSelect'
import {
  countSearchResults,
  executeResourcesSearch,
} from '@app/web/server/search/executeSearch'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  searchUrl,
  type UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ResourcesSearchResultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    searchSegment: string
  }>
  searchParams: Promise<UrlPaginationParams>
}) => {
  const { searchSegment } = await params
  const user = await getSessionUser()
  const searchExecutionParams = searchParamsFromSegment(searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(await searchParams)

  const [{ resources, resourcesCount }, tabCounts] = await Promise.all([
    executeResourcesSearch(searchExecutionParams, paginationParams, user),
    countSearchResults(searchExecutionParams, user),
  ])

  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        paginationParams={paginationParams}
        count={resourcesCount}
        createPageLink={(page: number) =>
          searchUrl('ressources', searchExecutionParams, {
            ...paginationParams,
            page,
          })
        }
      >
        <ResourcesSearchResults
          resources={resources}
          user={user}
          totalCount={resourcesCount}
        >
          <SearchUrlResultSortingSelect
            paginationParams={paginationParams}
            searchParams={searchExecutionParams}
            tab="ressources"
          />
        </ResourcesSearchResults>
      </SearchResults>
    </>
  )
}

export default ResourcesSearchResultPage
