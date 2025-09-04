import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { applyDraft } from '@app/web/utils/resourceDraft'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ResourceFeedbackList } from './_components/ResourceFeedbackList'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params

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
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const user = await getSessionUser()

  const savedResource = await getResource({ slug: decodeURI(slug) }, user)

  const draftResource = savedResource?.published
    ? null
    : await getResourceProjectionWithContext({
        slug: decodeURI(slug),
      })

  const resource = applyDraft(savedResource, draftResource)

  if (!resource) {
    notFound()
  }

  const { hasPermission } = resourceAuthorization(resource, user)
  const canWrite = hasPermission(ResourcePermissions.WriteResource)

  return (
    <>
      <SkipLinksPortal />
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
