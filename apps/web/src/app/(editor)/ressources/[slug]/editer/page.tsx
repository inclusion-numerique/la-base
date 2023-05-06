import React from 'react'
import { notFound, redirect } from 'next/navigation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getResource } from '@app/web/server/resources'
import Edition from '@app/web/components/Resource/Edition/Edition'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'

const ResourceEditionPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${params.slug}/editer`)
  }

  const resource = await getResource(decodeURI(params.slug))
  if (!resource) {
    notFound()
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header user={user} backLink={`/ressources/${resource.slug}`} />
      <div style={{ flex: 1 }}>
        <div className="fr-container">
          <Breadcrumbs
            currentPage={resource.title}
            parents={[
              { label: 'Ressources', linkProps: { href: '/ressources' } },
            ]}
          />
        </div>
        <Edition resource={resource} user={user} />
      </div>
    </div>
  )
}
export default ResourceEditionPage
