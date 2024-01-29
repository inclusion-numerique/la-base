import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Edition from '@app/web/components/Resource/Edition/ResourceEdition'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { filterAccess } from '@app/web/server/resources/authorization'
import { metadataTitle } from '@app/web/app/metadataTitle'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Éditeur de ressource'),
}

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
    getResource({ slug: decodeURI(params.slug) }, user),
    getResourceProjectionWithContext({ slug: decodeURI(params.slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }
  const authorizations = filterAccess(resource, user)
  if (!authorizations.authorized || !authorizations.isAdmin) {
    redirect(`/ressources/${params.slug}`)
  }

  return (
    <>
      <div className="fr-container">
        <ResourceBreadcrumbs resource={resource} currentChildPage="Éditer" />
      </div>
      <Edition resource={resource} draftResource={draftResource} user={user} />
    </>
  )
}
export default ResourceEditionPage
