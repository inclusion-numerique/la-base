'use client'

import React from 'react'
import { signOut } from 'next-auth/react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { ConfirmDeleteModal } from '../../ConfirmDeleteModal'
import CustomCard from '../../CustomCard'

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
    <CustomCard id="supprimer" title="Supprimer le profil">
      <p>
        Cette action est irréversible et entraîne la suppression définitive de
        votre profil. Utilisez cette fonction avec précaution.
      </p>
      <Button
        className="fr-btn--danger"
        data-testid="delete-profile-button"
        {...deleteModalNativeButtonProps}
      >
        Supprimer le profil
      </Button>
      <ConfirmDeleteModal
        title="Supprimer le profil"
        message="Êtes-vous sûr de vouloir supprimer votre profil ?"
        description="Toutes les ressources dont vous êtes le seul contributeur et les bases dont vous êtes le seul membre seront également supprimées."
        confirmText="oui"
        isLoading={mutation.isPending}
        Component={DeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDeleteProfile}
      />
    </CustomCard>
  )
}

export default withTrpc(ProfileDeletion)
