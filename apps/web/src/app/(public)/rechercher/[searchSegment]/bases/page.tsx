import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  searchUrl,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import {
  countSearchResults,
  executeBasesSearch,
} from '@app/web/server/search/executeSearch'
import BasesSearchResult from '@app/web/components/Search/BasesSearchResult'
import { SearchUrlResultSortingSelect } from '@app/web/components/Search/SearchUrlResultSortingSelect'
import SynchronizeTabCounts from '@app/web/app/(public)/rechercher/[searchSegment]/SynchronizeTabCounts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BasesSearchResultPage = async ({
  params,
  searchParams: urlPaginationParams,
}: {
  params: { searchSegment: string }
  searchParams: UrlPaginationParams
}) => {
  const user = await getSessionUser()
  const searchParams = searchParamsFromSegment(params?.searchSegment)
  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const [{ bases, basesCount }, tabCounts] = await Promise.all([
    executeBasesSearch(searchParams, paginationParams, user),
    countSearchResults(searchParams, user),
  ])
  return (
    <>
      <SynchronizeTabCounts tabCounts={tabCounts} />
      <SearchResults
        paginationParams={paginationParams}
        count={basesCount}
        createPageLink={(page: number) =>
          searchUrl('bases', searchParams, { ...paginationParams, page })
        }
      >
        <BasesSearchResult user={user} bases={bases} totalCount={basesCount}>
          <SearchUrlResultSortingSelect
            paginationParams={paginationParams}
            searchParams={searchParams}
            tab="bases"
          />
        </BasesSearchResult>
      </SearchResults>
    </>
  )
}

export default BasesSearchResultPage
