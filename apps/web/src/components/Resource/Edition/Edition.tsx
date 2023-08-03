'use client'

import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import AddContent from '@app/web/components/Resource/Edition/AddContent'
import ContentListEdition from '@app/web/components/Resource/Edition/ContentListEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import {
  PublishCommand,
  PublishCommandValidation,
} from '@app/web/server/resources/feature/PublishResource'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import BaseEdition from './BaseEdition'
import styles from './Edition.module.css'
import EditionActionBar from './EditionActionBar'
import ResourceImageEdition from './ResourceImageEdition'
import TitleEdition from './TitleEdition'
import Publication from './Publication'

export type SendCommandResult = Awaited<
  ReturnType<ReturnType<typeof trpc.resource.mutate.useMutation>['mutateAsync']>
>
export type SendCommand = (
  command: ResourceMutationCommand,
) => Promise<SendCommandResult>

const isPublishable = (
  publishState: boolean,
  editionState: ResourceEditionState,
  hasUnpublishedChanges: boolean,
  publishMode?: boolean,
) => {
  if (publishMode) {
    return publishState
  }

  return editionState === ResourceEditionState.SAVED && hasUnpublishedChanges
}

const Edition = ({
  resource,
  draftResource,
  user,
  publishMode,
}: {
  resource: Resource
  draftResource: ResourceProjectionWithContext
  user: SessionUser
  publishMode?: boolean
}) => {
  const router = useRouter()

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
    // Has been updated after published (or created) event
    (updatedDraftResource.published?.getTime() ??
      updatedDraftResource.created.getTime()) !==
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

  // If the user has made an edit, we ask for confirmation before leaving page
  const [askConfirmationBeforeLeaving, setAskConfirmationBeforeLeaving] =
    useState(false)
  // Edition state begins as "Saved", if an edit is made, it will change to another value
  if (
    !askConfirmationBeforeLeaving &&
    editionState !== ResourceEditionState.SAVED
  ) {
    setAskConfirmationBeforeLeaving(true)
  }
  const confirmationText = `Souhaitez-vous quitter l'éditeur sans publier les modifications apportées à ${resource.title} ? Les modifications sont enregistrées, vous pouvez également les publier plus tard.`

  useEffect(() => {
    if (!askConfirmationBeforeLeaving) {
      return
    }
    const nativeBrowserHandler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      return confirmationText
    }

    // TODO When implemented by next app router, show a modal instead of a browser confirm
    const nextNavigationHandler = () => {
      if (!window.confirm(confirmationText)) {
        Router.events.emit('routeChangeError')
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw "Navigation annulée par l'utilisateur"
      }
    }

    window.addEventListener('beforeunload', nativeBrowserHandler)
    Router.events.on('beforeHistoryChange', nextNavigationHandler)

    return () => {
      window.removeEventListener('beforeunload', nativeBrowserHandler)
      Router.events.off('beforeHistoryChange', nextNavigationHandler)
    }
  }, [askConfirmationBeforeLeaving])

  const sendCommand: SendCommand = async (command: ResourceMutationCommand) => {
    const result = await mutate.mutateAsync(command)
    setUpdatedDraftResource(result.resource)

    return result
  }

  const defaultPublic = updatedDraftResource.base
    ? updatedDraftResource.base.isPublic
    : user.isPublic

  const { control, getValues, formState } = useForm<PublishCommand['payload']>({
    resolver: zodResolver(PublishCommandValidation),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      resourceId: resource.id,
      isPublic: defaultPublic ? undefined : false,
    },
  })

  // Publish command is only available if publishedResource is older than updatedDraftResource
  const canPublish = isPublishable(
    // TODO: should be formState.isValid => not refreshed...
    true,
    editionState,
    hasUnpublishedChanges,
    publishMode,
  )

  const onPublish = async () => {
    if (publishMode) {
      try {
        // TODO this will first navigate to a "Publication" page for additional input
        const result = await sendCommand({
          name: 'Publish',
          payload: getValues(),
        })
        router.push(`/ressources/${result.resource.slug}`, {
          unstable_skipClientCache: true,
        })
      } catch (error) {
        console.error('Could not publish resource', error)
        // TODO Have a nice error and handle edge cases server side
        // TODO for example a linked base or file or resource has been deleted since last publication
        throw error
      }
    } else {
      router.push(`/ressources/${resource.slug}/publier`)
    }
  }

  return (
    <>
      <div className={classNames('fr-container', styles.container)}>
        {publishMode ? (
          <Publication
            resource={updatedDraftResource}
            user={user}
            sendCommand={sendCommand}
            control={control}
          />
        ) : (
          <>
            <BaseEdition
              resource={updatedDraftResource}
              user={user}
              sendCommand={sendCommand}
            />
            <hr className="fr-mt-6v fr-pb-8v fr-mb-0" />
            <div className="fr-mb-8v">
              <ResourceImageEdition
                resource={updatedDraftResource}
                sendCommand={sendCommand}
                editing={editing}
                setEditing={setEditing}
              />
            </div>
            <TitleEdition
              resource={updatedDraftResource}
              sendCommand={sendCommand}
              editing={editing}
              setEditing={setEditing}
            />
            <hr className="fr-mt-4w" />
            <p className={styles.title}>Contenu de la ressource</p>
            <ContentListEdition
              contents={updatedDraftResource.contents}
              resource={draftResource}
              sendCommand={sendCommand}
              editionState={editionState}
              editing={editing}
              setEditing={setEditing}
            />
            <AddContent
              resource={updatedDraftResource}
              sendCommand={sendCommand}
              editing={editing}
              setEditing={setEditing}
            />
          </>
        )}
      </div>
      <EditionActionBar
        publishMode={publishMode}
        publishedState={publishedState}
        editionState={editionState}
        canPublish={canPublish}
        unPublishedEdits={hasUnpublishedChanges}
        onPublish={onPublish}
      />
    </>
  )
}

export default withTrpc(Edition)
