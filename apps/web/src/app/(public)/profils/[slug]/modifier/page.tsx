import React from 'react'
import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ProfilEdition from '@app/web/components/Profile/Edition/ProfileEdition'
import { filterAccess } from '@app/web/server/profiles/authorization'

const ProfilEditionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/profils/${params.slug}/modifier`)
  }

  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const authorizations = filterAccess(profile, user)
  if (!authorizations.authorized || !authorizations.isUser) {
    redirect(`/profils/${params.slug}`)
  }

  const resources = await getProfileResources(profile.id, user)

  return (
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          {
            label: 'Mon profil',
            linkProps: { href: `/profils/${params.slug}` },
          },
        ]}
        currentPage="Modifier mon profil"
      />
      <div className="fr-mt-6w fr-mb-4w">
        <ProfilEdition profile={profile} resources={resources} />
      </div>
    </div>
  )
}

export default ProfilEditionPage
