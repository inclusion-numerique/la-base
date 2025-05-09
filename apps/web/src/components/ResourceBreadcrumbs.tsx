import Breadcrumbs from '@app/web/components/Breadcrumbs'
import React from 'react'

const ResourceBreadcrumbs = ({
  resource,
  currentChildPage,
}: {
  resource: {
    title: string
    slug: string
    base: { title: string; slug: string } | null
    createdBy: { name: string | null; slug: string }
  }
  currentChildPage?: string
}) => {
  const parents = resource.base
    ? [
        {
          label: resource.base.title,
          linkProps: { href: `/bases/${resource.base.slug}` },
        },
      ]
    : [
        {
          label: resource.createdBy.name || 'Profil anonyme',
          linkProps: { href: `/profils/${resource.createdBy.slug}` },
        },
      ]

  if (currentChildPage) {
    parents.push({
      label: resource.title,
      linkProps: { href: `/ressources/${resource.slug}` },
    })
  }

  return (
    <Breadcrumbs
      parents={parents}
      currentPage={currentChildPage || resource.title}
    />
  )
}

export default ResourceBreadcrumbs
