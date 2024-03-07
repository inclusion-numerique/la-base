import React, { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const metadata: Metadata = {
  title: metadataTitle('Statistiques'),
}

const StatisticsLayout = ({ children }: PropsWithChildren) => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <div className="fr-container">
      <Breadcrumbs currentPage="Statistiques" />
    </div>
    <main id={contentId} className="fr-container fr-pb-20v">
      <h1 className="fr-text-title--blue-france">Statistiques</h1>
      {children}
    </main>
  </>
)

export default StatisticsLayout
