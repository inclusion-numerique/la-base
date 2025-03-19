'use client'

import { Reorder, useDragControls } from 'framer-motion'
import Button from '@codegouvfr/react-dsfr/Button'
import { PointerEventHandler, RefObject, useRef } from 'react'
import classNames from 'classnames'
import { useDraggable } from '@app/ui/hooks/useDraggable'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import CollectionResourceOrderRow from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrderRow'
import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'

const DraggableCollectionResourceOrderRow = ({
  resource,
  collectionId,
  count,
  dragConstraints,
  index,
  isSelected,
  onSelect,
}: {
  resource: ResourceListItem
  collectionId: string
  count: number
  dragConstraints: RefObject<HTMLElement>
  index: number
  isSelected: boolean
  onSelect: () => void
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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const { target } = onDragEnd(dragButtonRef, event)

    if (!(target instanceof HTMLButtonElement) || !target.dataset.index) {
      // Only here for type safety
      // It should never happen as the drag button is our only source of event
      // eslint-disable-next-line no-useless-return
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
        isSelected && styles.selected,
      )}
      dragControls={controls}
      dragConstraints={dragConstraints}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      {...ReorderItemCommonProps}
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
          onPointerDown: handleDragButtonPointerDown,
          onKeyDown: (event) => handleKeyDown(event, onSelect),
          'aria-selected': isSelected,
          'aria-keyshortcuts': draggableAriaKeyshortcuts,
          'aria-label': isSelected
            ? 'Ressource sélectionnée pour réorganisation'
            : 'Sélectionner pour réorganiser',
        }}
      />
      <CollectionResourceOrderRow
        resource={resource}
        collectionId={collectionId}
      />
    </Reorder.Item>
  )
}

export default DraggableCollectionResourceOrderRow
