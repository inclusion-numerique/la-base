'use client'

import { useDraggable } from '@app/ui/hooks/useDraggable'
import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'
import CollectionResourceOrderRow from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrderRow'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { Reorder, useDragControls } from 'framer-motion'
import { type PointerEventHandler, type RefObject, useRef } from 'react'

const DraggableCollectionResourceOrderRow = ({
  resource,
  count,
  dragConstraints,
  index,
  isSelected,
  onSelect,
  moveUp,
  moveDown,
  onDelete,
}: {
  resource: ResourceListItem
  count: number
  dragConstraints: RefObject<HTMLElement | null>
  index: number
  isSelected: boolean
  onSelect: () => void
  moveUp: () => Promise<void>
  moveDown: () => Promise<void>
  onDelete: () => void
}) => {
  const dragButtonRef = useRef<HTMLButtonElement>(null)
  const controls = useDragControls()

  const {
    onDragButtonPointerDown,
    onDragStart,
    onDragEnd,
    handleDragKeyDown,
    ReorderItemCommonProps,
    'aria-keyshortcuts': draggableAriaKeyshortcuts,
  } = useDraggable()

  const handleDragButtonPointerDown: PointerEventHandler = (event) =>
    onDragButtonPointerDown(controls, event)

  const handleDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) =>
    onDragStart(dragButtonRef, _event)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const { target } = onDragEnd(dragButtonRef, event)

    if (!(target instanceof HTMLButtonElement) || !target.dataset.index) {
      // Only here for type safety
      // It should never happen as the drag button is our only source of event
      return
    }
  }

  return (
    <Reorder.Item
      value={resource}
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
        title="Remonter la ressource"
        size="small"
        id={`arrow-up-button-${index}`}
        priority="tertiary no outline"
        className={styles.arrowUpButton}
        type="button"
        nativeButtonProps={{
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
          onKeyDown: (event) => handleDragKeyDown(event, onSelect),
          'aria-selected': isSelected,
          'aria-keyshortcuts': draggableAriaKeyshortcuts,
          'aria-label': isSelected
            ? 'Ressource sélectionnée pour réorganisation'
            : 'Sélectionner pour réorganiser',
        }}
      />
      <Button
        iconId="ri-arrow-down-line"
        title="Descendre la ressource"
        size="small"
        id={`arrow-down-button-${index}`}
        priority="tertiary no outline"
        className={styles.arrowDownButton}
        type="button"
        nativeButtonProps={{
          onClick: moveDown,
        }}
      />
      <CollectionResourceOrderRow resource={resource} onDelete={onDelete} />
    </Reorder.Item>
  )
}

export default DraggableCollectionResourceOrderRow
