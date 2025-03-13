import { notFound, redirect } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import CollectionEdition from '@app/web/components/Collection/Edition/CollectionEdition'
import { getCollection } from '@app/web/server/collections/getCollection'
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

const CollectionEditionPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)

  if (!collection || collection.isFavorites) {
    notFound()
  }
  const { hasPermission } = collectionAuthorization(collection, user)

  const canReadGeneralInformation = hasPermission(
    CollectionPermissions.ReadGeneralCollectionInformation,
  )
  if (!canReadGeneralInformation) {
    notFound()
  }

  const canWrite = hasPermission(CollectionPermissions.WriteCollection)
  if (!canWrite) {
    redirect(`/collections/${collection.slug}`)
  }

  return (
    <>
      <SkipLinksPortal />
      <div className="fr-container">
        <CollectionBreadcrumbs
          collection={collection}
          currentChildPage="Modifier"
        />
        <main id={contentId} className="fr-mt-6w fr-mb-4w">
          <CollectionEdition collection={collection} />
        </main>
      </div>
    </>
  )
}

export default CollectionEditionPage
