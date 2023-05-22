import React, { Dispatch, SetStateAction } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import ContentView from '@app/web/components/Resource/Contents/ContentView'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import { ContentProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'

const ContentEdition = ({
  editing,
  setEditing,
  sendCommand,
  resource,
  content,
}: {
  resource: ResourceProjectionWithContext
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: SendCommand
  content: ContentProjection
}) => {
  const editionMode = editing === content.id

  if (!editionMode) {
    const onDelete = async () => {
      // TODO: add confirmation modal
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
        <ContentView content={content} />
        <div className={styles.contentHoverableAction}>
          <Button
            iconId={'ri-draggable' as never}
            title="Drag"
            priority="tertiary no outline"
            className={styles.dragButton}
            type="button"
          />
          <Button
            data-testid="content-edition-button"
            priority="tertiary no outline"
            iconId="fr-icon-edit-line"
            type="button"
            size="small"
            onClick={() => {
              setEditing(content.id)
            }}
          >
            Modifier
          </Button>
          <Button
            title="Supprimer le contenu"
            priority="tertiary no outline"
            iconId="fr-icon-delete-line"
            size="small"
            type="button"
            onClick={onDelete}
          />
        </div>
      </>
    )
  }

  return (
    <ContentForm
      type={content.type}
      mode="edit"
      resource={resource}
      content={content}
      setEditing={setEditing}
      sendCommand={sendCommand}
    />
  )
}

export default ContentEdition
