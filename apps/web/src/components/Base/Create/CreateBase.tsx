'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { departmentsOptions } from '@app/web/utils/departments'
import { trpc } from '@app/web/trpc'
import {
  CreateBaseCommand,
  CreateBaseCommandValidation,
} from '@app/web/server/rpc/base/createBase'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import { PrivacyTag } from '@app/web/components/PrivacyTags'
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
          <h1>Créer une base</h1>
          <div
            className={classNames('fr-mt-3w', styles.card)}
            id="informations"
          >
            <h5 className="fr-mb-1w">Informations de la base</h5>
            <p className="fr-text--sm fr-hint-text fr-mb-0">
              Les champs avec <RedAsterisk /> sont obligatoires.
            </p>
            <hr className="fr-mt-4w fr-pb-4w" />
            <InputFormField
              data-testid="base-title-input"
              control={control}
              path="title"
              label="Nom de la base "
              disabled={isSubmitting}
              asterisk
            />
            <SelectFormField
              control={control}
              path="department"
              label="Département"
              options={[
                {
                  name: 'Selectionner une option',
                  value: '',
                  disabled: true,
                },
                ...departmentsOptions,
              ]}
            />
            <RichInputFormField
              label="Description"
              hint="Text de description additionnel"
              form={form}
              path="description"
            />
          </div>

          <div className={classNames('fr-mt-3w', styles.card)} id="contacts">
            <h5 className="fr-mb-1w">Contacts</h5>
            <p className="fr-text--sm fr-hint-text fr-mb-0">
              Les champs avec <RedAsterisk /> sont obligatoires.
            </p>
            <hr className="fr-mt-4w fr-pb-4w" />
            <InputFormField
              className="fr-mb-3v"
              data-testid="base-email-input"
              control={control}
              path="email"
              label="Adresse e-mail"
              disabled={isSubmitting}
              asterisk
            />
            <div className="fr-input-group">
              <CheckboxFormField
                control={control}
                path="emailIsPublic"
                label="Rendre publique cette information"
                disabled={isSubmitting}
              />
            </div>
            <InputFormField
              control={control}
              path="website"
              label="Site internet"
              disabled={isSubmitting}
            />
            <InputFormField
              control={control}
              path="facebook"
              label="Facebook"
              disabled={isSubmitting}
            />
            <InputFormField
              control={control}
              path="twitter"
              label="Twitter"
              disabled={isSubmitting}
            />
            <InputFormField
              control={control}
              path="linkedin"
              label="LinkedIn"
              disabled={isSubmitting}
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
