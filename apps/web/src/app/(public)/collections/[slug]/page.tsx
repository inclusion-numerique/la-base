import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  CollectionPermissions,
  CollectionRoles,
  collectionAuthorization,
} from '@app/web/authorization/models/collectionAuthorization'
import CollectionView from '@app/web/components/Collection/CollectionView'
import CollectionBreadcrumbs from '@app/web/components/CollectionBreadcrumbs'
import PrivateBox from '@app/web/components/PrivateBox'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { resolveShareableLinkToken } from '@app/web/features/shareableLink/db/resolveShareableLinkToken'
import { isShareableLinkToken } from '@app/web/features/shareableLink/utils/isShareToken'
import { prismaClient } from '@app/web/prismaClient'
import { getCollection } from '@app/web/server/collections/getCollection'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ token?: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const { token } = await searchParams

  if (isShareableLinkToken(slug) || (token && isShareableLinkToken(token))) {
    const shareToken = isShareableLinkToken(slug) ? slug : token!
    const tokenResult = await resolveShareableLinkToken(shareToken, 'base')
    if (!tokenResult) {
      notFound()
    }

    const collection = await prismaClient.collection.findUnique({
      where: { slug: isShareableLinkToken(slug) ? undefined : slug },
      select: { title: true, description: true },
    })

    if (!collection) {
      notFound()
    }

    return {
      title: metadataTitle(collection.title),
      description: collection.description || undefined,
      robots: 'noindex, nofollow',
    }
  }

  const collection = await prismaClient.collection.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      description: true,
      isPublic: true,
    },
  })
  if (!collection) {
    notFound()
  }

  return {
    title: metadataTitle(collection.title),
    description: collection.description || undefined,
    robots: collection.isPublic ? undefined : 'noindex, nofollow',
  }
}

const CollectionPage = async ({
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
  let shareToken: string | undefined

  if (isShareableLinkToken(slug) || (token && isShareableLinkToken(token))) {
    shareToken = isShareableLinkToken(slug) ? slug : token!
    const tokenResult = await resolveShareableLinkToken(shareToken, 'base')
    if (!tokenResult) {
      notFound()
    }
    actualSlug = decodeURI(slug)
    isUsingShareToken = true
  }

  const collection = await getCollection(
    { slug: actualSlug },
    user,
    isUsingShareToken,
  )

  if (!collection) {
    notFound()
  }
  const { hasPermission, hasRole } = collectionAuthorization(
    collection,
    user,
    isUsingShareToken,
  )

  const canReadGeneralInformation = hasPermission(
    CollectionPermissions.ReadGeneralCollectionInformation,
  )
  const canWrite = hasPermission(CollectionPermissions.WriteCollection)
  if (!canReadGeneralInformation) {
    notFound()
  }

  const canReadContent = hasPermission(
    CollectionPermissions.ReadCollectionContent,
  )
  const isOwner = hasRole(CollectionRoles.CollectionCreator)
  const isFavorite = collection.isFavorites
  return (
    <>
      <SkipLinksPortal />
      <div
        className={
          isFavorite
            ? 'fr-background-alt--pink-tuile'
            : 'fr-background-alt--blue-france'
        }
      >
        <div className="fr-container fr-pt-2w fr-hidden fr-unhidden-md">
          <CollectionBreadcrumbs collection={collection} className="fr-my-0" />
        </div>
      </div>
      <main id={contentId}>
        {canReadContent ? (
          <CollectionView
            collection={collection}
            user={user}
            isOwner={isOwner}
            canWrite={canWrite}
            shareToken={shareToken}
          />
        ) : (
          <div className="fr-container fr-container--medium fr-my-4w">
            <PrivateBox type="Collection" />
          </div>
        )}
      </main>
    </>
  )
}

export default CollectionPage
