'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { createToast } from '@app/ui/toast/createToast'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  CreateCollectionCommand,
  CreateCollectionCommandValidation,
} from '@app/web/server/collections/createCollection'
import { SessionUser } from '@app/web/auth/sessionUser'
import VisibilityField from '@app/web/components/VisibilityField'
import { useImageUpload } from '../../../hooks/useImageUpload'
import Card from '../../Card'
import ImageEdition from '../Edition/ImageEdition'
import CollectionInformationsEdition from './CollectionInformationsEdition'
import CreateCollectionSideMenu from './CreateCollectionSideMenu'
import styles from './CreateCollection.module.css'

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
      router.refresh()
      router.push(`/collections/${collection.slug}`)
      // TODO: Wierd refreshes not working create e2e for this (collection appearing in base / collection page) and remove second refresh
      router.refresh()
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
      <div className={classNames('fr-container', styles.container)}>
        <CreateCollectionSideMenu />
        <div>
          <h1 className="fr-mb-6w">Créer une collection</h1>
          <Card
            title="Informations"
            className="fr-mt-3w"
            id="informations"
            asterisk
          >
            <CollectionInformationsEdition form={form} />
          </Card>
          <Card
            title="Aperçu de la collection"
            className="fr-mt-3w"
            id="apercu"
          >
            <ImageEdition
              control={control}
              disabled={isLoading}
              onChange={setImage}
            />
          </Card>
          <Card
            title="Visibilité de la collection"
            className="fr-mt-3w"
            id="visibilite"
            description="Choisissez la visibilité de votre collection."
          >
            {/* Display info if cannot be public */}
            {collectionCannotBePublic ? (
              <Notice
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
            ) : (
              <VisibilityField
                model="collection"
                control={control}
                disabled={isLoading}
                publicTitle="Collection publique"
                privateTitle="Collection privée"
              />
            )}
          </Card>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          data-testid="cancel-button"
          priority="secondary"
          {...cancelModalNativeButtonProps}
        >
          Annuler
        </Button>
        <Button
          data-testid="create-button"
          type="submit"
          className={classNames(isLoading && 'fr-btn--loading')}
        >
          Créer la collection
        </Button>
        <CancelModal
          title="Annuler la création de la collection"
          buttons={[
            {
              priority: 'secondary',
              children: 'Revenir à la création',
              onClick: closeCancelModal,
              nativeButtonProps: { 'data-testid': 'back-modal-button' },
            },
            {
              children: <div data-testid="cancel-modal-button">Annuler</div>,
              linkProps: { href: '/' },
            },
          ]}
        >
          Êtes-vous sûr de vouloir annuler la création votre collection ?
        </CancelModal>
      </div>
    </form>
  )
}

export default withTrpc(CreateCollection)
