import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { footerSkipLink } from '@app/web/utils/skipLinks'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'
import styles from './NewsFeedLayout.module.css'

export const metadata: Metadata = {
  title: metadataTitle("Votre fil d'actualité"),
}

const newsFeedId = 'news-feed'
const skipLinks = [
  { label: 'Contenu', anchor: `#${newsFeedId}` },
  footerSkipLink,
]

const NewsFeedLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  return (
    <>
      <SkipLinksPortal links={skipLinks} />
      <div className="fr-layout">
        <div className="fr-layout__inner">
          <div id="skip-links" />
          <Header user={user} className="fr-px-2w" />
          <div
            id={newsFeedId}
            className={classNames(
              'fr-grid-row fr-width-full fr-layout__main',
              styles.container,
            )}
          >
            {children}
          </div>
          <PublicFooter />
        </div>
      </div>
    </>
  )
}

export default NewsFeedLayout
