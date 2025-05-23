'use client'

import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser } from '@app/web/auth/sessionUser'
import AddContent from '@app/web/components/Resource/Edition/AddContent'
import ContentListEdition from '@app/web/components/Resource/Edition/ContentListEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type PublishCommand,
  PublishCommandValidation,
} from '@app/web/server/resources/feature/PublishResource'
import type { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import type { Resource } from '@app/web/server/resources/getResource'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import ResourceBaseEdition from './ResourceBaseEdition'
import styles from './ResourceEdition.module.css'
import ResourceEditionActionBar from './ResourceEditionActionBar'
import ResourceImageEdition from './ResourceImageEdition'
import ResourcePublication from './ResourcePublication'
import ResourceTitleEdition from './ResourceTitleEdition'

export type SendCommandResult = Awaited<
  ReturnType<ReturnType<typeof trpc.resource.mutate.useMutation>['mutateAsync']>
>
export type SendCommand = (
  command: ResourceMutationCommand,
) => Promise<SendCommandResult>

const ResourceEdition = ({
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

  const contentFormButtonRef: React.ForwardedRef<HTMLButtonElement> =
    useRef(null)

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
      ? mutate.isPending
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
    if (!askConfirmationBeforeLeaving || !editing) {
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
        throw "Navigation annulée par l'utilisateur"
      }
    }

    window.addEventListener('beforeunload', nativeBrowserHandler)
    Router.events.on('beforeHistoryChange', nextNavigationHandler)

    return () => {
      window.removeEventListener('beforeunload', nativeBrowserHandler)
      Router.events.off('beforeHistoryChange', nextNavigationHandler)
    }
  }, [askConfirmationBeforeLeaving, editing, confirmationText])

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
    contentFormButtonRef.current?.click()

    if (publishMode) {
      await publicationForm.handleSubmit(async (data: PublishCommand) => {
        try {
          const result = await sendCommand(data)
          router.push(`/ressources/${result.resource.slug}`)
          createToast({
            priority: 'success',
            message: (
              <>
                La ressource <strong>{resource.title}</strong> a bien été
                publiée
              </>
            ),
          })
        } catch (error) {
          // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
          console.error('Could not publish resource', error)
          // TODO Have a nice error and handle edge cases server side
          // TODO for example a linked base or file or resource has been deleted since last publication
          createToast({
            priority: 'error',
            message: (
              <>
                Une erreur est survenue lors de la publication de la ressource,
                veuillez réessayer ultérieurement
              </>
            ),
          })
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

        router.push(`/ressources/${resource.slug}`)
        createToast({
          priority: 'success',
          message: (
            <>
              La ressource <strong>{result.resource.title}</strong> a bien été
              publiée
            </>
          ),
        })
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
        console.error('Could not publish resource', error)
        createToast({
          priority: 'error',
          message: (
            <>
              Une erreur est survenue lors de la publication de la ressource,
              veuillez réessayer ultérieurement
            </>
          ),
        })
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

      router.push(searchUrl('ressources', defaultSearchParams))
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
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
          <ResourcePublication
            resource={updatedDraftResource}
            user={user}
            sendCommand={sendCommand}
            form={publicationForm}
          />
        ) : (
          <>
            <ResourceBaseEdition
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
            <ResourceTitleEdition
              resource={updatedDraftResource}
              sendCommand={sendCommand}
              editing={editing}
              setEditing={setEditing}
            />
            <hr className="fr-mt-4w" />
            <ContentListEdition
              ref={contentFormButtonRef}
              contents={updatedDraftResource.contents}
              resource={draftResource}
              sendCommand={sendCommand}
              editionState={editionState}
              editing={editing}
              setEditing={setEditing}
            />
            <AddContent
              ref={contentFormButtonRef}
              resource={updatedDraftResource}
              sendCommand={sendCommand}
              editing={editing}
              setEditing={setEditing}
              index={updatedDraftResource.contents.length - 1}
            />
          </>
        )}
      </div>
      <ResourceEditionActionBar
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

export default withTrpc(ResourceEdition)
