import React, { Dispatch, SetStateAction } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from '@app/web/components/Resource/Edition/ResourceEdition.module.css'
import ResourceContentForm from '@app/web/components/Resource/Contents/ResourceContentForm'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import { ResourceEditionState } from '@app/web/components/Resource/enums/ResourceEditionState'
import {
  ContentProjectionWithContext,
  ResourceProjectionWithContext,
} from '@app/web/server/resources/getResourceFromEvents'

const ContentEdition = React.forwardRef(
  (
    {
      editing,
      setEditing,
      sendCommand,
      resource,
      content,
      index,
      'data-testid': dataTestId,
      editionState,
      onDelete,
    }: {
      resource: ResourceProjectionWithContext
      editing: string | null
      setEditing: Dispatch<SetStateAction<string | null>>
      sendCommand: SendCommand
      content: ContentProjectionWithContext
      index: number
      'data-testid'?: string
      editionState: ResourceEditionState
      onDelete: () => void | Promise<void>
    },
    contentFormButtonRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const editionMode = editing === content.id

    if (!editionMode) {
      return (
        <div className="fr-ml-2w">
          <ResourceContentView content={content} />
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
              data-testid={
                dataTestId ? `${dataTestId}_delete-button` : undefined
              }
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
      <div className="fr-py-2w">
        <ResourceContentForm
          ref={contentFormButtonRef}
          type={content.type}
          index={index}
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
  },
)

ContentEdition.displayName = 'ContentEdition'

export default ContentEdition
