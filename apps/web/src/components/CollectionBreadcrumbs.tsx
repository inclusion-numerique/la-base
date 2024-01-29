import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

const CollectionBreadcrumbs = ({
  collection,
  currentChildPage,
}: {
  collection: {
    title: string
    slug: string
    base: { title: string; slug: string } | null
    owner: { name: string | null; slug: string }
  }
  currentChildPage?: string
}) => {
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

  if (currentChildPage) {
    parents.push({
      label: collection.title,
      linkProps: { href: `/collections/${collection.slug}` },
    })
  }

  return (
    <Breadcrumbs
      parents={parents}
      currentPage={currentChildPage || collection.title}
    />
  )
}

export default CollectionBreadcrumbs
