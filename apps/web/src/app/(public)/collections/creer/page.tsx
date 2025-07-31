import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import { createCollectionUrl } from '@app/web/collections/createCollectionUrl'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import CreateCollection from '@app/web/components/Collection/Create/CreateCollection'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { contentId } from '@app/web/utils/skipLinks'
import { notFound, redirect } from 'next/navigation'

const CollectionCreationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ base?: string }>
}) => {
  const { base: baseId } = await searchParams
  const user = await getSessionUser()
  if (!user) {
    redirect(
      `/connexion?suivant=${createCollectionUrl({
        baseId,
      })}`,
    )
  }

  const base = baseId
    ? await prismaClient.base.findUnique({
        where: { id: baseId },
        select: { title: true, slug: true, ...baseAuthorizationTargetSelect },
      })
    : undefined

  if (
    baseId &&
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
      <SkipLinksPortal />
      <div className="fr-container">
        <Breadcrumbs parents={parents} currentPage="Créer une collection" />
      </div>
      <main id={contentId} className="fr-pt-1w">
        <CreateCollection user={user} base={base} />
      </main>
    </>
  )
}

export default CollectionCreationPage
