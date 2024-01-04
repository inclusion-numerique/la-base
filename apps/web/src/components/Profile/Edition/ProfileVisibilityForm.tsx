'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  UpdateProfileVisibilityCommand,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import EditableCardForm from '@app/web/components/EditableCardForm'
import CustomTag, { TagColor } from '@app/web/components/CustomTag'
import VisibilityField from '@app/web/components/VisibilityField'

const {
  Component: PrivateModal,
  open: openPrivateModal,
  close: closePrivateModal,
} = createModal({
  id: 'profile-private-visibility',
  isOpenedByDefault: false,
})

const ProfileVisibilityForm = ({
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
  const isLoading = form.formState.isSubmitting || mutate.isPending
  const hasPublicResources = resources.some((resource) => resource.isPublic)

  const handleSave = async (data: UpdateProfileVisibilityCommand) => {
    if (data.isPublic || !hasPublicResources) {
      await mutate.mutateAsync(data)
      router.refresh()
    } else {
      setVisibility(data)
      openPrivateModal()
    }
  }

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
              disabled: mutate.isPending,
              type: 'button',
            },
            {
              title: 'Continuer',
              children: 'Continuer',
              type: 'button',
              disabled: mutate.isPending,
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
      <EditableCardForm
        id="visibilite"
        title="Visibilité du profil"
        subtitle="Choisissez la visibilité du profil."
        form={form}
        onSave={handleSave}
        preview={
          profile.isPublic ? (
            <>
              <p>
                Votre profil est public. Vous pouvez passez votre profil en
                privé si vous le souhaitez.
              </p>
              <CustomTag
                color={TagColor.GREEN}
                icon="fr-icon-earth-fill"
                label="Profil publique"
              />
            </>
          ) : (
            <>
              <p>
                Votre profil est privé. Vous pouvez passez votre profil en
                publique si vous le souhaitez.
              </p>
              <CustomTag
                color={TagColor.GREY}
                icon="fr-icon-lock-line"
                label="Profil privé"
              />
            </>
          )
        }
        editing={
          <VisibilityField
            model="profil"
            control={form.control}
            disabled={isLoading}
            publicTitle="Profil publique"
            privateTitle="Profil privé"
            privateHint="Votre profil n'est pas visible."
          />
        }
      />
    </>
  )
}

export default withTrpc(ProfileVisibilityForm)
