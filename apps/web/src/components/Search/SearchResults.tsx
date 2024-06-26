import React, { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import PaginationNav from '@app/web/components/PaginationNav'

const SearchResults = ({
  paginationParams,
  count,
  children,
  createPageLink,
}: PropsWithChildren<{
  paginationParams: PaginationParams
  count: number
  createPageLink: (page: number) => string
}>) => {
  const totalPages = Math.ceil(count / paginationParams.perPage)

  // Redirect user to last page if the current page is out of bounds with new search params
  if (totalPages > 0 && paginationParams.page > totalPages) {
    redirect(createPageLink(totalPages))
  }

  return (
    <>
      {children}
      {count > 0 && (
        <PaginationNav
          className="fr-mt-12v"
          pageNumber={paginationParams.page}
          totalPages={totalPages}
          createPageLink={createPageLink}
        />
      )}
    </>
  )
}

export default SearchResults
