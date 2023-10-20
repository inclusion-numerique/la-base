import { notFound } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { filterAccess } from '@app/web/server/collections/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import { getCollection } from '@app/web/server/collections/getCollection'
import View from '@app/web/components/Collection/View'

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const collection = await getCollection(decodeURI(params.slug), user)

  if (!collection) {
    notFound()
  }

  const authorizations = filterAccess(collection, user)
  return authorizations.authorized ? (
    <div className="fr-container fr-my-4w">
      <View
        collection={collection}
        user={user}
        isOwner={authorizations.isOwner}
      />
    </div>
  ) : (
    <PrivateBox type="Collection" />
  )
}

export default CollectionPage
