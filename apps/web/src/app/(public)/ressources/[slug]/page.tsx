import React from 'react'
import { notFound } from 'next/navigation'
import { getResource } from '@app/web/server/resources'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Link from 'next/link'

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
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
      <h1>{resource.title}</h1>
      <Link className="fr-btn" href={`/ressources/${params.slug}/editer`}>
        Modifier
      </Link>
    </>
  )
}

export default RessourcePage
