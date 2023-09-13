'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Controller, UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import {
  CreateBaseCommand,
  CreateBaseCommandValidation,
} from '@app/web/server/bases/createBase'
import { PrivacyTag } from '@app/web/components/PrivacyTags'
import {
  UpdateBaseContactsCommand,
  UpdateBaseInformationsCommand,
} from '@app/web/server/bases/updateBase'
import BaseInformationsEdition from '../BaseInformationsEdition'
import BaseContactsEdition from '../BaseContactsEdition'
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
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form
  const mutate = trpc.base.create.useMutation()
  const onSubmit = async (data: CreateBaseCommand) => {
    try {
      const base = await mutate.mutateAsync(data)
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
          <div
            className={classNames('fr-mt-3w', styles.card)}
            id="informations"
          >
            <h5 className="fr-mb-1w">Informations de la base</h5>
            <p className="fr-text--sm fr-hint-text fr-mb-0">
              Les champs avec <RedAsterisk /> sont obligatoires.
            </p>
            <hr className="fr-mt-4w fr-pb-4w" />
            <BaseInformationsEdition
              form={
                form as UseFormReturn<
                  CreateBaseCommand | UpdateBaseInformationsCommand
                >
              }
            />
          </div>

          <div className={classNames('fr-mt-3w', styles.card)} id="contacts">
            <h5 className="fr-mb-1w">Contacts</h5>
            <p className="fr-text--sm fr-hint-text fr-mb-0">
              Les champs avec <RedAsterisk /> sont obligatoires.
            </p>
            <hr className="fr-mt-4w fr-pb-4w" />
            <BaseContactsEdition
              form={
                form as UseFormReturn<
                  CreateBaseCommand | UpdateBaseContactsCommand
                >
              }
            />
          </div>

          <div className={classNames('fr-mt-3w', styles.card)} id="visibilite">
            <h5 className="fr-mb-1w">Visibilité de la base</h5>
            Choisissez la visibilité de votre base. Vous pourrez modifier sa
            visibilité à tout moment.
            <hr className="fr-mt-4w fr-pb-4w" />
            <Controller
              control={control}
              name="isPublic"
              render={({
                field: { onChange, name, value },
                fieldState: { error },
              }) => (
                <fieldset
                  className="fr-fieldset"
                  id="radio-rich"
                  aria-labelledby="radio-rich-legend radio-rich-messages"
                >
                  <ResourceBaseRichRadioElement
                    id="radio-base-public"
                    data-testid="visibility-radio-base-public"
                    name={name}
                    value={
                      value === undefined || value === null
                        ? null
                        : value.toString()
                    }
                    radioValue="true"
                    onChange={() => {
                      onChange(true)
                    }}
                  >
                    <span className="fr-mr-1w">Base publique</span>
                    <PrivacyTag isPublic />
                  </ResourceBaseRichRadioElement>
                  <ResourceBaseRichRadioElement
                    id="radio-base-private"
                    data-testid="visibility-radio-base-private"
                    name={name}
                    value={
                      value === undefined || value === null
                        ? null
                        : value.toString()
                    }
                    radioValue="false"
                    onChange={() => {
                      onChange(false)
                    }}
                  >
                    <span className="fr-mr-1w">Base privée</span>
                    <PrivacyTag />
                  </ResourceBaseRichRadioElement>
                  {error && (
                    <p
                      className="fr-error-text"
                      id="input-form-field__isPublic__error"
                    >
                      {error.message}
                    </p>
                  )}
                </fieldset>
              )}
            />
          </div>

          <div
            className={classNames('fr-mt-3w', 'wip', styles.card)}
            id="inviter"
          >
            <h5 className="fr-mb-1w">Inviter des memebres</h5>
            Les membres peuvent voir, créer, publier et contribuer à l’ensemble
            des ressources liées à votre base. Vous pouvez également ajouter des
            administrateurs qui pourront inviter et gérer les membres de la
            base.
            <hr className="fr-mt-4w fr-pb-4w" />
          </div>

          <div
            className={classNames('fr-mt-3w', 'wip', styles.card)}
            id="photos"
          >
            <h5 className="fr-mb-1w">Photo de profil & couverture</h5>
            Ajouter une image de profil & une image de couverture pour vous
            rendre identifiable et attirer les visiteurs.
            <hr className="fr-mt-4w fr-pb-4w" />
          </div>
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
