'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useMemo, useRef, useState } from 'react'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import CollectionViewHeader from '@app/web/components/Collection/CollectionViewHeader'
import CollectionResourcesListEdition from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourcesListEdition'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import EmptyBaseCollections from '@app/web/components/Base/EmptyBaseCollections'

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
      collection.resources.map(({ collectionResourceId, resource }) => ({
        ...resource,
        collectionResourceId,
      })),
    [collection.resources],
  )
  const [orderedCollectionsResources, setOrderedCollectionsResources] =
    useState(resourcesWithCollectionResourceId)
  useOnDiff(resourcesWithCollectionResourceId, setOrderedCollectionsResources)

  const router = useRouter()

  const updateOrdersMutation =
    trpc.collectionResource.updateOrders.useMutation()

  const hasOrderChanged = useMemo(
    () =>
      orderedCollectionsResources.some(
        (collectionResource, index) =>
          collectionResource.id !== collection.resources[index]?.resource.id,
      ),
    [orderedCollectionsResources, collection.resources],
  )

  const cancelOrdering = () => {
    if (hasOrderChanged) {
      setOrderedCollectionsResources(resourcesWithCollectionResourceId)
    } else {
      router.back()
    }
  }
  const sendCommand = async () => {
    try {
      await updateOrdersMutation.mutateAsync({
        resources: orderedCollectionsResources.map(
          (collectionResource, index) => ({
            order: index,
            resourceId: collectionResource.id,
            id: collectionResource.collectionResourceId,
          }),
        ),
      })
      createToast({
        priority: 'success',
        message: 'Ressources de collection réorganisées avec succès',
      })
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
      updateOrdersMutation.reset()
    }
  }

  return (
    <>
      <CollectionViewHeader collection={collection} />
      <div>
        <div className="fr-border-bottom fr-border--grey">
          <div className="fr-container fr-container--medium fr-my-5v">
            {collection.slug && (
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
                <CollectionMetaData
                  withCollectionDates={false}
                  collection={{
                    title: collection.title,
                    id: collection.id,
                    slug: collection.slug,
                    isFavorites: collection.isFavorites,
                    isPublic: collection.isPublic,
                    created: collection.created,
                    updated: collection.updated,
                  }}
                  count={collection.resources.length}
                  context="view"
                />
                <div className="fr-flex fr-flex-gap-2v">
                  <Button
                    ref={cancelButtonRef}
                    priority="secondary"
                    onClick={cancelOrdering}
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
            collectionId={collection.id}
            resources={orderedCollectionsResources}
            setOrderedCollectionsResources={setOrderedCollectionsResources}
          />
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
