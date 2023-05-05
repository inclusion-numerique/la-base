'use client'

import React, { useState } from 'react'
import { Resource } from '@app/web/server/resources'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { EditResourceTitle } from '@app/web/server/rpc/resource/editResource'
import PublishedInInformation from '../PublishedInInformation'
import EditionActionBar from './EditionActionBar'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import Separator from '../../Separator/Separator'
import EditableContent from './EditableContent'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import EditableImage from './EditableImage'
import AddContentButton from './AddContentButton'
import TitleEdition from './TitleEdition'
import styles from './Edition.module.css'

const hasChanged = (resource: Resource, updatedResource: Resource) =>
  resource.title !== updatedResource.title ||
  resource.description !== updatedResource.description

const publishedState = (canPublished: boolean, resource: Resource) => {
  if (canPublished) {
    return ResourcePublishedState.DRAFT
  }

  return resource.isPublic
    ? ResourcePublishedState.PUBLIC
    : ResourcePublishedState.PRIVATE
}

const Edition = ({ resource }: { resource: Resource }) => {
  const [modificationState, setModificationState] =
    useState<ResourceModificationState | null>(null)

  const [updatedResource, setUpdatedResource] = useState<Resource>(resource)
  const [publishedResource, setPublishedResource] = useState<Resource>(resource)

  const canPublished = hasChanged(publishedResource, updatedResource)

  const updateTitleMutation = trpc.resource.editTitle.useMutation()

  const updateResource = async (data: EditResourceTitle) => {
    setModificationState(ResourceModificationState.SAVING)
    const result = await updateTitleMutation.mutateAsync(data)
    setUpdatedResource(result)
    setModificationState(ResourceModificationState.SAVED)
  }

  return (
    <>
      <div className="fr-container fr-pb-30v">
        <EditableContent showIcon>
          <PublishedInInformation resource={updatedResource} />
        </EditableContent>
        <Separator className="fr-my-4w" />
        <div className="fr-mb-5w">
          <EditableImage />
        </div>
        <TitleEdition
          resource={updatedResource}
          updateResource={updateResource}
          setModificationState={setModificationState}
        />
        <Separator className="fr-my-4w" />
        <div className={styles.title}>Contenu de la ressource</div>
        <AddContentButton />
      </div>
      <EditionActionBar
        publishedState={
          canPublished
            ? ResourcePublishedState.DRAFT
            : ResourcePublishedState.PUBLIC
        }
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
