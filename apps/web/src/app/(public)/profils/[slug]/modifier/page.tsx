import React from 'react'
import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResourcesCount } from '@app/web/server/resources/getResourcesList'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import EditProfile from '@app/web/components/Profile/Edition/EditProfile'

const EditProfilPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/profils/${params.slug}/modifier`)
  }

  if (user.id !== params.slug) {
    redirect(`/profils/${params.slug}`)
  }

  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const resourcesCount = await getProfileResourcesCount(profile.id, user)

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
        <EditProfile profile={profile} resourcesCount={resourcesCount} />
      </div>
    </div>
  )
}

export default EditProfilPage
