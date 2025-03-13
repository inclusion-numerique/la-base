import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import PrivateBox from '@app/web/components/PrivateBox'
import { getCollection } from '@app/web/server/collections/getCollection'
import CollectionView from '@app/web/components/Collection/CollectionView'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import CollectionBreadcrumbs from '@app/web/components/CollectionBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import {
  collectionAuthorization,
  CollectionPermissions,
  CollectionRoles,
} from '@app/web/authorization/models/collectionAuthorization'
import BackButton from '@app/web/components/BackButton'

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const collection = await prismaClient.collection.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      description: true,
    },
  })
  if (!collection) {
    notFound()
  }

  return {
    title: metadataTitle(collection.title),
    description: collection.description || undefined,
  }
}

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)

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
        <div className="fr-hidden-md">
          <BackButton />
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
