import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Edition from '@app/web/components/Resource/Edition/Edition'
import { getResource } from '@app/web/server/resources'

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
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage={resource.title}
          parents={[
            { label: 'Ressources', linkProps: { href: '/ressources' } },
          ]}
        />
      </div>
      <Edition resource={resource} user={user} />
    </>
  )
}
export default ResourceEditionPage
