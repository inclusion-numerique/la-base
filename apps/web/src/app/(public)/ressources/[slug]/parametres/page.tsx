import { notFound, redirect } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getResource } from '@app/web/server/resources/getResource'
import { filterAccess } from '@app/web/server/resources/authorization'
import ResourceParameters from '@app/web/components/Resource/Edition/Parameters/ResourceParameters'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const resource = await prismaClient.resource.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
    },
  })
  if (!resource) {
    notFound()
  }

  return {
    title: metadataTitle(`${resource.title} - Paramètres`),
  }
}

const ResourceParametersPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${params.slug}/parametres`)
  }

  const resource = await getResource({ slug: decodeURI(params.slug) }, user)
  if (!resource || !resource.published) {
    notFound()
  }

  const authorizations = filterAccess(resource, user)
  if (!authorizations.authorized || !authorizations.isAdmin) {
    redirect(`/ressources/${params.slug}`)
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container">
        <ResourceBreadcrumbs
          resource={resource}
          currentChildPage="Paramètres"
        />
      </div>
      <main id={contentId} className="fr-mt-1w fr-mb-4w">
        <ResourceParameters resource={resource} user={user} />
      </main>
    </>
  )
}
export default ResourceParametersPage
