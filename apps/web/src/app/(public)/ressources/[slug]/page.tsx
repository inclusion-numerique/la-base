import React from 'react'
import { notFound } from 'next/navigation'
import { getResource } from '@app/web/server/resources'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import PublishedInInformation from '@app/web/components/Resource/PublishedInInformation'
import ResourceNavigation from '@app/web/components/Resource/View/ResourceNavigation'
import ResourceContents from '@app/web/components/Resource/View/ResourceContents'

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
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-lg-8">
          <PublishedInInformation resource={resource} />
        </div>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">BADGE</div>
      </div>
      <div className="fr-grid-row fr-mt-8v">
        <div className="fr-col-12 fr-col-lg-8">
          <hr />
        </div>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">
          <hr />
        </div>
      </div>

      <div className="fr-grid-row" style={{ flexDirection: 'row-reverse' }}>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">
          <ResourceNavigation resource={resource} />
        </div>
        <div className="fr-col-12 fr-col-lg-8">
          <ResourceContents resource={resource} />
        </div>
      </div>
    </>
  )
}

export default RessourcePage
