'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Notice from '@codegouvfr/react-dsfr/Notice'
import RawModal from '@app/ui/components/Modal/RawModal'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import * as Sentry from '@sentry/nextjs'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import { trpc } from '@app/web/trpc'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'
import {
  CreateCollectionCommand,
  CreateCollectionCommandValidation,
} from '@app/web/server/collections/createCollection'
import { collectionTitleMaxLength } from '@app/web/server/collections/collectionConstraints'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import VisibilityField from '@app/web/components/VisibilityField'
import AddOrRemoveResourceFromCollection from './AddOrRemoveResourceFromCollection'
import SaveInNestedCollection from './SaveInNestedCollection'
import styles from './SaveResourceInCollectionModal.module.css'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${collectionTitleMaxLength} caractères`

export const SaveResourceInCollectionDynamicModal = createDynamicModal({
  id: 'save-resource-in-collection',
  isOpenedByDefault: false,
  initialState: {
    resourceId: null as string | null,
  },
})

/**
 * This modal is used to save a resource in a collection
 * and to quickly create a collection.
 *
 * The title and buttons of the modal must be top level, component is too complex
 * and could be broken down in multiple hooks and components for the different "steps" of the modal.
 */
const SaveResourceInCollectionModal = ({ user }: { user: SessionUser }) => {
  const { resourceId } = SaveResourceInCollectionDynamicModal.useState()

  const router = useRouter()

  const bases = getBasesFromSessionUser(user)

  // User can create a collection in a base or in his profile from this modal
  const createCollectionMutation = trpc.collection.create.useMutation()

  const isUserPublic = user.isPublic

  const createCollectionForm = useForm<CreateCollectionCommand>({
    resolver: zodResolver(CreateCollectionCommandValidation),
    defaultValues: {
      // Let the user chose the visibility only if possible
      isPublic: isUserPublic ? undefined : false,
    },
  })

  const createCollectionFormReset = createCollectionForm.reset

  // If the user has no base, collections are limited to the profile
  const profileOnly = bases.length === 0

  // If the user has bases, he can see collections from the profiles (or bases)
  const [inProfileDirectory, setInProfileDirectory] = useState(false)

  const viewProfileDirectory = () => {
    setInProfileDirectory(true)
    createCollectionForm.reset({
      addResourceId: resourceId,
      isPublic: user.isPublic ? undefined : false,
      baseId: null,
      title: '',
    })
  }

  // The base if navigating in a base directory
  const [inBaseDirectory, setInBaseDirectory] =
    useState<SessionUserBase | null>(null)

  const viewBaseDirectory = (baseId: string) => {
    const selectedBase = bases.find((base) => base.id === baseId)
    if (!selectedBase) {
      return
    }
    setInBaseDirectory(selectedBase)
    createCollectionForm.reset({
      addResourceId: resourceId,
      isPublic: selectedBase.isPublic ? undefined : false,
      baseId: selectedBase.id,
      title: '',
    })
  }

  const goBackFromDirectory = () => {
    setInBaseDirectory(null)
    setInProfileDirectory(false)
    createCollectionForm.reset({
      addResourceId: resourceId,
      isPublic: user.isPublic ? undefined : false,
      baseId: undefined,
      title: '',
    })
  }

  const [inCollectionCreation, setInCollectionCreation] = useState(false)

  const viewCollectionCreation = (baseId?: string) => {
    createCollectionForm.reset({
      addResourceId: resourceId,
      isPublic: user.isPublic ? undefined : false,
      baseId,
      title: '',
    })
    setInCollectionCreation(true)
  }

  const cancelCollectionCreation = () => {
    setInCollectionCreation(false)
  }

  /**
   * Reset modal state when the resource changes
   */
  useEffect(() => {
    createCollectionFormReset({
      addResourceId: resourceId,
      isPublic: isUserPublic ? undefined : false,
      baseId: null,
      title: '',
    })
    setInBaseDirectory(null)
    setInProfileDirectory(false)
    setInCollectionCreation(false)
  }, [resourceId, createCollectionFormReset, isUserPublic])

  /**
   * Reset modal state on modal close
   */
  useModalVisibility(SaveResourceInCollectionDynamicModal.id, {
    onClosed: () => {
      createCollectionFormReset({
        addResourceId: resourceId,
        isPublic: isUserPublic ? undefined : false,
        baseId: null,
        title: '',
      })
      setInBaseDirectory(null)
      setInProfileDirectory(false)
      setInCollectionCreation(false)
    },
  })

  // Used to display which collection is in "loading" state when adding or removing to/from a collection
  const [pendingMutationCollectionId, setPendingMutationCollectionId] =
    useState<string | null>(null)

  const addToCollectionMutation = trpc.resource.addToCollection.useMutation()
  const removeFromCollectionMutation =
    trpc.resource.removeFromCollection.useMutation()

  const onAddToCollection = async (collectionId: string) => {
    if (!resourceId) {
      return
    }
    setPendingMutationCollectionId(collectionId)
    try {
      const result = await addToCollectionMutation.mutateAsync({
        resourceId,
        collectionId,
      })
      setPendingMutationCollectionId(null)
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            Ajoutée à la collection <strong>{result.collection.title}</strong>
          </>
        ),
      })
      SaveResourceInCollectionDynamicModal.close()
    } catch (error) {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de l’ajout à la collection',
      })
      Sentry.captureException(error)
      throw error
    }
  }

  const onRemoveFromCollection = async (collectionId: string) => {
    if (!resourceId) {
      return
    }
    setPendingMutationCollectionId(collectionId)
    try {
      const result = await removeFromCollectionMutation.mutateAsync({
        resourceId,
        collectionId,
      })
      setPendingMutationCollectionId(null)
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            Retirée de la collection <strong>{result.collection.title}</strong>
          </>
        ),
      })

      SaveResourceInCollectionDynamicModal.close()
    } catch (error) {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors du retrait de la collection',
      })
      Sentry.captureException(error)
      throw error
    }
  }

  const onCreateCollection = async (data: CreateCollectionCommand) => {
    try {
      const collection = await createCollectionMutation.mutateAsync(data)

      createToast({
        priority: 'success',
        message: (
          <>
            Ajoutée à la nouvelle collection <strong>{collection.title}</strong>
          </>
        ),
      })

      router.refresh()
      SaveResourceInCollectionDynamicModal.close()

      // There is a bug here where useModalVisibility onClose do not trigger :(
      // Here is a setTimeout hack to fix it
      setTimeout(() => {
        createCollectionFormReset({
          addResourceId: resourceId,
          isPublic: isUserPublic ? undefined : false,
          baseId: null,
          title: '',
        })
        setInBaseDirectory(null)
        setInProfileDirectory(false)
        setInCollectionCreation(false)
      }, 800)
    } catch (error) {
      if (
        applyZodValidationMutationErrorsToForm(
          error,
          createCollectionForm.setError,
        )
      ) {
        return
      }

      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la création de la collection',
      })
      Sentry.captureException(error)

      throw error
    }
  }

  const showCreateCollectionButton =
    !inCollectionCreation &&
    (profileOnly || !!inBaseDirectory || inProfileDirectory)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation()
    event.preventDefault()
    if (inCollectionCreation) {
      createCollectionForm
        .handleSubmit(onCreateCollection)()
        .catch(() => {
          // Error is caught in the onSubmit
        })
    }
  }

  const collectionCannotBePublic = inBaseDirectory
    ? !inBaseDirectory.isPublic
    : !user.isPublic

  const creationLoading =
    createCollectionForm.formState.isSubmitting ||
    createCollectionForm.formState.isSubmitSuccessful

  return (
    <form onSubmit={onSubmit}>
      <RawModal
        className={styles.modal}
        title={
          inCollectionCreation
            ? 'Ajouter à une nouvelle collection'
            : 'Ajouter à une collection'
        }
        id={SaveResourceInCollectionDynamicModal.id}
        buttons={
          inCollectionCreation
            ? [
                {
                  children: 'Précédent',
                  priority: 'secondary',
                  type: 'button',
                  onClick: cancelCollectionCreation,
                  doClosesModal: false,
                  nativeButtonProps: {
                    key: 'cancel-collection',
                  },
                },
                {
                  children: 'Enregistrer',
                  priority: 'primary',
                  type: 'submit',
                  doClosesModal: false,
                  className: creationLoading ? 'fr-btn--loading' : undefined,
                  nativeButtonProps: {
                    key: 'save-collection',
                  },
                },
              ]
            : showCreateCollectionButton
              ? [
                  {
                    children: 'Créer une collection',
                    type: 'button',
                    priority: 'secondary',
                    iconId: 'fr-icon-add-line',
                    doClosesModal: false,
                    className: styles.createCollectionButton,
                    onClick: () => viewCollectionCreation(inBaseDirectory?.id),
                    nativeButtonProps: {
                      key: 'view-collection-creation',
                    },
                  },
                ]
              : undefined
        }
      >
        {/* Navigation if in directory */}
        {!inCollectionCreation && (inProfileDirectory || !!inBaseDirectory) && (
          <button
            type="button"
            className={classNames(
              styles.clickableContainer,
              styles.backToBasesButton,
            )}
            onClick={goBackFromDirectory}
            data-testid="back-to-bases-button"
          >
            <div>
              <span
                className={classNames(
                  'fr-icon-arrow-left-s-line',
                  'fr-icon--sm',
                  'fr-mx-1w',
                  styles.arrow,
                )}
              />
              <b className="fr-text-title--grey fr-ml-1w">
                {inBaseDirectory
                  ? inBaseDirectory.title
                  : `${user.name} - Mes collections`}
              </b>
            </div>
          </button>
        )}
        {/* Add/remove mutation error */}
        {!inCollectionCreation &&
          (addToCollectionMutation.error ||
            removeFromCollectionMutation.error) && (
            <p
              className="fr-error-text"
              data-testid="save-resource-in-collection-error"
            >
              {addToCollectionMutation.error?.message ??
                removeFromCollectionMutation.error?.message}
            </p>
          )}
        {!!resourceId &&
          (inCollectionCreation ? (
            <>
              <p>
                Les champs avec une astérisque sont obligatoires. Vous pourrez
                modifier ces informations plus tard.
              </p>

              <InputFormField
                data-testid="collection-title-input"
                control={createCollectionForm.control}
                path="title"
                label="Nom de la collection"
                disabled={createCollectionForm.formState.isSubmitting}
                asterisk
                info={titleInfo}
              />
              {/* Display info if cannot be public */}
              {collectionCannotBePublic ? (
                <Notice
                  title={
                    inBaseDirectory ? (
                      <>
                        <span className="fr-text--bold">Base privée</span>
                        <br />
                        <span className="fr-text--regular">
                          La collection sera accessible uniquement aux membres
                          et aux administrateurs de votre base.
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="fr-text--bold">Profil privé</span>
                        <br />
                        <span className="fr-text--regular">
                          Votre collection sera visible uniquement par vous.
                        </span>
                      </>
                    )
                  }
                />
              ) : (
                <VisibilityField
                  model="Collection"
                  path="isPublic"
                  control={createCollectionForm.control}
                  disabled={createCollectionForm.formState.isSubmitting}
                  privateTitle="Collection privée"
                  publicTitle="Collection publique"
                  publicHint="Visible par tous les visiteurs."
                  privateHint="Accessible uniquement aux membres et aux administrateurs que vous inviterez."
                  label="Visibilité de la collection"
                  asterisk
                />
              )}
            </>
          ) : inProfileDirectory || profileOnly ? (
            <>
              {user.collections.map((collection) => (
                <AddOrRemoveResourceFromCollection
                  user={user}
                  loading={pendingMutationCollectionId === collection.id}
                  key={collection.id}
                  collection={collection}
                  resourceId={resourceId}
                  onAdd={onAddToCollection}
                  onRemove={onRemoveFromCollection}
                />
              ))}
            </>
          ) : inBaseDirectory ? (
            inBaseDirectory.collections.length > 0 ? (
              inBaseDirectory.collections.map((collection) => (
                <AddOrRemoveResourceFromCollection
                  user={user}
                  loading={pendingMutationCollectionId === collection.id}
                  key={collection.id}
                  collection={collection}
                  resourceId={resourceId}
                  onAdd={onAddToCollection}
                  onRemove={onRemoveFromCollection}
                />
              ))
            ) : (
              <div
                className={styles.emptyBase}
                data-testid="base-without-collection"
              >
                Vous n&lsquo;avez pas de collection dans votre base
              </div>
            )
          ) : (
            <>
              <SaveInNestedCollection
                user={user}
                onClick={viewProfileDirectory}
                alreadyInCollections={
                  user.collections.filter(({ resources }) =>
                    resources.some(
                      (collectionResource) =>
                        collectionResource.resourceId === resourceId,
                    ),
                  ).length
                }
              />
              {bases.map((base) => (
                <SaveInNestedCollection
                  key={base.id}
                  user={user}
                  base={base}
                  onClick={() => {
                    viewBaseDirectory(base.id)
                  }}
                  alreadyInCollections={
                    base.collections.filter(({ resources }) =>
                      resources.some(
                        (collectionResource) =>
                          collectionResource.resourceId === resourceId,
                      ),
                    ).length
                  }
                />
              ))}
            </>
          ))}
      </RawModal>
    </form>
  )
}

export default withTrpc(SaveResourceInCollectionModal)
