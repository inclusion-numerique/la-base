'use client'

import { Reorder, useDragControls } from 'framer-motion'
import Button from '@codegouvfr/react-dsfr/Button'
import { PointerEventHandler, RefObject, useRef } from 'react'
import classNames from 'classnames'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import CollectionOrderRow from '@app/web/components/Collection/Edition/Order/CollectionOrderRow'
import styles from '@app/web/components/Collection/Edition/Order/CollectionOrder.module.css'

const DraggableCollectionOrderRow = ({
  collection,
  count,
  dragConstraints,
  index,
  isSelected,
  onSelect,
  sendCommand,
}: {
  collection: CollectionListItem
  count: number
  dragConstraints: RefObject<HTMLElement>
  index: number
  isSelected: boolean
  onSelect: () => void
  sendCommand: () => Promise<void>
}) => {
  const dragButtonRef = useRef<HTMLButtonElement>(null)
  const controls = useDragControls()

  const onDragButtonPointerDown: PointerEventHandler = (event) => {
    controls.start(event)
  }

  // Changing cursor on button when dragging as css selector causes flickering
  const onDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) => {
    const button = dragButtonRef.current
    if (button) {
      button.style.cursor = 'grabbing'
    }
  }

  const onDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent) => {
    const button = dragButtonRef.current
    if (button) {
      button.style.cursor = ''
    }

    const { target } = event
    if (!(target instanceof HTMLButtonElement) || !target.dataset.index) {
      // Only here for type safety
      // It should never happen as the drag button is our only source of event
      // eslint-disable-next-line no-useless-return
      return
    }

    await sendCommand()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      onSelect()
    }
  }

  return (
    <Reorder.Item
      value={collection}
      className={classNames(
        styles.content,
        'fr-pl-md-6w fr-pb-0 fr-border-top',
        count === index + 1 && 'fr-border-bottom',
        isSelected && styles.selected,
      )}
      drag
      dragListener={false}
      dragControls={controls}
      dragSnapToOrigin
      dragConstraints={dragConstraints}
      dragTransition={{
        // Applied when releasing drag
        bounceStiffness: 450,
        bounceDamping: 30,
      }}
      onDragStart={onDragStart}
      whileDrag={{
        // Apply cursor style to whole element to avoid cursor flickering on imprecise drag
        cursor: 'grabbing',
      }}
      onDragEnd={onDragEnd}
      layout="position"
      animate={{ opacity: 1, height: 'auto' }}
      initial={false}
      exit={{
        // Applied when exit (deletion of content)
        opacity: 0,
        height: 0,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Button
        ref={dragButtonRef}
        data-index={index}
        iconId="ri-draggable"
        title="Réordonner"
        size="small"
        priority="tertiary no outline"
        className={styles.dragButton}
        type="button"
        nativeButtonProps={{
          onPointerDown: onDragButtonPointerDown,
          onKeyDown: handleKeyDown,
          'aria-selected': isSelected,
          'aria-keyshortcuts': 'Space|Enter + ArrowUp|ArrowDown, Escape',
          'aria-label': isSelected
            ? 'Collection sélectionnée pour réorganisation'
            : 'Sélectionner pour réorganiser',
        }}
      />
      <CollectionOrderRow collection={collection} />
    </Reorder.Item>
  )
}

export default DraggableCollectionOrderRow
