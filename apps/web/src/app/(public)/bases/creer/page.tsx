import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import CreateBase from '@app/web/components/Base/Create/CreateBase'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

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
      <SkipLinksPortal />
      <div className="fr-container">
        <Breadcrumbs currentPage="Créer une base" />
      </div>
      <main id={contentId} className="fr-pt-1w">
        <CreateBase user={user} />
      </main>
    </>
  )
}

export default BaseCreationPage
