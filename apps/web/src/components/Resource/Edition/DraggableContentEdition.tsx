import { useDraggable } from '@app/ui/hooks/useDraggable'
import AddContent from '@app/web/components/Resource/Edition/AddContent'
import ContentEdition from '@app/web/components/Resource/Edition/ContentEdition'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import styles from '@app/web/components/Resource/Edition/ResourceEdition.module.css'
import { ResourceEditionState } from '@app/web/components/Resource/enums/ResourceEditionState'
import type {
  ContentProjectionWithContext,
  ResourceProjectionWithContext,
} from '@app/web/server/resources/getResourceFromEvents'
import Button from '@codegouvfr/react-dsfr/Button'
import { Reorder, useDragControls } from 'framer-motion'
import React, {
  type Dispatch,
  type PointerEventHandler,
  type RefObject,
  type SetStateAction,
  useRef,
} from 'react'

/**
 * This is draggable using Framer Motion
 * Layout animations and exit animations are controlled in ContentListEdition component
 */
const DraggableContentEdition = React.forwardRef(
  (
    {
      content,
      editing,
      setEditing,
      sendCommand,
      resource,
      index,
      dragConstraints,
      editionState,
      isSelected,
      onSelect,
      moveUp,
      moveDown,
      count,
    }: {
      resource: ResourceProjectionWithContext
      editing: string | null
      setEditing: Dispatch<SetStateAction<string | null>>
      sendCommand: SendCommand
      content: ContentProjectionWithContext
      index: number
      dragConstraints: RefObject<HTMLElement>
      editionState: ResourceEditionState
      isSelected: boolean
      onSelect: () => void
      moveUp: () => Promise<void>
      moveDown: () => Promise<void>
      count: number
    },
    contentFormButtonRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const testId = `content-edition_${content.type}-${index}`

    const controls = useDragControls()
    const {
      onDragButtonPointerDown,
      onDragStart,
      onDragEnd,
      handleDragKeyDown,
      ReorderItemCommonProps,
      'aria-keyshortcuts': draggableAriaKeyshortcuts,
    } = useDraggable()

    const dragButtonRef = useRef<HTMLButtonElement>(null)

    // Disable drag when resource is being mutated
    const dragDisabled = editionState !== ResourceEditionState.SAVED

    // Trigger drag on button pointer down, if allowed
    const handleDragButtonPointerDown: PointerEventHandler = (event) => {
      if (dragDisabled) {
        return
      }
      onDragButtonPointerDown(controls, event)
    }

    const handleDragStart = (_event: MouseEvent | TouchEvent | PointerEvent) =>
      onDragStart(dragButtonRef as RefObject<HTMLButtonElement>, _event)

    // Trigger mutation on drag end
    const handleDragEnd = async (
      event: MouseEvent | TouchEvent | PointerEvent,
    ) => {
      onDragEnd(dragButtonRef as RefObject<HTMLButtonElement>, event)
      const button = dragButtonRef.current
      const buttonIndex = button?.dataset.index as string
      if (button) {
        const newOrder = Number.parseInt(buttonIndex, 10) + 1

        if (content.order === newOrder) {
          // No-op if new order is the same
        }

        await sendCommand({
          name: 'ReorderContent',
          payload: {
            resourceId: resource.id,
            id: content.id,
            order: newOrder,
          },
        })
      }
    }

    // Deletion callback passed down to view and form components
    const onDelete = async () => {
      await sendCommand({
        name: 'RemoveContent',
        payload: {
          resourceId: resource.id,
          id: content.id,
        },
      })
      setEditing(null)
    }

    return (
      <>
        <Reorder.Item
          key={content.id}
          value={content}
          data-testid={testId}
          className={styles.content}
          dragControls={controls}
          dragConstraints={dragConstraints}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          {...ReorderItemCommonProps}
        >
          <ContentEdition
            ref={contentFormButtonRef}
            data-testid={testId}
            content={content}
            resource={resource}
            index={index}
            sendCommand={sendCommand}
            editing={editing}
            setEditing={setEditing}
            editionState={editionState}
            onDelete={onDelete}
          />
          {editionState !== ResourceEditionState.EDITING && (
            <>
              <Button
                iconId="ri-arrow-up-line"
                title="Remonter la collection"
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
                iconId="ri-arrow-down-line"
                title="Descendre la collection"
                size="small"
                id={`arrow-down-button-${index}`}
                priority="tertiary no outline"
                className={styles.arrowDownButton}
                type="button"
                nativeButtonProps={{
                  onClick: moveDown,
                }}
              />
              <Button
                ref={dragButtonRef}
                data-testid={`${testId}_drag-button`}
                data-index={index}
                disabled={editionState !== ResourceEditionState.SAVED}
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
                    ? 'Contenu sélectionnée pour réorganisation'
                    : 'Sélectionner le contenu pour le réorganiser',
                }}
              />
            </>
          )}
        </Reorder.Item>
        {index !== count - 1 && (
          <AddContent
            ref={contentFormButtonRef}
            resource={resource}
            sendCommand={sendCommand}
            editing={editing}
            setEditing={setEditing}
            withBorder
            index={index}
          />
        )}
      </>
    )
  },
)

DraggableContentEdition.displayName = 'DraggableContentEdition'

export default DraggableContentEdition
