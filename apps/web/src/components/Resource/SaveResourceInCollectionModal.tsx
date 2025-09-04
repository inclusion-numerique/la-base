'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import RawModal from '@app/ui/components/Modal/RawModal'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import EmptyBox from '@app/web/components/EmptyBox'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import VisibilityField from '@app/web/components/VisibilityField'
import { useIsMobile } from '@app/web/hooks/useIsMobile'
import { collectionTitleMaxLength } from '@app/web/server/collections/collectionConstraints'
import {
  type CreateCollectionCommand,
  CreateCollectionCommandValidation,
} from '@app/web/server/collections/createCollection'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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

  const bases = user.bases.map(({ base }) => base)

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
    const selectedBase = bases.find((base) => base.id === baseId)
    if (selectedBase) {
      createCollectionForm.reset({
        addResourceId: resourceId,
        isPublic: selectedBase.isPublic ? undefined : false,
        baseId: selectedBase.id,
        title: '',
      })
    }

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
            Ajoutée à la collection&nbsp;
            <strong className={styles.title}>{result.collection.title}</strong>
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
            Enregistrée dans <strong>{collection.title}</strong>
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
  const withoutFavoriteCollections = user.collections.filter(
    (c) => !c.isFavorites,
  )
  const showCreateCollectionButton =
    !inCollectionCreation &&
    ((profileOnly && withoutFavoriteCollections.length > 0) ||
      (!!inBaseDirectory && inBaseDirectory.collections.length > 0) ||
      inProfileDirectory)

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

  const favoriteCollection = user.collections.find((c) => c.isFavorites)
  const isMobile = useIsMobile()
  const avatarSize = isMobile ? 32 : 48
  return (
    <form onSubmit={onSubmit}>
      <RawModal
        className={styles.modal}
        title={
          inCollectionCreation
            ? 'Créer une collection'
            : 'Enregistrer cette ressource dans :'
        }
        id={SaveResourceInCollectionDynamicModal.id}
        buttons={
          inCollectionCreation
            ? [
                {
                  children: 'Créer la collection',
                  priority: 'primary',
                  type: 'submit',
                  doClosesModal: false,
                  className: creationLoading ? 'fr-btn--loading' : undefined,
                  nativeButtonProps: {
                    key: 'save-collection',
                  },
                },
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
              ]
            : showCreateCollectionButton
              ? [
                  {
                    children: 'Créer une collection',
                    type: 'button',
                    priority: 'secondary',
                    iconId: 'ri-folder-add-line',
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
              'fr-border--bottom',
            )}
            onClick={goBackFromDirectory}
            data-testid="back-to-bases-button"
          >
            <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
              <span
                className={classNames(
                  'fr-icon-arrow-left-s-line',
                  'fr-icon--sm',
                  'fr-mx-1w',
                  styles.arrow,
                )}
              />
              {inBaseDirectory ? (
                <BaseImage base={inBaseDirectory} size={avatarSize} />
              ) : (
                <RoundProfileImage
                  user={user}
                  borderWidth={1}
                  size={avatarSize}
                />
              )}
              <div className="fr-flex fr-direction-column fr-flex-gap-1v">
                <b
                  className={classNames(
                    'fr-text-title--grey fr-text--start',
                    styles.title,
                  )}
                >
                  {inBaseDirectory
                    ? inBaseDirectory.title
                    : `${user.name} - Mes collections`}
                </b>
                <div className={classNames('fr-mt-2v', styles.collections)}>
                  <span className="fr-icon-folder-2-line fr-icon--sm" />
                  &nbsp;
                  {inBaseDirectory
                    ? inBaseDirectory.collections.length
                    : withoutFavoriteCollections.length}
                  &nbsp;Collections
                </div>
              </div>
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
              <p className="fr-text-mention--grey fr-text--xs">
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
                      <div className="fr-flex fr-direction-column fr-flex-gap-1v">
                        <span className="fr-text-mention--black fr-text--bold">
                          Base privée
                        </span>
                        <span className="fr-text-mention--grey fr-text--regular">
                          La collection sera accessible uniquement aux membres
                          et aux administrateurs de votre base.
                        </span>
                      </div>
                    ) : (
                      <div className="fr-flex fr-direction-column fr-flex-gap-1v">
                        <span className="fr-text-mention--black fr-text--bold">
                          Profil privé
                        </span>
                        <span className="fr-text-mention--grey fr-text--regular">
                          Votre collection sera visible uniquement par vous.
                        </span>
                      </div>
                    )
                  }
                  classes={{
                    title: styles.noticeContainer,
                  }}
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
              {!!favoriteCollection && profileOnly && (
                <div
                  className={classNames(
                    withoutFavoriteCollections.length > 0 &&
                      'fr-border--bottom',
                  )}
                >
                  <AddOrRemoveResourceFromCollection
                    loading={
                      pendingMutationCollectionId === favoriteCollection.id
                    }
                    key={favoriteCollection.id}
                    collection={favoriteCollection}
                    resourceId={resourceId}
                    onAdd={onAddToCollection}
                    onRemove={onRemoveFromCollection}
                    withPrivacyTag
                  />
                </div>
              )}
              {withoutFavoriteCollections.length > 0 ? (
                <>
                  <div className="fr-mt-4v">
                    <span className="fr-text--xs fr-text--bold fr-text-mention--grey fr-text--uppercase">
                      Mes collections
                    </span>
                  </div>
                  {withoutFavoriteCollections.map((collection) => (
                    <AddOrRemoveResourceFromCollection
                      loading={pendingMutationCollectionId === collection.id}
                      key={collection.id}
                      collection={collection}
                      resourceId={resourceId}
                      onAdd={onAddToCollection}
                      onRemove={onRemoveFromCollection}
                      withPrivacyTag={!collection.isPublic}
                    />
                  ))}
                </>
              ) : (
                <EmptyBox
                  title="Vous n’avez pas de collection dans votre profil."
                  className="fr-mt-6v fr-p-6v fr-p-md-8v fr-py-md-0"
                  titleAs="h5"
                >
                  <p>
                    Créez une collection pour enregistrer, organiser, partager
                    facilement des ressources.&nbsp;
                    <Link
                      href="https://docs.numerique.gouv.fr/docs/5f8d928b-2fd7-4f4a-b8fd-ca9c841dc841/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fr-link"
                    >
                      En savoir plus
                    </Link>
                  </p>
                  <div data-testid="create-resource-button">
                    <Button
                      type="button"
                      onClick={() =>
                        viewCollectionCreation(inBaseDirectory?.id)
                      }
                      nativeButtonProps={{
                        key: 'view-collection-creation',
                      }}
                    >
                      <span className="ri-folder-add-line fr-mr-1w" />
                      Créer une collection
                    </Button>
                  </div>
                </EmptyBox>
              )}
            </>
          ) : inBaseDirectory ? (
            inBaseDirectory.collections.length > 0 ? (
              inBaseDirectory.collections.map((collection) => (
                <AddOrRemoveResourceFromCollection
                  loading={pendingMutationCollectionId === collection.id}
                  key={collection.id}
                  collection={collection}
                  resourceId={resourceId}
                  onAdd={onAddToCollection}
                  onRemove={onRemoveFromCollection}
                  withPrivacyTag={!collection.isPublic}
                />
              ))
            ) : (
              <EmptyBox
                title="Vous n’avez pas de collection dans votre base."
                className="fr-mt-6v fr-p-md-8v fr-py-md-0"
                titleAs="h5"
                data-testid="base-without-collection"
              >
                <p>
                  Créez une collection pour enregistrer, organiser, partager
                  facilement des ressources.&nbsp;
                  <Link
                    href="https://docs.numerique.gouv.fr/docs/5f8d928b-2fd7-4f4a-b8fd-ca9c841dc841/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fr-link"
                  >
                    En savoir plus
                  </Link>
                </p>
                <div data-testid="create-resource-button">
                  <Button
                    type="button"
                    onClick={() => viewCollectionCreation(inBaseDirectory?.id)}
                    nativeButtonProps={{
                      key: 'view-collection-creation',
                    }}
                  >
                    <span className="ri-folder-add-line fr-mr-1w" />
                    Créer une collection
                  </Button>
                </div>
              </EmptyBox>
            )
          ) : (
            <>
              {!!favoriteCollection && (
                <div
                  className={classNames(
                    (withoutFavoriteCollections.length > 0 ||
                      bases.length > 0) &&
                      'fr-border--bottom',
                  )}
                >
                  <AddOrRemoveResourceFromCollection
                    loading={
                      pendingMutationCollectionId === favoriteCollection.id
                    }
                    key={favoriteCollection.id}
                    collection={favoriteCollection}
                    resourceId={resourceId}
                    onAdd={onAddToCollection}
                    onRemove={onRemoveFromCollection}
                    withPrivacyTag
                  />
                </div>
              )}
              {withoutFavoriteCollections.length > 0 && (
                <SaveInNestedCollection
                  user={user}
                  onClick={viewProfileDirectory}
                  alreadyInCollections={
                    withoutFavoriteCollections.filter(({ resources }) =>
                      resources.some(
                        (collectionResource) =>
                          collectionResource.resourceId === resourceId,
                      ),
                    ).length
                  }
                />
              )}
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
