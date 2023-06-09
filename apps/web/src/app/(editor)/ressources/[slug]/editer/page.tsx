import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Edition from '@app/web/components/Resource/Edition/Edition'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'

const ResourceEditionPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${params.slug}/editer`)
  }

  const [resource, draftResource] = await Promise.all([
    getResource({ slug: decodeURI(params.slug) }),
    getResourceProjectionWithContext({ slug: decodeURI(params.slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage="Éditer"
          parents={[
            { label: 'Ressources', linkProps: { href: '/ressources' } },
            {
              label: resource.title,
              linkProps: { href: `/ressources/${resource.slug}` },
            },
          ]}
        />
      </div>
      <Edition resource={resource} draftResource={draftResource} user={user} />
    </>
  )
}
export default ResourceEditionPage
