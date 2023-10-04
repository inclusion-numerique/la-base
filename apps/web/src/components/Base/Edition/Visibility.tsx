'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import { BasePrivacyTag, PrivacyTag } from '@app/web/components/PrivacyTags'
import EditCard from '@app/web/components/EditCard'
import {
  UpdateBaseVisibilityCommand,
  UpdateBaseVisibilityCommandValidation,
} from '@app/web/server/bases/updateBase'
import { BasePageData } from '@app/web/server/bases/getBase'

const Visibility = ({ base }: { base: BasePageData }) => {
  const form = useForm<UpdateBaseVisibilityCommand>({
    resolver: zodResolver(UpdateBaseVisibilityCommandValidation),
    defaultValues: {
      isPublic: base.isPublic,
    },
  })
  const mutate = trpc.base.mutate.useMutation()

  return (
    <EditCard
      id="visibilite"
      mutation={async (data) => {
        await mutate.mutateAsync({ id: base.id, data })
      }}
      className="fr-mt-3w"
      title="Visibilité de la base"
      description="Choisissez la visibilité de votre base."
      form={form}
      edition={
        <Controller
          control={form.control}
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
                <div className="fr-mr-1w">
                  Base publique
                  <p className="fr-text--xs fr-hint-text fr-mb-0">
                    Visible par tous les visiteurs.
                  </p>
                </div>
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
                <div className="fr-mr-1w">
                  Base privée
                  <p className="fr-text--xs fr-hint-text fr-mb-0">
                    Accessible uniquement aux membres et aux administrateurs que
                    vous inviterez.
                  </p>
                </div>
                <PrivacyTag />
              </ResourceBaseRichRadioElement>
              {error && <p className="fr-error-text">{error.message}</p>}
            </fieldset>
          )}
        />
      }
      view={
        <>
          <p className="fr-text--sm" data-testid="base-visibility">
            {base.isPublic
              ? 'Votre base est publique. Vous pouvez passez votre base en privée si vous le souhaitez.'
              : 'Votre base est privée. Vous pouvez passez votre base en publique si vous le souhaitez.'}
          </p>
          <BasePrivacyTag isPublic={base.isPublic} />
        </>
      }
    />
  )
}

export default withTrpc(Visibility)
