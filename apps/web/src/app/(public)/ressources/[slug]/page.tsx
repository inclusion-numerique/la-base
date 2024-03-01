import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import ResourceView from '@app/web/components/Resource/View/ResourceView'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import ResourceViewHeader from '@app/web/components/Resource/View/ResourceViewHeader'
import PrivateBox from '@app/web/components/PrivateBox'
import ResourceViewSeparators from '@app/web/components/Resource/View/ResourceViewSeparators'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import { applyDraft } from '@app/web/utils/resourceDraft'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'

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
      <SkipLinksPortal links={defaultSkipLinks} />
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
            <>
              <ResourceViewHeader resource={resource} />
              <ResourceViewSeparators onlyLeft withoutPadding />
              <PrivateBox type="Ressource" />
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default RessourcePage
