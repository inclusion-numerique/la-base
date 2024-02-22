import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import CollectionEdition from '@app/web/components/Collection/Edition/CollectionEdition'
import { getCollection } from '@app/web/server/collections/getCollection'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import CollectionBreadcrumbs from '@app/web/components/CollectionBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

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
  // TODO comment "security check" , we will do a security pass everywhere in a few weeks
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)

  if (!collection || !user) {
    notFound()
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
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
