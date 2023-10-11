import React, { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import {
  PaginationParams,
  SearchParams,
  SearchTab,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import PaginationNav from '@app/web/components/PaginationNav'

const SearchResults = ({
  searchParams,
  paginationParams,
  tab,
  count,
  children,
}: PropsWithChildren<{
  count: number
  tab: SearchTab
  searchParams: SearchParams
  paginationParams: PaginationParams
}>) => {
  const totalPages = Math.ceil(count / paginationParams.perPage)

  // Redirect user to last page if the current page is out of bounds with new search params
  if (totalPages > 0 && paginationParams.page > totalPages) {
    redirect(
      searchUrl(tab, searchParams, { ...paginationParams, page: totalPages }),
    )
  }
  const createPageLink = (pageNumber: number) =>
    searchUrl(tab, searchParams, { ...paginationParams, page: pageNumber })

  return (
    <div className="fr-container fr-container--medium fr-mb-30v">
      {children}
      {count > 0 && (
        <PaginationNav
          className="fr-mt-12v"
          pageNumber={paginationParams.page}
          totalPages={totalPages}
          createPageLink={createPageLink}
        />
      )}
    </div>
  )
}

export default SearchResults
