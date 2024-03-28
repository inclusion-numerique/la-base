import React, { Dispatch, SetStateAction } from 'react'
import { ContentType } from '@prisma/client'
import ResourceContentForm from '@app/web/components/Resource/Contents/ResourceContentForm'
import AddContentButton from '@app/web/components/Resource/Edition/AddContentButton'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'

const AddContent = React.forwardRef(
  (
    {
      resource,
      editing,
      setEditing,
      sendCommand,
    }: {
      resource: ResourceProjectionWithContext
      editing: string | null
      setEditing: Dispatch<SetStateAction<string | null>>
      sendCommand: SendCommand
    },
    contentFormButtonRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const onAdd = (contentType: ContentType) => {
      setEditing(`add-${contentType}`)
    }

    const onDelete = () => {
      setEditing(null)
    }

    const isAddingContentType =
      !!editing && editing.startsWith('add-')
        ? (editing?.split('-')[1] as ContentType)
        : null

    return isAddingContentType ? (
      <ResourceContentForm
        ref={contentFormButtonRef}
        type={isAddingContentType}
        data-testid="add-content_form"
        mode="add"
        resource={resource}
        setEditing={setEditing}
        sendCommand={sendCommand}
        onDelete={onDelete}
      />
    ) : (
      <AddContentButton
        disabled={!!editing && !isAddingContentType}
        onAdd={onAdd}
      />
    )
  },
)

AddContent.displayName = 'AddContent'

export default AddContent
