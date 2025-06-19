import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  CollectionRoles,
  collectionAuthorization,
} from '@app/web/authorization/models/collectionAuthorization'
import CollectionResourcesOrderEdition from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourcesOrderEdition'
import CollectionBreadcrumbs from '@app/web/components/CollectionBreadcrumbs'
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
    },
  })
  if (!collection) {
    notFound()
  }

  return {
    title: `Gérer les ressources de la collection | ${metadataTitle(
      collection.title,
    )}`,
    description: collection.description || undefined,
  }
}

const ManageCollectionResourcesPage = async (props: {
  params: Promise<{ slug: string }>
}) => {
  const params = await props.params
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)
  if (!collection) {
    notFound()
  }
  const { hasRole } = collectionAuthorization(collection, user)

  const isOwner = hasRole(CollectionRoles.CollectionCreator)

  return (
    <>
      <SkipLinksPortal />
      <div
        className={
          collection.isFavorites
            ? 'fr-background-alt--pink-tuile'
            : 'fr-background-alt--blue-france'
        }
      >
        <div className="fr-container fr-pt-2w fr-hidden fr-unhidden-md">
          <CollectionBreadcrumbs collection={collection} className="fr-my-0" />
        </div>
      </div>
      <main id={contentId}>
        <CollectionResourcesOrderEdition
          collection={collection}
          isOwner={isOwner}
        />
      </main>
    </>
  )
}

export default ManageCollectionResourcesPage
