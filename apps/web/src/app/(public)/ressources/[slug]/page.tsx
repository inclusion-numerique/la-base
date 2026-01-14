import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { resolveShareableLinkToken } from '@app/web/features/shareableLink/db/resolveShareableLinkToken'
import { updateShareableLinkAccessCount } from '@app/web/features/shareableLink/db/updateShareableLinkAccessCount'
import { isShareableLinkToken } from '@app/web/features/shareableLink/utils/isShareToken'
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

  // we dont want to index the shareable link token
  if (isShareableLinkToken(slug)) {
    const tokenResult = await resolveShareableLinkToken(slug, 'resource')
    if (!tokenResult) {
      notFound()
    }

    const resource = await prismaClient.resource.findUnique({
      where: { slug: tokenResult.resource?.slug },
      select: { title: true, description: true },
    })

    if (!resource) {
      notFound()
    }

    return {
      title: metadataTitle(resource.title),
      description: resource.description || undefined,
      robots: 'noindex, nofollow',
    }
  }

  const resource = await prismaClient.resource.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      isPublic: true,
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
    robots: resource.isPublic ? undefined : 'noindex, nofollow',
  }
}

const RessourcePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ token?: string }>
}) => {
  const { slug } = await params
  const { token } = await searchParams
  const user = await getSessionUser()

  let actualSlug = decodeURI(slug)
  let isUsingShareToken = false
  let shareableLinkId: string | undefined

  if (isShareableLinkToken(slug)) {
    const tokenResult = await resolveShareableLinkToken(slug, 'resource')
    if (!tokenResult || !tokenResult.resource) {
      notFound()
    }
    actualSlug = tokenResult.resource.slug
    isUsingShareToken = true
    shareableLinkId = tokenResult.id
    await updateShareableLinkAccessCount(tokenResult.id)
  } else if (token && isShareableLinkToken(token)) {
    const tokenResult = await resolveShareableLinkToken(token, 'base')
    if (!tokenResult) {
      notFound()
    }
    isUsingShareToken = true
    shareableLinkId = tokenResult.id
    await updateShareableLinkAccessCount(tokenResult.id)
  }

  const savedResource = await getResource({ slug: actualSlug }, user)

  const draftResource = savedResource?.published
    ? null
    : await getResourceProjectionWithContext({
        slug: actualSlug,
      })

  const resource = applyDraft(savedResource, draftResource)

  if (!resource) {
    notFound()
  }

  const { hasPermission } = resourceAuthorization(
    resource,
    user,
    isUsingShareToken,
  )

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
              shareableLinkId={shareableLinkId}
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
