import React from 'react'
import { redirect } from 'next/navigation'
import {
  SearchParams,
  searchParamsToUrl,
} from '@app/web/server/search/searchQueryParams'
import Menu from '@app/web/components/Search/Menu'
import Resources from '@app/web/components/Search/Resources'
import { SessionUser } from '@app/web/auth/sessionUser'
import PaginationNav from '@app/web/components/PaginationNav'
import Bases from '@app/web/components/Search/Bases'
import Profiles from '@app/web/components/Search/Profiles'
import { executeSearch } from '@app/web/server/search/executeSearch'

const SearchResults = async ({
  searchParams,
  user,
}: {
  searchParams: SearchParams
  user: SessionUser | null
}) => {
  const searchResults = await executeSearch(searchParams, user)

  // Only the relevant items depending on current tab
  const itemsCount =
    searchResults.resources.length +
    searchResults.bases.length +
    searchResults.profiles.length

  const totalPages = Math.ceil(itemsCount / searchParams.perPage)

  // Redirect user to last page if the current page is out of bounds with new search params
  if (totalPages > 0 && searchParams.page > totalPages) {
    redirect(searchParamsToUrl({ ...searchParams, page: totalPages }))
  }
  const createPageLink = (pageNumber: number) =>
    searchParamsToUrl({ ...searchParams, page: pageNumber })

  return (
    <>
      <Menu
        searchParams={searchParams}
        resourcesCount={searchResults.resourcesCount}
        profilesCount={searchResults.profilesCount}
        basesCount={searchResults.basesCount}
      />
      <div className="fr-container">
        {searchParams.tab === 'ressources' && (
          <Resources
            totalCount={searchResults.resourcesCount}
            resources={searchResults.resources}
            user={user}
          />
        )}
        {searchParams.tab === 'bases' && (
          <Bases
            totalCount={searchResults.basesCount}
            bases={searchResults.bases}
            user={user}
          />
        )}
        {searchParams.tab === 'profils' && (
          <Profiles
            totalCount={searchResults.profilesCount}
            profiles={searchResults.profiles}
            user={user}
          />
        )}
        {itemsCount > 0 && (
          <PaginationNav
            pageNumber={searchParams.page}
            totalPages={totalPages}
            createPageLink={createPageLink}
          />
        )}
      </div>
    </>
  )
}

export default SearchResults
