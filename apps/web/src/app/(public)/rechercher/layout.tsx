import { metadataTitle } from '@app/web/app/metadataTitle'
import SearchHeader, {
  rechercherId,
} from '@app/web/components/Search/SearchHeader'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { footerSkipLink } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import React, { type PropsWithChildren } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Rechercher'),
}

const resultsId = 'resultats'
const skipLinks = [
  { label: 'Faire une recherche', anchor: `#${rechercherId}` },
  { label: 'Résultats', anchor: `#${resultsId}` },
  footerSkipLink,
]

/**
 * This is the first layout without any query to quickly display loading state to user.
 * Then there is a sub layout for the tabs count
 * Then pages to display the list of results
 */
const SearchLayout = ({ children }: PropsWithChildren) => (
  <>
    <SkipLinksPortal links={skipLinks} />
    <SearchHeader />
    <main id={resultsId} className="fr-pb-md-2w">
      {children}
    </main>
  </>
)

export default SearchLayout
