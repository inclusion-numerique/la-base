import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import CollectionEdition from '@app/web/components/Collection/Edition/CollectionEdition'
import { getCollection } from '@app/web/server/collections/getCollection'
import { prismaClient } from '@app/web/prismaClient'

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
    title: collection.title,
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
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          {
            label: 'Mon profil',
            linkProps: { href: `/profils/${user.slug}` },
          },
          {
            label: 'Mes collections',
            linkProps: { href: `/profils/${user.slug}/collections` },
          },
          {
            label: collection.title,
            linkProps: { href: `/collections/${params.slug}` },
          },
        ]}
        currentPage="Éditer la collection"
      />
      <div className="fr-mt-6w fr-mb-4w">
        <CollectionEdition collection={collection} />
      </div>
    </div>
  )
}

export default CollectionEditionPage
