import React, { PropsWithChildren } from 'react'
import Header from '@app/web/components/Search/Header'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * This is the first layout without any query to quickly display loading state to user.
 * Then there is a sub layout for the tabs count
 * Then pages to display the list of results
 */
const SearchLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    {children}
  </>
)

export default SearchLayout
