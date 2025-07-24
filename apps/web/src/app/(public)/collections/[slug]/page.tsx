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
import { prismaClient } from '@app/web/prismaClient'
import { getCollection } from '@app/web/server/collections/getCollection'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params

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
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(slug) }, user)

  if (!collection) {
    notFound()
  }
  const { hasPermission, hasRole } = collectionAuthorization(collection, user)

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
