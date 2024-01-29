import React, { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import SearchHeader from '@app/web/components/Search/SearchHeader'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Rechercher'),
}

/**
 * This is the first layout without any query to quickly display loading state to user.
 * Then there is a sub layout for the tabs count
 * Then pages to display the list of results
 */
const SearchLayout = ({ children }: PropsWithChildren) => (
  <>
    <SearchHeader />
    {children}
  </>
)

export default SearchLayout
