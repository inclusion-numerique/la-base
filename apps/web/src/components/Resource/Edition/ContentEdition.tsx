import React, { Dispatch, SetStateAction } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import ContentView from '@app/web/components/Resource/Contents/ContentView'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import { ResourceEditionState } from '@app/web/components/Resource/enums/ResourceEditionState'
import {
  ContentProjectionWithContext,
  ResourceProjectionWithContext,
} from '@app/web/server/resources/getResourceFromEvents'

const ContentEdition = ({
  editing,
  setEditing,
  sendCommand,
  resource,
  content,
  'data-testid': dataTestId,
  editionState,
  onDelete,
}: {
  resource: ResourceProjectionWithContext
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: SendCommand
  content: ContentProjectionWithContext
  'data-testid'?: string
  editionState: ResourceEditionState
  onDelete: () => void | Promise<void>
}) => {
  const editionMode = editing === content.id

  if (!editionMode) {
    return (
      <div className={styles.contentEdition}>
        <ContentView content={content} />
        <div className={styles.contentHoverableAction}>
          <Button
            data-testid={dataTestId ? `${dataTestId}_edit-button` : undefined}
            priority="tertiary no outline"
            iconId="fr-icon-edit-line"
            type="button"
            size="small"
            disabled={editionState !== ResourceEditionState.SAVED}
            onClick={() => {
              setEditing(content.id)
            }}
          >
            Modifier
          </Button>
          <Button
            data-testid={dataTestId ? `${dataTestId}_delete-button` : undefined}
            title="Supprimer le contenu"
            priority="tertiary no outline"
            iconId="fr-icon-delete-line"
            size="small"
            disabled={editionState !== ResourceEditionState.SAVED}
            type="button"
            onClick={onDelete}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.contentEdition}>
      <ContentForm
        type={content.type}
        mode="edit"
        data-testid={dataTestId ? `${dataTestId}_form` : undefined}
        resource={resource}
        content={content}
        setEditing={setEditing}
        sendCommand={sendCommand}
        onDelete={onDelete}
      />
    </div>
  )
}

export default ContentEdition
