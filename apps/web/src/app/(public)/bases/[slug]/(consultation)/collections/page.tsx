import React from 'react'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import { CreateCollectionButton } from '@app/web/components/Collection/CreateCollectionButton'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseCollectionsPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(params.slug)

  const canWrite = hasPermission('WriteBase')

  const { collections, savedCollections, id } = base

  return (
    <Collections
      user={user}
      collections={collections}
      savedCollections={savedCollections.map(({ collection }) => collection)}
      withCreation={canWrite}
      baseId={id}
      collectionsLabel="Collections de la base"
      emptyBox={
        canWrite ? (
          <EmptyBox title="Vous n’avez pas de collections dans cette base">
            <div data-testid="create-resource-button">
              <CreateCollectionButton baseId={id} />
            </div>
          </EmptyBox>
        ) : (
          <EmptyBox title="Cette base n’a pas créé de collections">
            Revenez plus tard ou suivez cette base afin d’être tenu informé de
            ses prochaines publications.
          </EmptyBox>
        )
      }
      emptySavedBox={
        canWrite ? (
          <EmptyBox title="Vous n’avez pas enregistré de collections dans cette base">
            Enregistrez la collection de quelqu&lsquo;un d&lsquo;autre et elle
            apparaîtra ici.
          </EmptyBox>
        ) : (
          <EmptyBox title="Cette base n’a pas enregistré de collections">
            Revenez plus tard ou suivez cette base afin d’être tenu informé de
            ses prochaines publications.
          </EmptyBox>
        )
      }
    />
  )
}

export default BaseCollectionsPage
