import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import Edition from '@app/web/components/Resource/Edition/ResourceEdition'
import { filterAccess } from '@app/web/server/resources/authorization'
import { metadataTitle } from '@app/web/app/metadataTitle'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'

export const metadata: Metadata = {
  title: metadataTitle('Publication de la ressource'),
}

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
    getResource({ slug: decodeURI(params.slug) }, user),
    getResourceProjectionWithContext({ slug: decodeURI(params.slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }
  const authorizations = filterAccess(resource, user)
  if (!authorizations.authorized || !authorizations.isAdmin) {
    redirect(`/ressources/${params.slug}`)
  }

  return (
    <>
      <div className="fr-container">
        <ResourceBreadcrumbs resource={resource} currentChildPage="Publier" />
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
