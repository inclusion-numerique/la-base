import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { prismaClient } from '@app/web/prismaClient'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getResource } from '@app/web/server/resources/getResource'
import { applyDraft } from '@app/web/utils/resourceDraft'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { ResourceFeedbackList } from './_components/ResourceFeedbackList'

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const resource = await prismaClient.resource.findUnique({
    where: { slug },
    select: { title: true },
  })
  if (!resource) {
    notFound()
  }

  return {
    title: metadataTitle(`Votre avis sur la ressource ${resource.title}`),
  }
}

const ResourceFeedbackPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()

  const savedResource = await getResource(
    { slug: decodeURI(params.slug) },
    user,
  )

  const draftResource = savedResource?.published
    ? null
    : await getResourceProjectionWithContext({
        slug: decodeURI(params.slug),
      })

  const resource = applyDraft(savedResource, draftResource)

  if (!resource) {
    notFound()
  }

  const { hasPermission } = resourceAuthorization(resource, user)
  const canWrite = hasPermission(ResourcePermissions.WriteResource)

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container">
        <ResourceBreadcrumbs resource={resource} currentChildPage="Avis" />
        <main className="fr-mx-auto fr-container--slim" id={contentId}>
          <HeaderBackLink href={`/ressources/${resource.slug}`} />
          <ResourceFeedbackList
            resource={resource}
            user={user}
            canGiveFeedback={!canWrite}
          />
        </main>
      </div>
    </>
  )
}
export default ResourceFeedbackPage
