import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import { executeBasesSearch } from '@app/web/server/search/executeSearch'
import Bases from '@app/web/components/Search/Bases'

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

  const { bases, basesCount, duration } = await executeBasesSearch(
    searchParams,
    paginationParams,
    user,
  )

  console.info(
    'Bases search execution',
    duration,
    searchParams,
    paginationParams,
  )

  return (
    <SearchResults
      tab="ressources"
      searchParams={searchParams}
      paginationParams={paginationParams}
      count={basesCount}
    >
      <Bases bases={bases} totalCount={basesCount} />
    </SearchResults>
  )
}

export default BasesSearchResultPage
