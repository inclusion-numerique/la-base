import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import Edition from '@app/web/components/Resource/Edition/ResourceEdition'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { contentId, contentSkipLink } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: metadataTitle('Publication de la ressource'),
}

const ResourcePublicationPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${slug}/publier`)
  }

  const [resource, draftResource] = await Promise.all([
    getResource({ slug: decodeURI(slug) }, user),
    getResourceProjectionWithContext({ slug: decodeURI(slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }
  const canWrite = resourceAuthorization(resource, user).hasPermission(
    ResourcePermissions.WriteResource,
  )
  if (!canWrite) {
    redirect(`/ressources/${slug}`)
  }

  return (
    <>
      <SkipLinksPortal links={[contentSkipLink]} />
      <div className="fr-container">
        <ResourceBreadcrumbs resource={resource} currentChildPage="Publier" />
      </div>
      <main id={contentId}>
        <Edition
          publishMode
          resource={resource}
          draftResource={draftResource}
          user={user}
        />
      </main>
    </>
  )
}
export default ResourcePublicationPage
