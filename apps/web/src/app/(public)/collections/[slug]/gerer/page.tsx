import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import CollectionResourcesOrderEdition from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourcesOrderEdition'
import { getCollection } from '@app/web/server/collections/getCollection'
import CollectionBreadcrumbs from '@app/web/components/CollectionBreadcrumbs'

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
    title: `Gérer les ressources de la collection | ${metadataTitle(
      collection.title,
    )}`,
    description: collection.description || undefined,
  }
}

const ManageCollectionResourcesPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)
  if (!collection) {
    notFound()
  }

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
        <CollectionResourcesOrderEdition collection={collection} />
      </main>
    </>
  )
}

export default ManageCollectionResourcesPage
