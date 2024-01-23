import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { filterAccess } from '@app/web/server/collections/authorization'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import PrivateBox from '@app/web/components/PrivateBox'
import { getCollection } from '@app/web/server/collections/getCollection'
import CollectionView from '@app/web/components/Collection/CollectionView'

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const collection = await getCollection({ slug: decodeURI(params.slug) }, user)

  if (!collection) {
    notFound()
  }

  const parents = collection.base
    ? [
        {
          label: collection.base.title,
          linkProps: { href: `/bases/${collection.base.slug}` },
        },
        {
          label: 'Collections',
          linkProps: { href: `/bases/${collection.base.slug}/collections` },
        },
      ]
    : [
        {
          label: collection.owner.name || 'Profil anonyme',
          linkProps: { href: `/profils/${collection.owner.slug}` },
        },
        {
          label: 'Collections',
          linkProps: { href: `/profils/${collection.owner.slug}/collections` },
        },
      ]

  const authorizations = filterAccess(collection, user)
  return (
    <>
      <div className="fr-container">
        <Breadcrumbs parents={parents} currentPage={collection.title} />
      </div>
      <div className="fr-container fr-container--medium fr-mb-20v fr-pb-20v">
        {authorizations.authorized ? (
          <CollectionView
            collection={collection}
            user={user}
            isOwner={authorizations.isOwner}
          />
        ) : (
          <div className="fr-container fr-container--medium fr-my-4w">
            <PrivateBox type="Collection" />
          </div>
        )}
      </div>
    </>
  )
}

export default CollectionPage
