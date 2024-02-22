import React from 'react'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ProfilEdition from '@app/web/components/Profile/Edition/ProfileEdition'
import { filterAccess } from '@app/web/server/profiles/authorization'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const metadata: Metadata = {
  title: metadataTitle('Modifier mon profil'),
}
const ProfilEditionPage = async ({ params }: ProfilRouteParams) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/profils/${params.slug}/modifier`)
  }

  const profile = await getProfilePageQuery(
    { slug: decodeURI(params.slug) },
    user,
  )
  if (!profile) {
    notFound()
  }

  const authorizations = filterAccess(profile, user)
  if (!authorizations.authorized || !authorizations.isUser) {
    redirect(`/profils/${params.slug}`)
  }

  const resources = await getProfileResources(profile.id, user)

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container">
        <Breadcrumbs
          parents={[
            {
              label: authorizations.isUser
                ? 'Mon Profil'
                : `${profile.name || 'Profil'}`,
              linkProps: { href: `/profils/${params.slug}` },
            },
          ]}
          currentPage="Modifier"
        />
        <main id={contentId} className="fr-mt-6w fr-mb-4w">
          <ProfilEdition profile={profile} resources={resources} />
        </main>
      </div>
    </>
  )
}

export default ProfilEditionPage
