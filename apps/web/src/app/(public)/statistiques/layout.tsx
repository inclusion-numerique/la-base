import React, { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const metadata: Metadata = {
  title: metadataTitle('Statistiques'),
}

const StatisticsLayout = ({ children }: PropsWithChildren) => (
  <>
    <div className="fr-container">
      <Breadcrumbs currentPage="Statistiques" />
    </div>
    <div className="fr-container fr-pb-20v">
      <h1 className="fr-text-title--blue-france">Statistiques</h1>
      <Notice
        title="Cette page est en cours de construction"
        className="fr-mb-8v"
      />
      {children}
    </div>
  </>
)

export default StatisticsLayout
