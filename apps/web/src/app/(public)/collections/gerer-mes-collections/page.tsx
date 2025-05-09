import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { managerCollectionUrl } from '@app/web/collections/manageCollectionUrl'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import CollectionOrderEdition from '@app/web/components/Collection/Edition/Order/CollectionOrderEdition'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { basePageQuery } from '@app/web/server/bases/getBase'
import { getProfileCollections } from '@app/web/server/collections/getCollectionsList'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ base: string }>
}): Promise<Metadata> => {
  const { base: baseSlug } = await searchParams

  if (baseSlug) {
    const base = await prismaClient.base.findUnique({
      where: { slug: baseSlug },
      select: { title: true, description: true },
    })
    if (!base) {
      notFound()
    }
    return {
      title: `Gérer mes collections | ${metadataTitle(base.title)}`,
      description: base.description || undefined,
    }
  }

  return {
    title: 'Gérer mes collections',
    description: 'Gérer mes collections',
  }
}

const ManageCollectionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ base: string }>
}) => {
  const { base: baseSlug } = await searchParams
  const user = await getSessionUser()
  if (!user) {
    redirect(
      `/connexion?suivant=${managerCollectionUrl({
        baseSlug,
      })}`,
    )
  }
  const base = await basePageQuery(decodeURI(baseSlug), user)

  const parents = base
    ? [
        {
          label: base.title,
          linkProps: {
            href: `/bases/${base.slug}`,
          },
        },
        {
          label: 'Collections',
          linkProps: {
            href: `/bases/${base.slug}/collections`,
          },
        },
      ]
    : [
        {
          label: user.name as string,
          linkProps: {
            href: `/profils/${user.slug}`,
          },
        },
        {
          label: 'Mes collections',
          linkProps: {
            href: `/profils/${user.slug}/collections`,
          },
        },
      ]

  const redirectProps = {
    href: base
      ? `/bases/${base.slug}/collections`
      : `/profils/${user.slug}/collections`,
    title: base
      ? 'Retour aux collections de la base'
      : 'Retour à mes collections',
  }
  const userCollections = await getProfileCollections(user.id, user)
  const baseCollections = base?.collections
  const withoutFavoriteCollections = userCollections.filter(
    (c) => !c.isFavorites,
  )

  const collections = baseCollections ?? withoutFavoriteCollections

  return (
    <>
      <SkipLinksPortal />
      <div className="fr-container">
        <Breadcrumbs parents={parents} currentPage="Gérer mes collections" />
      </div>
      <main id={contentId} className="fr-pt-1w">
        <CollectionOrderEdition
          redirectProps={redirectProps}
          collections={collections}
        />
      </main>
    </>
  )
}
export default ManageCollectionsPage
