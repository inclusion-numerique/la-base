import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: metadataTitle('Statistiques'),
}

const StatisticsLayout = ({ children }: PropsWithChildren) => (
  <>
    <SkipLinksPortal />
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
