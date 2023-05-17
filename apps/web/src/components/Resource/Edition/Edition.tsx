'use client'

import React, { useState } from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import AddContent from '@app/web/components/Resource/Edition/AddContent'
import ContentEdition from '@app/web/components/Resource/Edition/ContentEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'
import { trpc } from '@app/web/trpc'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import BaseEdition from './BaseEdition'
import EditableImage from './EditableImage'
import styles from './Edition.module.css'
import EditionActionBar from './EditionActionBar'
import TitleEdition from './TitleEdition'

const hasChanged = (
  resource: Resource,
  updatedResource: ResourceProjectionWithContext,
) =>
  Object.keys(resourceEditionValues).some(
    (key) =>
      resource[key as keyof Resource] !==
      updatedResource[key as keyof ResourceProjectionWithContext],
  )

const publishedState = (canPublished: boolean, resource: Resource) => {
  if (canPublished) {
    return ResourcePublishedState.DRAFT
  }

  return resource.isPublic
    ? ResourcePublishedState.PUBLIC
    : ResourcePublishedState.PRIVATE
}

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

  // Published ressource, not being edited, can be several versions behind
  const [publishedResource] = useState<Resource>(resource)

  // Mutation used to send commands to change the draft resource (and publish)
  const mutate = trpc.resource.mutate.useMutation()

  const sendCommand = async (command: ResourceMutationCommand) => {
    const result = await mutate.mutateAsync(command)
    setUpdatedDraftResource(result.resource)
  }

  // Current edition state displayed in the action bar
  const editionState: ResourceEditionState =
    editing === null
      ? mutate.isLoading
        ? ResourceEditionState.SAVING
        : ResourceEditionState.SAVED
      : ResourceEditionState.EDITING

  // Publish command is only available if publishedResource is older than updatedDraftResource
  const canPublish =
    editionState === ResourceEditionState.SAVED &&
    hasChanged(publishedResource, updatedDraftResource)

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onPublish = () => {
    // TODO sendCommand(PublishCommand) etc...
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
        publishedState={publishedState(canPublish, resource)}
        editionState={
          editionState === ResourceEditionState.SAVED && !canPublish
            ? null
            : editionState
        }
        actionDisabled={!canPublish}
        actionLabel="Publier la ressource"
        action={onPublish}
      />
    </>
  )
}

export default withTrpc(Edition)
