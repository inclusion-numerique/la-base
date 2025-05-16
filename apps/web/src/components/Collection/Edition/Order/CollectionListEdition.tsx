'use client'

import { useDraggable } from '@app/ui/hooks/useDraggable'
import { createToast } from '@app/ui/toast/createToast'
import styles from '@app/web/components/Collection/Edition/Order/CollectionOrder.module.css'
import DraggableCollectionOrderRow from '@app/web/components/Collection/Edition/Order/DraggableCollectionOrderRow'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import { trpc } from '@app/web/trpc'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useRef, useState } from 'react'

const CollectionListEdition = ({
  collections,
}: {
  collections: CollectionListItem[]
}) => {
  const router = useRouter()
  const updateOrdersMutation = trpc.collection.updateOrders.useMutation()
  const [orderedCollections, setOrderedCollections] = useState(collections)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dragBoundaryRef = useRef<HTMLElement>(null)
  const { moveUp, moveDown, handleKeyDown } = useDraggable()

  const onReorder = (items: CollectionListItem[]) =>
    setOrderedCollections(items)

  useOnDiff(collections, setOrderedCollections)

  const sendCommand = async (updatedCollections: CollectionListItem[]) => {
    try {
      await updateOrdersMutation.mutateAsync({
        collections: updatedCollections.map((collection, index) => ({
          id: collection.id,
          order: index,
        })),
      })
      createToast({
        priority: 'success',
        message: 'Collections réorganisées avec succès',
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

  const moveCollection = async (fromIndex: number, toIndex: number) => {
    const newCollections = [...collections]
    const [movedItem] = newCollections.splice(fromIndex, 1)
    newCollections.splice(toIndex, 0, movedItem)

    setOrderedCollections(newCollections)
    await sendCommand(newCollections)
  }

  const onKeyDown = async (event: React.KeyboardEvent) => {
    const { length } = collections
    await handleKeyDown(event, length, moveCollection)
  }

  return (
    <div
      className="fr-mt-md-6w fr-mt-3w"
      role="list"
      aria-label="Liste des collections"
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <Reorder.Group
        values={collections}
        className={styles.contentList}
        axis="y"
        onReorder={onReorder}
        ref={dragBoundaryRef}
      >
        <AnimatePresence initial={false}>
          {orderedCollections.map((collection, index) => (
            <DraggableCollectionOrderRow
              key={collection.id}
              count={orderedCollections.length}
              collection={collection}
              index={index}
              dragConstraints={dragBoundaryRef}
              isSelected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              sendCommand={() => sendCommand(orderedCollections)}
              moveUp={() => moveUp(index, moveCollection)}
              moveDown={() =>
                moveDown(index, collections.length, moveCollection)
              }
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

CollectionListEdition.displayName = 'CollectionListEdition'

export default withTrpc(CollectionListEdition)
