import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import { BasePermissions } from '@app/web/authorization/models/baseAuthorization'
import { CreateCollectionButton } from '@app/web/components/Collection/CreateCollectionButton'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import Link from 'next/link'
import React from 'react'

const BaseCollectionsPage = async ({
  params,
}: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

  const canWrite = hasPermission(BasePermissions.WriteBase)

  const { collections, savedCollections, id } = base
  return (
    <Collections
      user={user}
      collections={collections}
      savedCollections={savedCollections.map(({ collection }) => collection)}
      withCreation={canWrite}
      baseId={id}
      baseSlug={slug}
      collectionsLabel="Collections"
      emptyBox={
        canWrite ? (
          <EmptyBox
            title="Vous n’avez pas de collection dans cette base"
            titleAs="h3"
          >
            <p>
              Créez une collection pour organiser et partager facilement des
              ressources.&nbsp;
              <Link href="/centre-d-aide/les-collections" className="fr-link">
                En savoir plus
              </Link>
            </p>
            <div data-testid="create-resource-button">
              <CreateCollectionButton
                baseId={id}
                title="Créer une collection de base"
              />
            </div>
          </EmptyBox>
        ) : (
          <EmptyBox title="Cette base n’a pas créé de collections" titleAs="h3">
            Revenez plus tard ou suivez cette base afin d’être tenu informé de
            ses prochaines publications.
          </EmptyBox>
        )
      }
    />
  )
}

export default BaseCollectionsPage
