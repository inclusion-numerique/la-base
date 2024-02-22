import { notFound, redirect } from 'next/navigation'
import React from 'react'
import CreateCollection from '@app/web/components/Collection/Create/CreateCollection'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getBase } from '@app/web/server/bases/getBase'
import { createCollectionUrl } from '@app/web/collections/createCollectionUrl'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

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

  // TODO Security check on base
  const base = searchParams.base
    ? await getBase(searchParams.base, user)
    : undefined

  if (searchParams.base && !base) {
    notFound()
    return null
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
