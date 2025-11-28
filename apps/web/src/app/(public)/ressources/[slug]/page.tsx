import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { applyDraft } from '@app/web/utils/resourceDraft'
import { contentId } from '@app/web/utils/skipLinks'
import { uploadedImageLoader } from '@app/web/utils/uploadedImageLoader'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PrivateResourceView from './_components/PrivateResourceView'
import ResourceView from './_components/ResourceView'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params

  const resource = await prismaClient.resource.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      image: {
        include: {
          upload: true,
        },
      },
    },
  })
  if (!resource) {
    notFound()
  }
  const imageUrl = resource.image
    ? uploadedImageLoader({ src: resource.image.id, width: 500 })
    : null

  return {
    ...(imageUrl && {
      openGraph: {
        title: metadataTitle(resource.title),
        description: resource.description || undefined,
        images: [
          {
            url: getServerUrl(imageUrl),
          },
        ],
      },
    }),
    title: metadataTitle(resource.title),
    description: resource.description || undefined,
  }
}

const RessourcePage = async ({
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

  const canReadGeneralInformation = hasPermission(
    ResourcePermissions.ReadGeneralResourceInformation,
  )
  if (!canReadGeneralInformation) {
    notFound()
  }

  const canWrite =
    hasPermission(ResourcePermissions.WriteResource) && user?.role !== 'Admin'
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
