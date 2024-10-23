import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import { applyDraft } from '@app/web/utils/resourceDraft'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceView from './_components/ResourceView'
import PrivateResourceView from './_components/PrivateResourceView'

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
    title: metadataTitle(resource.title),
  }
}

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
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

  const canReadGeneralInformation = hasPermission(
    ResourcePermissions.ReadGeneralResourceInformation,
  )
  if (!canReadGeneralInformation) {
    notFound()
  }

  const canWrite = hasPermission(ResourcePermissions.WriteResource)
  const canReadContent = hasPermission(ResourcePermissions.ReadResourceContent)
  const canDelete = hasPermission(ResourcePermissions.DeleteResource)

  return (
    <>
      <SkipLinksPortal />
      <div className="fr-container">
        <ResourceBreadcrumbs resource={resource} />
        <main id={contentId}>
          {canReadContent ? (
            <ResourceView
              user={user}
              resource={resource}
              canWrite={canWrite}
              canDelete={canDelete}
            />
          ) : (
            <PrivateResourceView resource={resource} />
          )}
        </main>
      </div>
    </>
  )
}

export default RessourcePage
