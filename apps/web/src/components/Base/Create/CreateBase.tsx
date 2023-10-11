'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Controller, UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
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
  UpdateBaseVisibilityCommand,
} from '@app/web/server/bases/updateBase'
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

  const mutate = trpc.base.create.useMutation()
  const onSubmit = async (data: CreateBaseCommand) => {
    if (emailErrors) {
      form.setError('members', {
        message:
          'Merci de vérifier la liste des profils que vous souhaitez inviter.',
      })
      return
    }

    try {
      const base = await mutate.mutateAsync(data)
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
              control={
                (
                  form as UseFormReturn<
                    CreateBaseCommand | UpdateBaseVisibilityCommand
                  >
                ).control
              }
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
                  label="Ajouter un membre"
                  setEmailsError={setEmailsError}
                  error={error}
                  onChange={onChange}
                />
              )}
            />
          </Card>

          <Card
            className="fr-mt-3w wip"
            id="photos"
            title="Photo de profil & couverture"
            description="Ajouter une image de profil & une image de couverture pour vous rendre identifiable et attirer les visiteurs."
          >
            TODO
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
