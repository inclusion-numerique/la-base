import React, { PropsWithChildren } from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import Menu from '@app/web/components/Search/Menu'
import { countSearchResults } from '@app/web/server/search/executeSearch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * This layout queries the counts for each tab.
 */
const SearchTabsLayout = async ({
  children,
  params,
}: PropsWithChildren<{
  params: { searchSegment: string }
}>) => {
  const user = await getSessionUser()

  const searchParams = searchParamsFromSegment(params.searchSegment)

  const counts = await countSearchResults(searchParams, user)

  console.info(
    'Search counts execution duration',
    counts.duration,
    searchParams,
  )

  return (
    <>
      <Menu
        searchParams={searchParams}
        resourcesCount={counts.resourcesCount}
        profilesCount={counts.profilesCount}
        basesCount={counts.basesCount}
      />
      {children}
    </>
  )
}

export default SearchTabsLayout
