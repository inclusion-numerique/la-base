import { redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import CreateBase from '@app/web/components/Base/Create/CreateBase'

const BasePage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/bases/creer`)
  }
  return (
    <div className="fr-container">
      <Breadcrumbs currentPage="Créer une base" />
      <div className="fr-mt-6w">
        <CreateBase />
      </div>
    </div>
  )
}

export default BasePage
