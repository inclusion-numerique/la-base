import React from 'react'
import BreadCrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { getRessource, getRessourcesSlug } from '@app/web/server/ressources'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export const generateStaticParams = (): Promise<{ slug: string }[]> =>
  getRessourcesSlug()

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
  const ressource = await getRessource(decodeURI(params.slug))
  if (!ressource) {
    notFound()
  }

  return (
    <>
      <BreadCrumb
        currentPageLabel={ressource.title}
        homeLinkProps={{
          href: '/',
        }}
        segments={[{ label: 'Ressources', linkProps: { href: '/ressources' } }]}
      />
      <h1>{ressource.title}</h1>
    </>
  )
}

export default RessourcePage
