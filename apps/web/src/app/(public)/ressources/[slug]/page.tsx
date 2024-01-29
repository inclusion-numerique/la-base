import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import ResourceView from '@app/web/components/Resource/View/ResourceView'
import { getResource } from '@app/web/server/resources/getResource'
import { filterAccess } from '@app/web/server/resources/authorization'
import ResourceViewHeader from '@app/web/components/Resource/View/ResourceViewHeader'
import PrivateBox from '@app/web/components/PrivateBox'
import ResourceViewSeparators from '@app/web/components/Resource/View/ResourceViewSeparators'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import ResourceBreadcrumbs from '@app/web/components/ResourceBreadcrumbs'

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
    title: metadataTitle(resource.title),
  }
}

const RessourcePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const resource = await getResource({ slug: decodeURI(params.slug) }, user)

  if (!resource) {
    notFound()
  }

  const authorizations = filterAccess(resource, user)

  return (
    <div className="fr-container">
      <ResourceBreadcrumbs resource={resource} />
      {authorizations.authorized ? (
        <ResourceView
          user={user}
          resource={authorizations.resource}
          isAdmin={authorizations.isAdmin}
        />
      ) : (
        <>
          <ResourceViewHeader resource={authorizations.resource} />
          <ResourceViewSeparators onlyLeft withoutPadding />
          <PrivateBox type="Ressource" />
        </>
      )}
    </div>
  )
}

export default RessourcePage
