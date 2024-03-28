import { AnimatePresence, Reorder } from 'framer-motion'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import styles from '@app/web/components/Resource/Edition/ResourceEdition.module.css'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import type { ResourceEditionState } from '@app/web/components/Resource/enums/ResourceEditionState'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import type {
  ContentProjectionWithContext,
  ResourceProjectionWithContext,
} from '@app/web/server/resources/getResourceFromEvents'
import DraggableContentEdition from '@app/web/components/Resource/Edition/DraggableContentEdition'

/**
 * We use Framer Motion to handle animations :
 *  - An item goes back to its target position on release
 *  - The items are reordered while dragging
 *  - One item is animating when deleted
 *  - The list is animating when an item changes size
 *  --- This is not perfect but non configurable as the layout animations use for dragging are not easily cancellable
 *      when we want to just switch item internal state (view / edition)
 */
const ContentListEdition = React.forwardRef(
  (
    {
      contents,
      editing,
      setEditing,
      sendCommand,
      editionState,
      resource,
    }: {
      resource: ResourceProjectionWithContext
      editing: string | null
      setEditing: Dispatch<SetStateAction<string | null>>
      sendCommand: SendCommand
      editionState: ResourceEditionState
      contents: ContentProjectionWithContext[]
    },
    contentFormButtonRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    // The state is used to reorder the items while dragging, it is derived from the props
    const [orderedContents, setOrderedContents] = useState(contents)

    // Reset the ordered contents when the props change
    useOnDiff(contents, setOrderedContents)

    // The onReorder is called when the user is dragging an item over other items
    const onReorder = (items: ContentProjectionWithContext[]) => {
      setOrderedContents(items)
    }

    // Used to constrain the drag to the list
    const dragBoundaryRef = useRef<HTMLElement>(null)

    return (
      <Reorder.Group
        className={styles.contentList}
        values={orderedContents}
        onReorder={onReorder}
        axis="y"
        ref={dragBoundaryRef}
      >
        <AnimatePresence initial={false}>
          {orderedContents.map((content, index) => (
            <DraggableContentEdition
              ref={contentFormButtonRef}
              key={content.id}
              content={content}
              index={index}
              editing={editing}
              setEditing={setEditing}
              sendCommand={sendCommand}
              resource={resource}
              editionState={editionState}
              dragConstraints={dragBoundaryRef}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    )
  },
)

ContentListEdition.displayName = 'ContentListEdition'

export default ContentListEdition
