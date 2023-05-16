import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Edition from '@app/web/components/Resource/Edition/Edition'
import { prismaClient } from '@app/web/prismaClient'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceFromEvents } from '@app/web/server/resources/getResourceFromEvents'

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
    getResourceFromEvents({ slug: decodeURI(params.slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }

  const [draftCreatedBy, draftBase, draftImage] = await Promise.all([
    prismaClient.user.findUniqueOrThrow({
      where: { id: draftResource.createdById },
    }),
    draftResource.baseId
      ? prismaClient.base.findUnique({ where: { id: draftResource.baseId } })
      : null,
    draftResource.imageId
      ? prismaClient.image.findUnique({ where: { id: draftResource.imageId } })
      : null,
  ])

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
      <Edition
        resource={resource}
        draftResource={draftResource}
        draftCreatedBy={draftCreatedBy}
        draftBase={draftBase}
        draftImage={draftImage}
        user={user}
      />
    </>
  )
}
export default ResourceEditionPage
