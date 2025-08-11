'use client'

import EditableCardForm from '@app/web/components/EditableCardForm'
import Visibility from '@app/web/components/Visibility'
import VisibilityField from '@app/web/components/VisibilityField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import {
  type UpdateProfileVisibilityCommand,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { trpc } from '@app/web/trpc'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
        title="Visibilité de votre profil"
        subtitle={
          <span className="fr-text--sm">
            Choisissez ce que les visiteurs peuvent voir sur votre page
            profil.&nbsp;
            <br className="fr-hidden-sm fr-unhidden" />
            <Link
              href="https://docs.numerique.gouv.fr/docs/720a2a25-78ca-4182-9ea5-7db49bd39bd5/"
              className="fr-link fr-text--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              En savoir plus
            </Link>
          </span>
        }
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
