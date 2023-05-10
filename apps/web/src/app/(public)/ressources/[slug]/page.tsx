import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import View from '@app/web/components/Resource/View/View'
import { getResource } from '@app/web/server/resources'

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
  const resource = await getResource(decodeURI(params.slug))
  const user = await getSessionUser()

  if (!resource) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        currentPage={resource.title}
        parents={[{ label: 'Ressources', linkProps: { href: '/ressources' } }]}
      />
      <View resource={resource} user={user} />
    </>
  )
}

export default RessourcePage
