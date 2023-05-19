'use client'

import React, { useState } from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import AddContent from '@app/web/components/Resource/Edition/AddContent'
import ContentEdition from '@app/web/components/Resource/Edition/ContentEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import BaseEdition from './BaseEdition'
import EditableImage from './EditableImage'
import styles from './Edition.module.css'
import EditionActionBar from './EditionActionBar'
import TitleEdition from './TitleEdition'

export type SendCommandResult = Awaited<
  ReturnType<ReturnType<typeof trpc.resource.mutate.useMutation>['mutateAsync']>
>
export type SendCommand = (
  command: ResourceMutationCommand,
) => Promise<SendCommandResult>

const Edition = ({
  resource,
  draftResource,
  user,
}: {
  resource: Resource
  draftResource: ResourceProjectionWithContext
  user: SessionUser
}) => {
  // Content or resource data currently being edited
  // Determines which component is in edition mode, and other component cannot switch to edit mode
  const [editing, setEditing] = useState<string | null>(null)

  // Resource data currently being edited, will update after each edition save
  const [updatedDraftResource, setUpdatedDraftResource] =
    useState<ResourceProjectionWithContext>(draftResource)

  // Mutation used to send commands to change the draft resource (and publish)
  const mutate = trpc.resource.mutate.useMutation()

  const isPublished = !!updatedDraftResource.published

  const hasUnpublishedChanges =
    updatedDraftResource.published?.getTime() !==
    updatedDraftResource.updated.getTime()

  const publishedState: ResourcePublishedState = isPublished
    ? updatedDraftResource.isPublic
      ? ResourcePublishedState.PUBLIC
      : ResourcePublishedState.PRIVATE
    : ResourcePublishedState.DRAFT

  // Current edition state displayed in the action bar
  const editionState: ResourceEditionState =
    editing === null
      ? mutate.isLoading
        ? ResourceEditionState.SAVING
        : ResourceEditionState.SAVED
      : ResourceEditionState.EDITING

  // Do not display state in action bar if no changes have been made
  const actionBarEditionState =
    editionState === ResourceEditionState.SAVED && !hasUnpublishedChanges
      ? null
      : editionState

  // Publish command is only available if publishedResource is older than updatedDraftResource
  const canPublish =
    editionState === ResourceEditionState.SAVED && hasUnpublishedChanges

  const publishButtonLabel = isPublished
    ? 'Publier les modifications'
    : 'Publier la ressource'

  const sendCommand: SendCommand = async (command: ResourceMutationCommand) => {
    const result = await mutate.mutateAsync(command)
    setUpdatedDraftResource(result.resource)

    return result
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onPublish = async () => {
    try {
      // TODO this will first navigate to a "Publication" page for additional input
      await sendCommand({
        name: 'Publish',
        payload: {
          resourceId: resource.id,
          isPublic: true,
        },
      })
    } catch (error) {
      console.error('Could not publish resource', error)
      // TODO Have a nice error and handle edge cases server side
      // TODO for example a linked base or file or resource has been deleted since last publication
      throw error
    }
  }

  return (
    <>
      <div className="fr-container fr-pb-30v">
        <BaseEdition
          resource={updatedDraftResource}
          user={user}
          sendCommand={sendCommand}
        />
        <hr className="fr-my-4w" />
        <div className="fr-mb-5w">
          <EditableImage />
        </div>
        <TitleEdition
          resource={updatedDraftResource}
          sendCommand={sendCommand}
          editing={editing}
          setEditing={setEditing}
        />
        <hr className="fr-mt-4w" />
        <div className={styles.title}>Contenu de la ressource</div>
        <hr className="fr-mt-4w fr-mb-2w" />
        {updatedDraftResource.contents.map((content, index) => (
          <div
            key={content.id}
            id={`content-${index + 1}`}
            className={styles.content}
          >
            <ContentEdition
              content={content}
              resource={draftResource}
              sendCommand={sendCommand}
              editing={editing}
              setEditing={setEditing}
            />
            <hr className="fr-mt-5w fr-mb-2w" />
          </div>
        ))}
        <AddContent
          resource={draftResource}
          sendCommand={sendCommand}
          editing={editing}
          setEditing={setEditing}
        />
      </div>
      <EditionActionBar
        publishedState={publishedState}
        editionState={actionBarEditionState}
        actionDisabled={!canPublish}
        actionLabel={publishButtonLabel}
        unPublishedEdits={isPublished && hasUnpublishedChanges}
        action={onPublish}
      />
    </>
  )
}

export default withTrpc(Edition)
