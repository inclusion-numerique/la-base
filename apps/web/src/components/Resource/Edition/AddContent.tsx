import React, { Dispatch, SetStateAction, useState } from 'react'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import AddContentButton from '@app/web/components/Resource/Edition/AddContentButton'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
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
  sendCommand: SendCommand
}) => {
  const [adding, setAdding] = useState<ContentType | null>(null)

  const onAdd = (contentType: ContentType) => {
    setEditing('add')
    setAdding(contentType)
  }

  return adding ? (
    <ContentForm
      type={adding}
      mode="add"
      resource={resource}
      setEditing={setEditing}
      sendCommand={sendCommand}
    />
  ) : (
    <AddContentButton disabled={!!editing && editing !== 'add'} onAdd={onAdd} />
  )
}

export default AddContent
