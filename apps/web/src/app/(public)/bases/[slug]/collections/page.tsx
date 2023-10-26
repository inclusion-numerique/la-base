import { notFound } from 'next/navigation'
import React from 'react'
import { basePageQuery } from '@app/web/server/bases/getBase'
import Header from '@app/web/components/Base/Header'
import Menu from '@app/web/components/Base/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import EmptyCollections from '@app/web/components/Base/EmptyCollections'
import { filterAccess } from '@app/web/server/bases/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import { CreateCollectionButton } from '@app/web/components/Collection/CreateCollectionButton'

const BaseCollectionsPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  const base = await basePageQuery(decodeURI(params.slug), user)

  if (!base) {
    notFound()
  }

  const authorizations = filterAccess(base, user)
  return authorizations.authorized ? (
    <>
      <Header base={base} isMember={authorizations.isMember} />
      <Menu base={base} current="collections" />
      <div className="fr-container fr-mb-4w">
        {base.collections.length === 0 ? (
          <EmptyCollections isMember={authorizations.isMember} />
        ) : (
          <Collections
            collections={base.collections}
            withCreation={authorizations.isMember}
            withTabs
            collectionsLabel="Collections de la base"
            emptyBox={
              authorizations.isMember ? (
                <EmptyBox title="Vous n’avez pas de collections dans cette base.">
                  <div data-testid="create-resource-button">
                    <CreateCollectionButton />
                  </div>
                </EmptyBox>
              ) : (
                <EmptyBox title="Pas de collections enregistrées dans cette base." />
              )
            }
            emptySavedBox={
              authorizations.isMember ? (
                <EmptyBox title="Vous n’avez pas enregistré de collections dans cette base.">
                  Enregistrez la liste de quelqu&lsquo;un d&lsquo;autre et elle
                  apparaîtra ici.
                </EmptyBox>
              ) : (
                <EmptyBox title="Pas de collections enregistrées dans cette base." />
              )
            }
          />
        )}
      </div>
    </>
  ) : (
    <>
      <Header base={authorizations.base} />
      <PrivateBox type="Base" />
    </>
  )
}

export default BaseCollectionsPage
