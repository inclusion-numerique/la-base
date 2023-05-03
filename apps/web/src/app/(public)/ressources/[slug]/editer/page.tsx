import React from 'react'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getResource } from '@app/web/server/resources'
import Edition from '@app/web/components/Resource/Edition/Edition'

const ResourceEditionPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const resource = await getResource(decodeURI(params.slug))
  if (!resource) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        currentPage={resource.title}
        parents={[{ label: 'Ressources', linkProps: { href: '/ressources' } }]}
      />
      <Edition resource={resource} />
    </>
  )
}
export default ResourceEditionPage
