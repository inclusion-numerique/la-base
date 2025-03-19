'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, Reorder } from 'framer-motion'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { useDraggable } from '@app/ui/hooks/useDraggable'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import DraggableCollectionOrderRow from '@app/web/components/Collection/Edition/Order/DraggableCollectionOrderRow'
import styles from '@app/web/components/Collection/Edition/Order/CollectionOrder.module.css'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useOnDiff } from '@app/web/hooks/useOnDiff'

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
  const { moveUp, moveDown } = useDraggable()

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

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    const targetId = (event.target as HTMLButtonElement).id
    const matchUpButton = targetId.match(/arrow-up-button-(\d+)/)
    const matchDownButton = targetId.match(/arrow-down-button-(\d+)/)
    const buttonIndex = matchUpButton
      ? Number.parseInt(matchUpButton[1], 10)
      : matchDownButton
        ? Number.parseInt(matchDownButton[1], 10)
        : null

    switch (event.key) {
      case ' ': {
        event.preventDefault()
        if (buttonIndex !== null) {
          if (matchUpButton && buttonIndex > 0) {
            await moveUp(buttonIndex, moveCollection)
          }
          if (matchDownButton && buttonIndex < orderedCollections.length - 1) {
            await moveDown(buttonIndex, collections.length, moveCollection)
          }
        }
        await Promise.resolve()
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
