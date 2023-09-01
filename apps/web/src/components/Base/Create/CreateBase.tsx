'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputForm from '@app/ui/components/Form/RichInputForm'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  CreateBaseCommand,
  CreateBaseCommandValidation,
} from '@app/web/server/rpc/base/createBase'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import { PrivacyTag } from '@app/web/components/PrivacyTags'
import BaseSideMenu from './SideMenu'
import styles from './CreateBase.module.css'

const CreateBase = () => {
  const router = useRouter()
  const form = useForm<CreateBaseCommand>({
    resolver: zodResolver(CreateBaseCommandValidation),
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
    <div className={styles.container}>
      <BaseSideMenu />
      <div>
        <h1>Créer une base</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames('fr-mt-3w', styles.card)}>
            <h5 className="fr-mb-1w">Informations de la base</h5>
            <p className="fr-text--sm fr-hint-text fr-mb-0">
              Les champs avec <span className={styles.red}>*</span> sont
              obligatoires.
            </p>
            <hr className="fr-mt-4w fr-pb-4w" />
            <InputFormField
              control={control}
              path="title"
              label="Nom de la base "
              disabled={isSubmitting}
              asterisk
            />
            <RichInputForm
              label="Description"
              hint="Text de description additionnel"
              form={form}
              path="description"
              id="base-description-input"
            />
          </div>

          <div className={classNames('fr-mt-3w', styles.card)}>
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
                  {error && <p className="fr-error-text">{error.message}</p>}
                </fieldset>
              )}
            />
          </div>
          <Button
            type="submit"
            className={classNames(
              'fr-mt-4w',
              isSubmitting && 'fr-btn--loading',
            )}
          >
            Créer
          </Button>
        </form>
      </div>
    </div>
  )
}

export default withTrpc(CreateBase)
