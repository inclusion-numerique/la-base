'use client'

import type { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import type { SessionUser } from '@app/web/auth/sessionUser'
import Card from '@app/web/components/Card'
import VisibilityField from '@app/web/components/VisibilityField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useImageUpload } from '@app/web/hooks/useImageUpload'
import {
  type CreateCollectionCommand,
  CreateCollectionCommandValidation,
} from '@app/web/server/collections/createCollection'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageEdition from '../Edition/ImageEdition'
import CollectionInformationsEdition from './CollectionInformationsEdition'
import CreateCollectionSideMenu from './CreateCollectionSideMenu'

const {
  Component: CancelModal,
  close: closeCancelModal,
  buttonProps: cancelModalNativeButtonProps,
} = createModal({
  id: 'create-collection-cancel',
  isOpenedByDefault: false,
})

const CreateCollection = ({
  base,
  user,
}: {
  user: SessionUser
  base?: { id: string; isPublic: boolean } | null
}) => {
  // User cannot create a public collection on a private base or profile
  const collectionCannotBePublic = base ? !base.isPublic : !user.isPublic

  const router = useRouter()
  const form = useForm<CreateCollectionCommand>({
    resolver: zodResolver(CreateCollectionCommandValidation),
    defaultValues: {
      baseId: base?.id,
      // Set isPublic to false if collection cannot be public as the user cannot chose
      isPublic: collectionCannotBePublic ? false : undefined,
    },
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
    control,
  } = form

  const [image, setImage] = useState<CroppedImageType>()

  const mutate = trpc.collection.create.useMutation()

  const uploadImage = useImageUpload(form)

  const onSubmit = async (data: CreateCollectionCommand) => {
    try {
      const imageUploaded = image ? await uploadImage(image, 'imageId') : null

      const collection = await mutate.mutateAsync({
        ...data,
        imageId: imageUploaded?.id || null,
      })
      router.push(`/collections/${collection.slug}`)
      createToast({
        priority: 'success',
        message: (
          <>
            Votre collection <strong>{collection.title}</strong> a bien été
            créée
          </>
        ),
      })
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  const isLoading = isSubmitting || mutate.isPending || mutate.isSuccess

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-container fr-flex">
        <CreateCollectionSideMenu />
        <div className="fr-container--slim">
          <h1 className="fr-page-title">Créer une collection</h1>
          <Card
            title="Informations"
            titleAs="h2"
            className="fr-mt-3w"
            id="informations"
            description={
              <span className="fr-text--sm fr-hint-text fr-mb-0">
                Les champs avec <RedAsterisk /> sont obligatoires.
              </span>
            }
            contentSeparator
          >
            <CollectionInformationsEdition form={form} />
          </Card>
          <Card
            title="Aperçu de la collection"
            titleAs="h2"
            className="fr-mt-3w"
            id="apercu"
            contentSeparator
          >
            <ImageEdition
              control={control}
              disabled={isLoading}
              onChange={setImage}
            />
          </Card>
          <Card
            title="Visibilité de la collection"
            titleAs="h2"
            className="fr-mt-3w"
            id="visibilite"
            description="Choisissez la visibilité de votre collection."
            contentSeparator
          >
            {collectionCannotBePublic && (
              <Notice
                className="fr-mx-2v fr-my-4v"
                title={
                  base ? (
                    <>
                      <span className="fr-text--bold">Base privée</span>
                      <br />
                      <span className="fr-text--regular">
                        La collection sera accessible uniquement aux membres et
                        aux administrateurs de votre base.
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
            )}
            <VisibilityField
              model="collection"
              path="isPublic"
              control={control}
              disabled={isLoading || (base != null && !base.isPublic)}
              publicTitle="Collection publique"
              privateTitle="Collection privée"
              publicHint="Visible par tous les visiteurs."
              privateHint={
                base
                  ? 'Visible uniquement par les membres de votre base.'
                  : 'Visible uniquement par vous.'
              }
            />
          </Card>
          <ButtonsGroup
            className="fr-mt-3w"
            buttons={[
              {
                nativeButtonProps: { 'data-testid': 'create-button' },
                type: 'submit',
                children: 'Créer la collection',
                ...buttonLoadingClassname(isLoading),
              },
              {
                nativeButtonProps: { 'data-testid': 'cancel-button' },
                type: 'button',
                children: 'Annuler',
                priority: 'secondary',
                ...cancelModalNativeButtonProps,
              },
            ]}
          />
          <CancelModal
            title="Annuler la création de la collection"
            buttons={[
              {
                priority: 'secondary',
                children: 'Revenir à la création',
                type: 'button',
                onClick: closeCancelModal,
                nativeButtonProps: { 'data-testid': 'back-modal-button' },
              },
              {
                children: <div data-testid="cancel-modal-button">Annuler</div>,
                linkProps: { href: `/profils/${user.slug}/collections` },
              },
            ]}
          >
            Êtes-vous sûr de vouloir annuler la création votre collection ?
          </CancelModal>
        </div>
      </div>
    </form>
  )
}

export default withTrpc(CreateCollection)
