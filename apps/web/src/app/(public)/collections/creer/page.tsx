import { notFound, redirect } from 'next/navigation'
import React from 'react'
import CreateCollection from '@app/web/components/Collection/Create/CreateCollection'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { createCollectionUrl } from '@app/web/collections/createCollectionUrl'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { prismaClient } from '@app/web/prismaClient'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'

const CollectionCreationPage = async ({
  searchParams = {},
}: {
  searchParams?: { base?: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(
      `/connexion?suivant=${createCollectionUrl({
        baseId: searchParams.base,
      })}`,
    )
  }

  const base = searchParams.base
    ? await prismaClient.base.findUnique({
        where: { id: searchParams.base },
        select: { title: true, slug: true, ...baseAuthorizationTargetSelect },
      })
    : undefined

  if (
    searchParams.base &&
    (!base ||
      !baseAuthorization(base, user).hasPermission(BasePermissions.WriteBase))
  ) {
    notFound()
  }

  const parents = base
    ? [
        {
          label: base.title,
          linkProps: { href: `/bases/${base.slug}` },
        },
      ]
    : []

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container">
        <Breadcrumbs parents={parents} currentPage="Créer une collection" />
      </div>
      <main id={contentId} className="fr-mt-1w">
        <CreateCollection user={user} base={base} />
      </main>
    </>
  )
}

export default CollectionCreationPage
