'use client'

import { Reorder, useDragControls } from 'framer-motion'
import Button from '@codegouvfr/react-dsfr/Button'
import { PointerEventHandler, RefObject, useRef } from 'react'
import classNames from 'classnames'
import { useDraggable } from '@app/ui/hooks/useDraggable'
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
  moveUp,
  moveDown,
  sendCommand,
}: {
  collection: CollectionListItem
  count: number
  dragConstraints: RefObject<HTMLElement>
  index: number
  isSelected: boolean
  onSelect: () => void
  moveUp: () => Promise<void>
  moveDown: () => Promise<void>
  sendCommand: () => Promise<void>
}) => {
  const dragButtonRef = useRef<HTMLButtonElement>(null)
  const controls = useDragControls()

  const {
    onDragButtonPointerDown,
    onDragStart,
    onDragEnd,
    handleKeyDown,
    ReorderItemCommonProps,
    'aria-keyshortcuts': draggableAriaKeyshortcuts,
  } = useDraggable()

  const handleDragButtonPointerDown: PointerEventHandler = (event) =>
    onDragButtonPointerDown(controls, event)

  const handleDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) =>
    onDragStart(dragButtonRef, _event)

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
  ) => {
    onDragEnd(dragButtonRef, event)

    await sendCommand()
  }

  return (
    <Reorder.Item
      value={collection}
      className={classNames(
        styles.content,
        'fr-pl-md-6w fr-pb-0 fr-border-top',
        count === index + 1 && 'fr-border-bottom',
      )}
      dragControls={controls}
      dragConstraints={dragConstraints}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      {...ReorderItemCommonProps}
    >
      <Button
        iconId="ri-arrow-up-line"
        title="Remonter la collection"
        size="small"
        id={`arrow-up-button-${index}`}
        priority="tertiary no outline"
        className={styles.arrowUpButton}
        type="button"
        nativeButtonProps={{
          onKeyDown: (event) => handleKeyDown(event, onSelect),
          onClick: moveUp,
        }}
      />
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
          onPointerDown: handleDragButtonPointerDown,
          onKeyDown: (event) => handleKeyDown(event, onSelect),
          'aria-selected': isSelected,
          'aria-keyshortcuts': draggableAriaKeyshortcuts,
          'aria-label': isSelected
            ? 'Collection sélectionnée pour réorganisation'
            : 'Sélectionner pour réorganiser',
        }}
      />
      <Button
        iconId="ri-arrow-down-line"
        title="Descendre la collection"
        size="small"
        id={`arrow-down-button-${index}`}
        priority="tertiary no outline"
        className={styles.arrowDownButton}
        type="button"
        nativeButtonProps={{
          onKeyDown: (event) => handleKeyDown(event, onSelect),
          onClick: moveDown,
        }}
      />

      <CollectionOrderRow collection={collection} />
    </Reorder.Item>
  )
}

export default DraggableCollectionOrderRow
