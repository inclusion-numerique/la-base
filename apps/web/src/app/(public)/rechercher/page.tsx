import React, { Suspense } from 'react'
import Header from '@app/web/components/Search/Header'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  sanitizeUrlSearchQueryParams,
  searchParamsToUrl,
  UrlSearchQueryParams,
} from '@app/web/server/search/searchQueryParams'
import SearchResults from '@app/web/components/Search/SearchResults'
import LoadingSearchResults from '@app/web/components/Search/LoadingSearchResults'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SearchResources = async ({
  searchParams: urlSearchParams,
}: {
  searchParams: UrlSearchQueryParams
}) => {
  const user = await getSessionUser()

  const searchParams = sanitizeUrlSearchQueryParams(urlSearchParams)
  const suspenseKey = searchParamsToUrl(searchParams)

  return (
    <>
      <Header searchParams={searchParams} />
      <Suspense
        key={suspenseKey}
        fallback={<LoadingSearchResults searchParams={searchParams} />}
      >
        <SearchResults user={user} searchParams={searchParams} />
      </Suspense>
    </>
  )
}

export default SearchResources
