import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import Edition from '@app/web/components/Resource/Edition/Edition'

const ResourcePublicationPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${params.slug}/publier`)
  }

  const [resource, draftResource] = await Promise.all([
    getResource({ slug: decodeURI(params.slug) }),
    getResourceProjectionWithContext({ slug: decodeURI(params.slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage="Publication de la ressource"
          parents={[
            { label: 'Ressources', linkProps: { href: '/ressources' } },
            {
              label: resource.title,
              linkProps: { href: `/ressources/${resource.slug}` },
            },
          ]}
        />
      </div>
      <Edition
        publishMode
        resource={resource}
        draftResource={draftResource}
        user={user}
      />
    </>
  )
}
export default ResourcePublicationPage
