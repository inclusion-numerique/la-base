'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import { PrivacyTag, ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import EditCard from '@app/web/components/EditCard'
import {
  UpdateProfileVisibilityCommand,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'

const {
  Component: PrivateModal,
  open: openPrivateModal,
  close: closePrivateModal,
} = createModal({
  id: 'private',
  isOpenedByDefault: false,
})

const Visibility = ({
  profile,
  resources,
}: {
  profile: ProfilePageData
  resources: ResourceListItem[]
}) => {
  const router = useRouter()
  const [visibility, setVisibility] = useState<UpdateProfileVisibilityCommand>({
    isPublic: profile.isPublic,
  })

  const form = useForm<UpdateProfileVisibilityCommand>({
    resolver: zodResolver(UpdateProfileVisibilityCommandValidation),
    defaultValues: {
      isPublic: profile.isPublic,
    },
  })
  const mutate = trpc.profile.mutate.useMutation()
  const hasPublicResources = resources.some((resource) => resource.isPublic)

  return (
    <>
      {hasPublicResources && (
        <PrivateModal
          title={
            <>
              <span className="fr-icon-arrow-right-line" /> Rendre privé mon
              profil
            </>
          }
          buttons={[
            {
              title: 'Annuler',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Annuler',
              disabled: mutate.isLoading,
              type: 'button',
            },
            {
              title: 'Continuer',
              children: 'Continuer',
              type: 'button',
              disabled: mutate.isLoading,
              nativeButtonProps: {
                'data-testid': 'visibility-modal-continue-button',
              },
              onClick: async () => {
                await mutate.mutateAsync(visibility)
                router.refresh()
                closePrivateModal()
              },
            },
          ]}
        >
          Votre compte et l’ensemble de vos ressources et collections publiques
          seront également privés et ne seront plus visible du public, mis à
          part des éventuels contributeurs invités sur vos ressources.
        </PrivateModal>
      )}
      <EditCard
        mutation={async (data) => {
          if (data.isPublic || !hasPublicResources) {
            await mutate.mutateAsync(data)
            router.refresh()
          } else {
            setVisibility(data)
            openPrivateModal()
          }
        }}
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
                    <p className="fr-text--xs fr-hint-text fr-mb-0">
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
                    <p className="fr-text--xs fr-hint-text fr-mb-0">
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
            <p className="fr-text--sm" data-testid="profile-visibility">
              {profile.isPublic
                ? 'Votre profil est public. Vous pouvez passez votre profil en privé si vous le souhaitez.'
                : 'Votre profil est privé. Vous pouvez passez votre profil en public si vous le souhaitez.'}
            </p>
            <ProfilePrivacyTag isPublic={profile.isPublic} />
          </>
        }
      />
    </>
  )
}

export default withTrpc(Visibility)
