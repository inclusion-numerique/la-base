import type { Metadata } from 'next'
import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { AssistantForm } from '@app/web/app/(public)/assistant/AssistantForm'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Assistant'),
}

const AssistantPage = () => (
  <div className="fr-container">
    <SkipLinksPortal links={defaultSkipLinks} />
    <Breadcrumbs currentPage="Assistant" />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1>Assistant de recherche</h1>
          <AssistantForm />
        </div>
      </div>
    </main>
  </div>
)
export default AssistantPage
