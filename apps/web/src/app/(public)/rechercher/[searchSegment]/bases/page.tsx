import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import BasesSearchResult from '@app/web/components/Search/BasesSearchResult'
import SearchResults from '@app/web/components/Search/SearchResults'
import { SearchUrlResultSortingSelect } from '@app/web/components/Search/SearchUrlResultSortingSelect'
import {
  countSearchResults,
  executeBasesSearch,
} from '@app/web/server/search/executeSearch'
import {
  type UrlPaginationParams,
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BasesSearchResultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ searchSegment: string }>
  searchParams: Promise<UrlPaginationParams>
}) => {
  const { searchSegment } = await params
  const urlPaginationParams = await searchParams
  const user = await getSessionUser()
  const searchExecutionParams = searchParamsFromSegment(searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const [{ bases, basesCount }, tabCounts] = await Promise.all([
    executeBasesSearch(searchExecutionParams, paginationParams, user),
    countSearchResults(searchExecutionParams, user),
  ])
  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        paginationParams={paginationParams}
        count={basesCount}
        createPageLink={(page: number) =>
          searchUrl('bases', searchExecutionParams, {
            ...paginationParams,
            page,
          })
        }
      >
        <BasesSearchResult user={user} bases={bases} totalCount={basesCount}>
          <SearchUrlResultSortingSelect
            paginationParams={paginationParams}
            searchParams={searchExecutionParams}
            tab="bases"
          />
        </BasesSearchResult>
      </SearchResults>
    </>
  )
}

export default BasesSearchResultPage
