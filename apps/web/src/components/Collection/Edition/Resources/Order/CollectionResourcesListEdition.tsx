'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useDraggable } from '@app/ui/hooks/useDraggable'
import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'
import DraggableResourceCollectionOrderRow from '@app/web/components/Collection/Edition/Resources/Order/DraggableCollectionResourceOrderRow'
import { CollectionResourceListItem } from '@app/web/server/collections/getCollection'

const CollectionResourcesListEdition = ({
  resources,
  collectionId,
  setOrderedCollectionsResources,
}: {
  resources: CollectionResourceListItem[]
  collectionId: string
  setOrderedCollectionsResources: (
    resources: CollectionResourceListItem[],
  ) => void
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dragBoundaryRef = useRef<HTMLElement>(null)
  const { moveUp, moveDown } = useDraggable()

  const onReorder = (items: CollectionResourceListItem[]) =>
    setOrderedCollectionsResources(items)

  const moveResource = (fromIndex: number, toIndex: number) => {
    const newResources = [...resources]
    const [movedItem] = newResources.splice(fromIndex, 1)
    newResources.splice(toIndex, 0, movedItem)

    setOrderedCollectionsResources(newResources)
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
            await moveUp(buttonIndex, moveResource)
          }
          if (matchDownButton && buttonIndex < resources.length - 1) {
            await moveDown(buttonIndex, resources.length, moveResource)
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
              collectionId={collectionId}
              count={resources.length}
              resource={resource}
              index={index}
              dragConstraints={dragBoundaryRef}
              isSelected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              moveUp={() => moveUp(index, moveResource)}
              moveDown={() => moveDown(index, resources.length, moveResource)}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

export default CollectionResourcesListEdition
