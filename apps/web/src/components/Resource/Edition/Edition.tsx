'use client'

import React, { useState } from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  EditResourceBase,
  EditResourceTitle,
} from '@app/web/server/rpc/resource/editResource'
import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'
import EditionActionBar from './EditionActionBar'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import Separator from '../../Separator/Separator'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import EditableImage from './EditableImage'
import AddContentButton from './AddContentButton'
import TitleEdition from './TitleEdition'
import styles from './Edition.module.css'
import BaseEdition from './BaseEdition'

const hasChanged = (resource: Resource, updatedResource: Resource) =>
  Object.keys(resourceEditionValues).some(
    (key) =>
      resource[key as keyof Resource] !==
      updatedResource[key as keyof Resource],
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
  user,
}: {
  resource: Resource
  user: SessionUser
}) => {
  const [modificationState, setModificationState] =
    useState<ResourceModificationState | null>(null)

  const [updatedResource, setUpdatedResource] = useState<Resource>(resource)
  const [publishedResource, setPublishedResource] = useState<Resource>(resource)

  const canPublished = hasChanged(publishedResource, updatedResource)

  const updateTitleMutation = trpc.resource.editTitle.useMutation()
  const updateBaseMutation = trpc.resource.editBase.useMutation()

  const updateTitleResource = async (data: EditResourceTitle) => {
    setModificationState(ResourceModificationState.SAVING)
    const result = await updateTitleMutation.mutateAsync(data)
    setUpdatedResource(result)
    setModificationState(ResourceModificationState.SAVED)
  }

  const updateBaseResource = async (data: EditResourceBase) => {
    setModificationState(ResourceModificationState.SAVING)
    const result = await updateBaseMutation.mutateAsync(data)
    setUpdatedResource(result)
    setModificationState(ResourceModificationState.SAVED)
  }

  return (
    <>
      <div className="fr-container fr-pb-30v">
        <BaseEdition
          resource={updatedResource}
          user={user}
          updateResource={updateBaseResource}
        />
        <Separator className="fr-my-4w" />
        <div className="fr-mb-5w">
          <EditableImage />
        </div>
        <TitleEdition
          resource={updatedResource}
          updateResource={updateTitleResource}
          setModificationState={setModificationState}
        />
        <Separator className="fr-my-4w" />
        <div className={styles.title}>Contenu de la ressource</div>
        <AddContentButton />
      </div>
      <EditionActionBar
        publishedState={publishedState(canPublished, resource)}
        modificationState={
          modificationState === ResourceModificationState.SAVED && !canPublished
            ? null
            : modificationState
        }
        actionDisabled={!canPublished}
        actionLabel="Publier la ressource"
        action={() => {
          setModificationState(null)
          setPublishedResource(updatedResource)
        }}
      />
    </>
  )
}

export default withTrpc(Edition)