'use client'

import { useDraggable } from '@app/ui/hooks/useDraggable'
import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'
import DraggableResourceCollectionOrderRow from '@app/web/components/Collection/Edition/Resources/Order/DraggableCollectionResourceOrderRow'
import type { CollectionResourceListItem } from '@app/web/server/collections/getCollection'
import { AnimatePresence, Reorder } from 'framer-motion'
import type React from 'react'
import { type Dispatch, type SetStateAction, useRef, useState } from 'react'

const CollectionResourcesListEdition = ({
  resources,
  setCollectionsResources,
}: {
  resources: CollectionResourceListItem[]
  setCollectionsResources: Dispatch<
    SetStateAction<{
      orderedCollectionsResources: CollectionResourceListItem[]
      deletedResources: string[]
    }>
  >
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dragBoundaryRef = useRef<HTMLElement>(null)
  const { moveUp, moveDown, handleKeyDown } = useDraggable()

  const onReorder = (items: CollectionResourceListItem[]) =>
    setCollectionsResources((previous) => ({
      ...previous,
      orderedCollectionsResources: items,
    }))

  const moveResource = (fromIndex: number, toIndex: number) => {
    const newResources = [...resources]
    const [movedItem] = newResources.splice(fromIndex, 1)
    newResources.splice(toIndex, 0, movedItem)

    onReorder(newResources)
  }

  const onKeyDown = async (event: React.KeyboardEvent) => {
    const { length } = resources
    await handleKeyDown(event, length, moveResource)
  }
  const onDelete = (resourceId: string) => {
    setCollectionsResources((previous) => ({
      orderedCollectionsResources: previous.orderedCollectionsResources.filter(
        (resource) => resource.id !== resourceId,
      ),
      deletedResources: [...previous.deletedResources, resourceId],
    }))
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
        values={resources}
        className={styles.contentList}
        axis="y"
        onReorder={onReorder}
        ref={dragBoundaryRef}
      >
        <AnimatePresence initial={false}>
          {resources.map((resource, index) => (
            <DraggableResourceCollectionOrderRow
              key={resource.id}
              count={resources.length}
              resource={resource}
              index={index}
              dragConstraints={dragBoundaryRef}
              isSelected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              moveUp={() => moveUp(index, moveResource)}
              moveDown={() => moveDown(index, resources.length, moveResource)}
              onDelete={() => onDelete(resource.id)}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

export default CollectionResourcesListEdition
