'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, Reorder } from 'framer-motion'
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

  const onReorder = (items: CollectionResourceListItem[]) =>
    setOrderedCollectionsResources(items)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (selectedIndex === null) return

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault()
        if (selectedIndex > 0) {
          const newList = [...resources]
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
        if (selectedIndex < resources.length - 1) {
          const newList = [...resources]
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
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}

export default CollectionResourcesListEdition
