'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Controller, UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import CroppedUpload from '@app/ui/components/CroppedUpload/CroppedUpload'
import { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  CreateBaseCommand,
  CreateBaseCommandValidation,
} from '@app/web/server/bases/createBase'
import {
  UpdateBaseContactsCommand,
  UpdateBaseInformationsCommand,
} from '@app/web/server/bases/updateBase'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { getZodValidationMutationError } from '@app/web/utils/getZodValidationMutationError'
import BaseInformationsEdition from '../BaseInformationsEdition'
import BaseContactsEdition from '../BaseContactsEdition'
import Card from '../../Card'
import VisibilityEdition from '../Edition/VisibilityEdition'
import InviteUsers from '../../InviteUsers'
import BaseSideMenu from './SideMenu'
import styles from './CreateBase.module.css'

const {
  Component: CancelModal,
  close: closeCancelModal,
  buttonProps: cancelModalNativeButtonProps,
} = createModal({
  id: 'cancel',
  isOpenedByDefault: false,
})

const CreateBase = () => {
  const router = useRouter()
  const form = useForm<CreateBaseCommand>({
    resolver: zodResolver(CreateBaseCommandValidation),
    defaultValues: {
      emailIsPublic: true,
    },
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
    control,
  } = form

  const [emailErrors, setEmailsError] = useState(false)
  const [profilePicture, setProfilePicture] = useState<CroppedImageType>()
  const [coverImage, setCoverImage] = useState<CroppedImageType>()

  // File upload hooks for storage
  const imageUpload = useFileUpload()

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()

  const mutate = trpc.base.create.useMutation()

  const uploadImage = async (
    image: CroppedImageType,
    type: 'imageId' | 'coverImageId',
  ) => {
    try {
      const uploaded = await imageUpload.upload(image.file)
      if ('error' in uploaded) {
        setError(type, { message: uploaded.error })
        return null
      }

      return await createImage.mutateAsync({
        ...image,
        file: uploaded,
      })
    } catch (error) {
      const zodError = getZodValidationMutationError(error)
      if (zodError && zodError.length > 0) {
        setError(type, { message: zodError[0].message })
      }
      return null
    }
  }

  const onSubmit = async (data: CreateBaseCommand) => {
    if (emailErrors) {
      setError('members', {
        message:
          'Merci de vérifier la liste des profils que vous souhaitez inviter.',
      })
      return
    }

    try {
      const [profilePictureUploaded, coverImageUploaded] = await Promise.all([
        profilePicture
          ? await uploadImage(profilePicture, 'imageId')
          : Promise.resolve(),
        coverImage
          ? await uploadImage(coverImage, 'coverImageId')
          : Promise.resolve(),
      ])

      if (profilePictureUploaded === null || coverImageUploaded === null) {
        return
      }

      const base = await mutate.mutateAsync({
        ...data,
        imageId: profilePictureUploaded?.id,
        coverImageId: coverImageUploaded?.id,
      })
      router.refresh()
      router.push(`/bases/${base.slug}`)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNames('fr-container', styles.container)}>
        <BaseSideMenu />
        <div>
          <h1 className="fr-mb-6w">Créer une base</h1>
          <Card
            title="Informations"
            className="fr-mt-3w"
            id="informations"
            asterisk
          >
            <BaseInformationsEdition
              form={
                form as UseFormReturn<
                  CreateBaseCommand | UpdateBaseInformationsCommand
                >
              }
            />
          </Card>
          <Card title="Contacts" className="fr-mt-3w" id="contacts" asterisk>
            <BaseContactsEdition
              form={
                form as UseFormReturn<
                  CreateBaseCommand | UpdateBaseContactsCommand
                >
              }
            />
          </Card>
          <Card
            title="Visibilité de la base"
            className="fr-mt-3w"
            id="visibilite"
            description="Choisissez la visibilité de votre base. Vous pourrez modifier sa visibilité à tout moment."
          >
            <VisibilityEdition
              label="Base"
              control={control}
              disabled={isSubmitting}
            />
          </Card>

          <Card
            className="fr-mt-3w"
            title="Inviter des membres"
            description="Les membres peuvent voir, créer, publier et contribuer à l’ensemble des ressources liées à votre base. Vous pouvez également ajouter des administrateurs qui pourront inviter et gérer les membres de la base."
          >
            <Controller
              control={control}
              name="members"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <InviteUsers
                  disabled={isSubmitting}
                  label="Ajouter un membre"
                  setEmailsError={setEmailsError}
                  error={error}
                  onChange={onChange}
                />
              )}
            />
          </Card>

          <Card
            className="fr-mt-3w"
            id="photos"
            title="Photo de profil & couverture"
            description="Ajouter une image de profil & une image de couverture pour vous rendre identifiable et attirer les visiteurs."
          >
            <Controller
              control={control}
              name="imageId"
              render={({ fieldState: { error } }) => (
                <CroppedUpload
                  ratio={1}
                  round
                  label="de profil"
                  height={522 / 4.8}
                  id="profile"
                  disabled={isSubmitting}
                  error={error ? error.message : undefined}
                  onChange={setProfilePicture}
                />
              )}
            />
            <hr className="fr-mt-4w fr-pb-4w" />
            <Controller
              control={control}
              name="coverImageId"
              render={({ fieldState: { error } }) => (
                <CroppedUpload
                  ratio={4.8}
                  label="de couverture"
                  height={522 / 4.8}
                  id="cover"
                  onChange={setCoverImage}
                  disabled={isSubmitting}
                  error={error ? error.message : undefined}
                />
              )}
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
          Créer la base
        </Button>
        <CancelModal
          title="Annuler la création de la base"
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
          Êtes-vous sûr de vouloir annuler la création votre base ?
        </CancelModal>
      </div>
    </form>
  )
}

export default withTrpc(CreateBase)
