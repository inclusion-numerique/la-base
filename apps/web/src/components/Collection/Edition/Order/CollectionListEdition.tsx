'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
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

  const onReorder = (items: CollectionListItem[]) =>
    setOrderedCollections(items)

  useOnDiff(collections, setOrderedCollections)

  const sendCommand = async () => {
    try {
      await updateOrdersMutation.mutateAsync({
        collections: orderedCollections.map((collection, index) => ({
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

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (selectedIndex === null) return

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault()
        if (selectedIndex > 0) {
          const newCollections = [...orderedCollections]
          const temporary = newCollections[selectedIndex]
          newCollections[selectedIndex] = newCollections[selectedIndex - 1]
          newCollections[selectedIndex - 1] = temporary
          setOrderedCollections(newCollections)
          setSelectedIndex(selectedIndex - 1)
        }
        break
      }
      case 'ArrowDown': {
        event.preventDefault()
        if (selectedIndex < orderedCollections.length - 1) {
          const newCollections = [...orderedCollections]
          const temporary = newCollections[selectedIndex]
          newCollections[selectedIndex] = newCollections[selectedIndex + 1]
          newCollections[selectedIndex + 1] = temporary
          setOrderedCollections(newCollections)
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
              sendCommand={sendCommand}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

CollectionListEdition.displayName = 'CollectionListEdition'

export default withTrpc(CollectionListEdition)
