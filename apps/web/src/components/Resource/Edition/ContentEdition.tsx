import React, { Dispatch, SetStateAction } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import ContentView from '@app/web/components/Resource/Contents/ContentView'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import { ContentProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
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
  sendCommand: (command: ResourceMutationCommand) => Promise<void>
  content: ContentProjection
}) => {
  const editionMode = editing === content.id

  if (!editionMode) {
    return (
      <>
        <ContentView content={content} />
        <div className={styles.contentHoverableAction}>
          <Button
            iconId={'ri-draggable' as never}
            title="Drag"
            priority="tertiary no outline"
            className={styles.dragButton}
          />
          <Button
            priority="tertiary no outline"
            iconId="fr-icon-edit-line"
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
