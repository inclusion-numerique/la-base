import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceParameters from '@app/web/components/Resource/Edition/Parameters/ResourceParameters'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { getResource } from '@app/web/server/resources/getResource'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params

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
}: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${slug}/parametres`)
  }

  const resource = await getResource({ slug: decodeURI(slug) }, user)
  if (!resource || !resource.published) {
    notFound()
  }

  const canWrite = resourceAuthorization(resource, user).hasPermission(
    ResourcePermissions.WriteResource,
  )

  if (!canWrite) {
    redirect(`/ressources/${slug}`)
  }

  return (
    <>
      <SkipLinksPortal />
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
