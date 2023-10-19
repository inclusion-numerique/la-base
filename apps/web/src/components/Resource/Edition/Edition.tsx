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
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
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
    router.refresh()
    setUpdatedDraftResource(result.resource)

    return result
  }

  const defaultPublic = updatedDraftResource.base
    ? updatedDraftResource.base.isPublic
    : user.isPublic

  const publicationForm = useForm<PublishCommand>({
    resolver: zodResolver(PublishCommandValidation),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: 'Publish',
      payload: {
        resourceId: resource.id,
        isPublic: defaultPublic ? undefined : false,
      },
    },
  })

  const onPublish = async () => {
    if (publishMode) {
      publicationForm.handleSubmit(async (data: PublishCommand) => {
        try {
          const result = await sendCommand(data)
          router.refresh()
          router.push(`/ressources/${result.resource.slug}`)
        } catch (error) {
          console.error('Could not publish resource', error)
          // TODO Have a nice error and handle edge cases server side
          // TODO for example a linked base or file or resource has been deleted since last publication
          throw error
        }
      })()
    } else if (publishedState === ResourcePublishedState.DRAFT) {
      router.push(`/ressources/${resource.slug}/publier`)
    } else {
      try {
        const result = await sendCommand({
          name: 'Republish',
          payload: {
            resourceId: resource.id,
          },
        })
        router.refresh()
        router.push(`/ressources/${result.resource.slug}`)
      } catch (error) {
        console.error('Could not publish resource', error)
        // TODO Have a nice error and handle edge cases server side
        // TODO for example a linked base or file or resource has been deleted since last publication
        throw error
      }
    }
  }

  const onDelete = async () => {
    try {
      await sendCommand({
        name: 'Delete',
        payload: {
          resourceId: resource.id,
        },
      })

      // TODO There is a router bug here, unstable_skipClientCache does not work and we see our resource in the list after deletion
      // While waiting for https://github.com/vercel/next.js/issues/42991, router.refresh() will invalidate router client cache
      // See https://nextjs.org/docs/app/building-your-application/caching#invalidation-1
      router.refresh()
      router.push(searchUrl('ressources', defaultSearchParams))
    } catch (error) {
      console.error('Could not delete resource', error)
      // TODO Have a nice error and handle edge cases server side
      // TODO for example a linked base or file or resource has been deleted since last publication
      throw error
    }
  }

  return (
    <>
      <div
        className={classNames('fr-container', styles.container)}
        data-testid={publishMode ? 'resource-publication' : 'resource-edition'}
      >
        {publishMode ? (
          <Publication
            resource={updatedDraftResource}
            user={user}
            sendCommand={sendCommand}
            form={publicationForm}
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
        resource={resource}
        publishMode={publishMode}
        publishedState={publishedState}
        editionState={editionState}
        isSubmitting={publicationForm.formState.isSubmitting}
        unPublishedEdits={hasUnpublishedChanges}
        onPublish={onPublish}
        onDelete={onDelete}
      />
    </>
  )
}

export default withTrpc(Edition)
