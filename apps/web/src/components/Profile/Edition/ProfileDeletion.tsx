'use client'

import { createToast } from '@app/ui/toast/createToast'
import Card from '@app/web/components/Card'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { signOut } from 'next-auth/react'
import React from 'react'
import { ConfirmDeleteModal } from '../../ConfirmDeleteModal'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-profile',
  isOpenedByDefault: false,
})

const ProfileDeletion = ({ userId }: { userId: string }) => {
  const mutation = trpc.profile.delete.useMutation()

  const handleDeleteProfile = async () => {
    try {
      await mutation.mutateAsync({ userId })
      await signOut({ redirect: true, callbackUrl: '/profil-supprime' })
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
      console.error('Could not delete profile', error)
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue pendant la suppression, merci de réessayer ultérieurement',
      })
    } finally {
      closeDeleteModal()
    }
  }

  return (
    <Card
      noBorder
      id="supprimer"
      className="fr-border-radius--8 fr-border"
      title={
        <span className="fr-text-label--blue-france">
          Supprimer votre profil
        </span>
      }
      description={
        <div className="fr-flex fr-direction-column fr-direction-sm-row fr-justify-content-space-between fr-flex-gap-4v">
          Cette action est irréversible et entraîne la suppression définitive de
          votre profil et de toutes vos ressources.
          <div>
            <Button
              className="fr-btn--danger fr-width-full fr-flex fr-justify-content-center"
              data-testid="delete-profile-button"
              {...deleteModalNativeButtonProps}
            >
              Supprimer
            </Button>
            <ConfirmDeleteModal
              title="Supprimer votre profil"
              message="Êtes-vous sûr de vouloir supprimer votre profil ?"
              description="Toutes les ressources dont vous êtes le seul contributeur et les bases dont vous êtes le seul membre seront également supprimées."
              confirmText="oui"
              isLoading={mutation.isPending}
              Component={DeleteModal}
              onClose={closeDeleteModal}
              onDelete={handleDeleteProfile}
            />
          </div>
        </div>
      }
    />
  )
}

export default withTrpc(ProfileDeletion)
