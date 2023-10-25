'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { getZodValidationMutationError } from '@app/web/utils/getZodValidationMutationError'
import {
  CreateCollectionCommand,
  CreateCollectionCommandValidation,
} from '@app/web/server/collections/createCollection'
import Card from '../../Card'
import CollectionInformationsEdition from '../Edition/CollectionInformationsEdition'
import VisibilityEdition from '../../Base/Edition/VisibilityEdition'
import ImageEdition from '../Edition/ImageEdition'
import CollectionSideMenu from './SideMenu'
import styles from './CreateCollection.module.css'

const {
  Component: CancelModal,
  close: closeCancelModal,
  buttonProps: cancelModalNativeButtonProps,
} = createModal({
  id: 'cancel',
  isOpenedByDefault: false,
})

const CreateCollection = () => {
  const router = useRouter()
  const form = useForm<CreateCollectionCommand>({
    resolver: zodResolver(CreateCollectionCommandValidation),
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
    control,
  } = form

  const [image, setImage] = useState<CroppedImageType>()

  // File upload hooks for storage
  const imageUpload = useFileUpload()

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()

  const mutate = trpc.collection.create.useMutation()

  const uploadImage = async (imagetoUpload: CroppedImageType) => {
    try {
      const uploaded = await imageUpload.upload(imagetoUpload.file)
      if ('error' in uploaded) {
        setError('imageId', { message: uploaded.error })
        return null
      }

      return await createImage.mutateAsync({
        ...imagetoUpload,
        file: uploaded,
      })
    } catch (error) {
      const zodError = getZodValidationMutationError(error)
      if (zodError && zodError.length > 0) {
        setError('imageId', { message: zodError[0].message })
      }
      return null
    }
  }

  const onSubmit = async (data: CreateCollectionCommand) => {
    try {
      const imageUploaded = image ? await uploadImage(image) : null

      const collection = await mutate.mutateAsync({
        ...data,
        imageId: imageUploaded?.id || null,
      })
      router.refresh()
      router.push(`/collections/${collection.id}`)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNames('fr-container', styles.container)}>
        <CollectionSideMenu />
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
              disabled={isSubmitting}
              onChange={setImage}
            />
          </Card>
          <Card
            title="Visibilité de la collection"
            className="fr-mt-3w"
            id="visibilite"
            description="Choisissez la visibilité de votre collection."
          >
            <VisibilityEdition
              label="Collection"
              control={control}
              disabled={isSubmitting}
            />
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
          className={classNames(isSubmitting && 'fr-btn--loading')}
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
