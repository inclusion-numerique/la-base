import { redirect } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import CreateBase from '@app/web/components/Base/Create/CreateBase'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const metadata: Metadata = {
  title: metadataTitle('Créer une base'),
}
const BaseCreationPage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/bases/creer`)
  }
  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container">
        <Breadcrumbs currentPage="Créer une base" />
      </div>
      <main id={contentId} className="fr-mt-1w">
        <CreateBase user={user} />
      </main>
    </>
  )
}

export default BaseCreationPage
