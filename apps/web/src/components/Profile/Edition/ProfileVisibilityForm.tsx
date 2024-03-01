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
import VisibilityField from '@app/web/components/VisibilityField'
import Visibility from '@app/web/components/Visibility'

const {
  Component: PrivateModal,
  open: openPrivateModal,
  close: closePrivateModal,
} = createModal({
  id: 'profile-private-visibility',
  isOpenedByDefault: false,
})

const visibilityTexts = {
  publicTitle: 'Profil public',
  privateTitle: 'Profil privé',
  publicHint:
    'Tout le monde peut vous suivre et visiter votre page profil pour y retrouver vos contenus publics.',
  privateHint:
    'Les contenus & informations de votre page profil sont masqués aux visiteurs.',
}

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
  const mutate = trpc.profile.updateVisibility.useMutation()
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
          <Visibility isPublic={profile.isPublic} {...visibilityTexts} />
        }
        editing={
          <VisibilityField
            model="profile"
            path="isPublic"
            control={form.control}
            disabled={isLoading}
            {...visibilityTexts}
          />
        }
      />
    </>
  )
}

export default withTrpc(ProfileVisibilityForm)
