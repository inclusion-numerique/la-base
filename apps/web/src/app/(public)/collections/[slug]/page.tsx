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
} from '@app/web/authorization/models/collectionAuthorization'

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
    },
  })
  if (!collection) {
    notFound()
  }

  return {
    title: metadataTitle(collection.title),
  }
}

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)

  if (!collection) {
    notFound()
  }
  const { hasPermission } = collectionAuthorization(collection, user)

  const canReadGeneralInformation = hasPermission(
    CollectionPermissions.ReadGeneralCollectionInformation,
  )
  if (!canReadGeneralInformation) {
    notFound()
  }

  const canReadContent = hasPermission(
    CollectionPermissions.ReadCollectionContent,
  )
  const canWrite = hasPermission(CollectionPermissions.WriteCollection)

  return (
    <>
      <SkipLinksPortal />
      <div className="fr-container">
        <CollectionBreadcrumbs collection={collection} />
      </div>
      <main
        id={contentId}
        className="fr-container fr-container--medium fr-mb-20v fr-pb-20v"
      >
        {canReadContent ? (
          <CollectionView
            collection={collection}
            user={user}
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
