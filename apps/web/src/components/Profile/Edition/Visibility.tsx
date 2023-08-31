'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateProfileVisibilityCommand,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import { PrivacyTag, ProfilePrivacyTag } from '../../PrivacyTags'
import EditCard from './EditCard'

const Visibility = ({ isPublic }: { isPublic: boolean }) => {
  const form = useForm<UpdateProfileVisibilityCommand>({
    resolver: zodResolver(UpdateProfileVisibilityCommandValidation),
    defaultValues: {
      isPublic,
    },
  })

  return (
    <EditCard
      className="fr-mt-3w"
      title="Visibilité du profil"
      description="Choisissez la visibilité de votre profil."
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
                id="radio-profile-public"
                data-testid="visibility-radio-profile-public"
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
                  Profil public
                  <p className="fr-text--sm fr-mb-0">
                    Visible par tous les visiteurs.
                  </p>
                </div>
                <PrivacyTag isPublic />
              </ResourceBaseRichRadioElement>
              <ResourceBaseRichRadioElement
                id="radio-profile-private"
                data-testid="visibility-radio-profile-private"
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
                  Profil privé
                  <p className="fr-text--sm fr-mb-0">
                    Votre profil n’est pas visible.
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
          <p className="fr-text--sm">
            {isPublic
              ? 'Votre profil est public. Vous pouvez passez votre profil en privé si vous le souhaitez.'
              : 'Votre profil est privé. Vous pouvez passez votre profil en public si vous le souhaitez.'}
          </p>
          <ProfilePrivacyTag isPublic={isPublic} />
        </>
      }
    />
  )
}

export default Visibility
