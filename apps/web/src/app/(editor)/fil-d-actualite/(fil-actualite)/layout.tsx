import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { footerSkipLink } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: metadataTitle("Votre fil d'actualité"),
}

const newsFeedId = 'news-feed'
const skipLinks = [
  { label: "Fil d'actualité", anchor: `#${newsFeedId}` },
  footerSkipLink,
]

const NewsFeedLayout = ({ children }: PropsWithChildren) => (
  <>
    <SkipLinksPortal links={skipLinks} />
    <main id={newsFeedId} className="fr-pb-md-2w">
      {children}
    </main>
  </>
)

export default NewsFeedLayout
