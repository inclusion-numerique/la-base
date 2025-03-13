'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import DraggableResourceCollectionOrderRow from '@app/web/components/Collection/Edition/Resources/Order/DraggableCollectionResourceOrderRow'
import { CollectionResourceListItem } from '@app/web/server/collections/getCollection'

const CollectionResourcesListEdition = ({
  resources,
}: {
  resources: CollectionResourceListItem[]
}) => {
  const router = useRouter()
  const updateOrdersMutation =
    trpc.collectionResource.updateOrders.useMutation()
  const [orderedCollectionsResources, setOrderedCollectionsResources] =
    useState(resources)

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dragBoundaryRef = useRef<HTMLElement>(null)

  const onReorder = (items: CollectionResourceListItem[]) =>
    setOrderedCollectionsResources(items)

  useOnDiff(resources, setOrderedCollectionsResources)

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

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (selectedIndex === null) return

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault()
        if (selectedIndex > 0) {
          const newList = [...orderedCollectionsResources]
          const temporary = newList[selectedIndex]
          newList[selectedIndex] = newList[selectedIndex - 1]
          newList[selectedIndex - 1] = temporary
          setOrderedCollectionsResources(newList)
          setSelectedIndex(selectedIndex - 1)
        }
        break
      }
      case 'ArrowDown': {
        event.preventDefault()
        if (selectedIndex < orderedCollectionsResources.length - 1) {
          const newList = [...orderedCollectionsResources]
          const temporary = newList[selectedIndex]
          newList[selectedIndex] = newList[selectedIndex + 1]
          newList[selectedIndex + 1] = temporary
          setOrderedCollectionsResources(newList)
          setSelectedIndex(selectedIndex + 1)
        }
        break
      }
      case 'Escape': {
        event.preventDefault()
        setSelectedIndex(null)
        break
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        setSelectedIndex(null)
        await sendCommand()
        break
      }
      default: {
        break
      }
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="fr-mt-md-6w fr-mt-3w"
      role="list"
      aria-label="Liste des collections"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <Reorder.Group
        values={resources}
        className={styles.contentList}
        axis="y"
        onReorder={onReorder}
        ref={dragBoundaryRef}
      >
        <AnimatePresence initial={false}>
          {orderedCollectionsResources.map((resource, index) => (
            <DraggableResourceCollectionOrderRow
              key={resource.id}
              count={orderedCollectionsResources.length}
              resource={resource}
              index={index}
              dragConstraints={dragBoundaryRef}
              isSelected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              sendCommand={sendCommand}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

CollectionResourcesListEdition.displayName = 'CollectionResourcesListEdition'

export default withTrpc(CollectionResourcesListEdition)
