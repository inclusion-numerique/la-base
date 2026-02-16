'use client'

import { createToast } from '@app/ui/toast/createToast'
import EmptyBaseCollections from '@app/web/components/Base/EmptyBaseCollections'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import CollectionViewHeader from '@app/web/components/Collection/CollectionViewHeader'
import CollectionResourcesListEdition from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourcesListEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import type {
  CollectionPageData,
  CollectionResourceListItem,
} from '@app/web/server/collections/getCollection'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'

const CollectionResourcesOrderEdition = ({
  collection,
  isOwner,
}: {
  collection: CollectionPageData
  isOwner: boolean
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const resourcesWithCollectionResourceId = useMemo(
    () =>
      collection.resources.map(
        ({ collectionResourceId, resource, shareToken }) => ({
          ...resource,
          collectionResourceId,
          shareToken,
        }),
      ),
    [collection.resources],
  )
  const [collectionsResources, setCollectionsResources] = useState<{
    orderedCollectionsResources: CollectionResourceListItem[]
    deletedResources: string[]
  }>({
    orderedCollectionsResources: resourcesWithCollectionResourceId,
    deletedResources: [],
  })

  const setOrderedCollectionsResources = (
    orderedCollectionsResources: CollectionResourceListItem[],
  ) =>
    setCollectionsResources((previous) => ({
      ...previous,
      orderedCollectionsResources,
    }))
  useOnDiff(resourcesWithCollectionResourceId, setOrderedCollectionsResources)

  const router = useRouter()

  const updateOrdersMutation =
    trpc.collectionResource.updateOrders.useMutation()
  const removeListFromCollectionMutation =
    trpc.resource.removeListFromCollection.useMutation()

  const hasOrderChanged = useMemo(
    () =>
      collectionsResources.orderedCollectionsResources.some(
        (collectionResource, index) =>
          collectionResource.id !== collection.resources[index]?.resource.id,
      ) || collectionsResources.deletedResources.length > 0,
    [collectionsResources, collection.resources],
  )

  const redirectToCollection = () =>
    router.push(`/collections/${collection.slug}`)

  const sendCommand = async () => {
    try {
      const updateOrdersMutationPromise = updateOrdersMutation.mutateAsync({
        resources: collectionsResources.orderedCollectionsResources.map(
          (collectionResource, index) => ({
            order: index,
            resourceId: collectionResource.id,
            id: collectionResource.collectionResourceId,
          }),
        ),
      })
      const removeResourcesMutationPromise =
        removeListFromCollectionMutation.mutateAsync({
          resourcesIds: collectionsResources.deletedResources,
          collectionId: collection.id,
        })
      await Promise.all([
        updateOrdersMutationPromise,
        removeResourcesMutationPromise,
      ])
      createToast({
        priority: 'success',
        message: 'Ressources de collection réorganisées avec succès',
      })
      redirectToCollection()
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
      updateOrdersMutation.reset()
    }
  }
  const { orderedCollectionsResources, deletedResources } = collectionsResources
  return (
    <>
      <CollectionViewHeader collection={collection} />
      <div>
        <div className="fr-border-bottom fr-border--grey">
          <div className="fr-container fr-container--medium fr-my-5v">
            {collection.slug && (
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
                <CollectionMetaData
                  className="fr-my-2v"
                  collection={{
                    title: collection.title,
                    id: collection.id,
                    slug: collection.slug,
                    isFavorites: collection.isFavorites,
                    isPublic: collection.isPublic,
                    created: collection.created,
                    updated: collection.updated,
                  }}
                  count={orderedCollectionsResources.length}
                  context="view"
                  withPrivacyTag={!collection.isPublic}
                />
                <div className="fr-flex fr-flex-gap-2v">
                  <Button
                    ref={cancelButtonRef}
                    priority="secondary"
                    onClick={redirectToCollection}
                  >
                    Annuler
                  </Button>
                  <Button
                    ref={saveButtonRef}
                    onClick={sendCommand}
                    nativeButtonProps={{
                      disabled: !hasOrderChanged,
                    }}
                  >
                    Enregistrer les modifications
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fr-container fr-container--medium">
        {orderedCollectionsResources.length > 0 ? (
          <CollectionResourcesListEdition
            resources={orderedCollectionsResources}
            setCollectionsResources={setCollectionsResources}
          />
        ) : deletedResources.length > 0 &&
          orderedCollectionsResources.length === 0 ? (
          <div className="fr-mt-md-6w fr-mt-3w">
            <div className="fr-border fr-border-radius--8 fr-text--center fr-px-12v fr-py-8v">
              <span className="fr-text--medium fr-text-mention--grey">
                Vous avez retiré toutes les ressources de cette collection.
              </span>
            </div>
          </div>
        ) : (
          <div className="fr-pt-12v">
            <EmptyBaseCollections isOwner={isOwner} />
          </div>
        )}
      </div>
    </>
  )
}

export default withTrpc(CollectionResourcesOrderEdition)
