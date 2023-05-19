import React, { Dispatch, SetStateAction, useState } from 'react'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import AddContentButton from '@app/web/components/Resource/Edition/AddContentButton'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { ContentType } from '@prisma/client'

const AddContent = ({
  resource,
  editing,
  setEditing,
  sendCommand,
}: {
  resource: ResourceProjectionWithContext
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: (command: ResourceMutationCommand) => Promise<void>
}) => {
  const [adding, setAdding] = useState<ContentType | null>(null)

  const onAdd = (contentType: ContentType) => {
    setEditing('add')
    setAdding(contentType)
  }

  const onSendCommand = async (command: ResourceMutationCommand) => {
    await sendCommand(command)
    setAdding(null)
  }

  return adding ? (
    <ContentForm
      type={adding}
      mode="add"
      resource={resource}
      setEditing={setEditing}
      sendCommand={onSendCommand}
    />
  ) : (
    <AddContentButton disabled={!!editing && editing !== 'add'} onAdd={onAdd} />
  )
}

export default AddContent
