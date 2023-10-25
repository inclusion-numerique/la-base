import { redirect } from 'next/navigation'
import React from 'react'
import CreateCollection from '@app/web/components/Collection/Create/CreateCollection'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

const CollectionCreationPage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/collections/creer`)
  }
  return (
    <>
      <div className="fr-container">
        <Breadcrumbs currentPage="Créer une collection" />
      </div>
      <div className="fr-mt-1w">
        <CreateCollection />
      </div>
    </>
  )
}

export default CollectionCreationPage
