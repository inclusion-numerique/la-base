'use client'

import CroppedUpload from '@app/ui/components/CroppedUpload/CroppedUpload'
import type { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import type { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseContactsEdition from '@app/web/components/Base/BaseContactsEdition'
import BaseInformationsEdition from '@app/web/components/Base/BaseInformationsEdition'
import CreateBaseSideMenu from '@app/web/components/Base/Create/CreateBaseSideMenu'
import Card from '@app/web/components/Card'
import VisibilityField from '@app/web/components/VisibilityField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import InviteUsers from '@app/web/features/base/invitation/components/InviteUsers'
import { useImageUpload } from '@app/web/hooks/useImageUpload'
import {
  type CreateBaseCommand,
  CreateBaseCommandValidation,
} from '@app/web/server/bases/createBase'
import type {
  UpdateBaseContactsCommand,
  UpdateBaseInformationsCommand,
} from '@app/web/server/bases/updateBase'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, type UseFormReturn, useForm } from 'react-hook-form'

const {
  Component: CancelModal,
  close: closeCancelModal,
  buttonProps: cancelModalNativeButtonProps,
} = createModal({
  id: 'cancel-base-creation',
  isOpenedByDefault: false,
})

const addImageCropModal = createModal({
  id: `add-base-image`,
  isOpenedByDefault: false,
})

const addCoverImageCropModal = createModal({
  id: `add-cover-image`,
  isOpenedByDefault: false,
})

const CreateBase = ({ user }: { user: SessionUser }) => {
  const router = useRouter()
  const form = useForm<CreateBaseCommand>({
    resolver: zodResolver(CreateBaseCommandValidation),
    defaultValues: {
      emailIsPublic: true,
      email: user.email,
      isPublic: true,
      members: [],
    },
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
    control,
  } = form

  const [emailErrors, setEmailsError] = useState(false)
  const [profilePicture, setProfilePicture] = useState<CroppedImageType>()
  const [coverImage, setCoverImage] = useState<CroppedImageType>()

  const mutate = trpc.base.create.useMutation()

  const uploadImage = useImageUpload(form)

  const isLoading = isSubmitting || isSubmitSuccessful

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
      router.push(`/bases/${base.slug}`)
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            Votre base <strong>{base.title}</strong> a bien été créée
          </>
        ),
      })
    } catch (error) {
      if (applyZodValidationMutationErrorsToForm(error, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la création de la base',
      })
      mutate.reset()
      setTimeout(() => {
        form.reset(data)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-container fr-flex-md">
        <CreateBaseSideMenu />
        <div className="fr-container--slim">
          <h1 className="fr-page-title">Créer une base</h1>
          <Card
            noBorder
            title="Informations de la base"
            titleClassName="fr-text-label--blue-france"
            titleAs="h2"
            className="fr-mt-3w fr-border-radius--8 fr-border"
            id="informations"
            description={
              <span className="fr-text--sm fr-hint-text fr-mb-0">
                Les champs avec <RedAsterisk /> sont obligatoires.
              </span>
            }
            contentSeparator
          >
            <BaseInformationsEdition
              form={
                form as UseFormReturn<
                  CreateBaseCommand | UpdateBaseInformationsCommand
                >
              }
            />
          </Card>
          <Card
            noBorder
            title="Contacts de la base"
            titleClassName="fr-text-label--blue-france"
            titleAs="h2"
            className="fr-mt-3w fr-border-radius--8 fr-border"
            id="contacts"
            description={
              <span className="fr-text--sm fr-hint-text fr-mb-0">
                Les champs avec <RedAsterisk /> sont obligatoires.
              </span>
            }
            contentSeparator
          >
            <BaseContactsEdition
              form={
                form as UseFormReturn<
                  CreateBaseCommand | UpdateBaseContactsCommand
                >
              }
            />
          </Card>
          <Card
            noBorder
            title="Visibilité de la base"
            titleClassName="fr-text-label--blue-france"
            titleAs="h2"
            className="fr-mt-3w fr-border-radius--8 fr-border"
            id="visibilite"
            description="Choisissez la visibilité de votre base. Vous pourrez modifier sa visibilité à tout moment."
            contentSeparator
          >
            <VisibilityField
              model="base"
              path="isPublic"
              control={control}
              disabled={isLoading}
              publicTitle="Base publique"
              privateTitle="Base privée"
              publicHint="Tout le monde peut vous suivre et visiter votre base pour y retrouver les contenus publics."
              privateHint="Les contenus & informations de votre base sont masqués aux visiteurs."
            />
          </Card>
          <Card
            noBorder
            id="inviter"
            className="fr-border-radius--8 fr-border fr-mt-3w"
            title="Inviter des membres"
            titleClassName="fr-text-label--blue-france"
            titleAs="h2"
            description="Les membres peuvent voir, créer, publier et contribuer à l’ensemble des ressources liées à votre base. Vous pouvez également ajouter des administrateurs qui pourront inviter et gérer les membres de la base."
            contentSeparator
          >
            <Controller
              control={control}
              name="members"
              render={({ field: { onChange }, fieldState: { error } }) => {
                const handleOnChange = (options: SelectOptionValid[]) => {
                  const members = options.map((option) => option.value)
                  form.setValue('members', members)
                  onChange(members)
                }
                return (
                  <InviteUsers
                    disabled={isLoading}
                    label="Ajouter un membre"
                    setEmailsError={setEmailsError}
                    error={error}
                    onChange={handleOnChange}
                    selectedMemberType="member"
                    canAddAdmin={true}
                  />
                )
              }}
            />
          </Card>
          <Card
            noBorder
            className="fr-mt-3w fr-border-radius--8 fr-border"
            id="photos"
            title="Image & couverture"
            titleClassName="fr-text-label--blue-france"
            titleAs="h2"
            description="Ajouter une image et une image de couverture pour rendre votre base identifiable et attirer les visiteurs."
            contentSeparator
          >
            <Controller
              control={control}
              name="imageId"
              render={({ fieldState: { error } }) => (
                <CroppedUpload
                  ratio={1}
                  round="quarter"
                  label="Image de la base"
                  height={128}
                  size={{ w: 384, h: 384 }}
                  modal={addImageCropModal}
                  disabled={isLoading}
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
                  label="Image de couverture"
                  height={522 / 4.8}
                  size={{ w: 2400, h: 500 }}
                  modal={addCoverImageCropModal}
                  onChange={setCoverImage}
                  disabled={isLoading}
                  error={error ? error.message : undefined}
                />
              )}
            />
          </Card>

          <ButtonsGroup
            className="fr-mt-3w"
            buttons={[
              {
                nativeButtonProps: {
                  'data-testid': 'create-button',
                },
                type: 'submit',
                children: 'Créer la base',
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
            title="Annuler la création de la base"
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
                linkProps: { href: `/profils/${user.slug}/bases` },
              },
            ]}
          >
            Êtes-vous sûr de vouloir annuler la création votre base ?
          </CancelModal>
        </div>
      </div>
    </form>
  )
}

export default withTrpc(CreateBase)
