import React from 'react'
import BreadCrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { getResource } from '@app/web/server/resources'

export const revalidate = 0

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
  const resource = await getResource(decodeURI(params.slug))
  if (!resource) {
    notFound()
  }

  return (
    <>
      <BreadCrumb
        currentPageLabel={resource.title}
        homeLinkProps={{
          href: '/',
        }}
        segments={[{ label: 'Ressources', linkProps: { href: '/ressources' } }]}
      />
      <h1>{resource.title}</h1>
    </>
  )
}

export default RessourcePage
