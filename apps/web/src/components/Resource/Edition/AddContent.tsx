import ResourceContentForm from '@app/web/components/Resource/Contents/ResourceContentForm'
import AddContentButton from '@app/web/components/Resource/Edition/AddContentButton'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import type { ContentType } from '@prisma/client'
import React, { type Dispatch, type SetStateAction } from 'react'

const AddContent = React.forwardRef(
  (
    {
      resource,
      editing,
      setEditing,
      sendCommand,
      withBorder = false,
      index,
      as = 'li',
    }: {
      resource: ResourceProjectionWithContext
      editing: string | null
      setEditing: Dispatch<SetStateAction<string | null>>
      sendCommand: SendCommand
      withBorder?: boolean
      index: number
      as?: 'li' | 'div'
    },
    contentFormButtonRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const onAdd = (contentType: ContentType) => {
      setEditing(`add-${contentType}-${index}`)
    }

    const onDelete = () => {
      setEditing(null)
    }

    const isAddingContentType =
      !!editing && editing.startsWith('add-') && editing.endsWith(`-${index}`)
        ? (editing?.split('-')[1] as ContentType)
        : null

    return isAddingContentType ? (
      <ResourceContentForm
        ref={contentFormButtonRef}
        type={isAddingContentType}
        data-testid="add-content_form"
        mode="add"
        index={index}
        resource={resource}
        setEditing={setEditing}
        sendCommand={sendCommand}
        onDelete={onDelete}
      />
    ) : (
      <AddContentButton
        as={as}
        disabled={!!editing && !isAddingContentType}
        onAdd={onAdd}
        editing={!!editing}
        withBorder={withBorder}
      />
    )
  },
)

AddContent.displayName = 'AddContent'

export default AddContent
