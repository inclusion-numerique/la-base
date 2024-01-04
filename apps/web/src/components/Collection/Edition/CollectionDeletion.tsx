'use client'

import { createToast } from '@app/ui/toast/createToast'
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { ConfirmDeleteModal } from '../../ConfirmDeleteModal'
import CustomCard from '../../CustomCard'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-collection',
  isOpenedByDefault: false,
})

const CollectionDeletion = ({
  collection,
}: {
  collection: CollectionPageData
}) => {
  const router = useRouter()
  const mutate = trpc.collection.delete.useMutation()

  const handleDeleteCollection = async () => {
    closeDeleteModal()
    try {
      await mutate.mutateAsync({ id: collection.id })
      router.refresh()
      router.push(`/profils/${collection.owner.id}/collections`)
      createToast({
        priority: 'success',
        message: (
          <>
            Votre collection <strong>{collection.title}</strong> a bien été
            supprimée
          </>
        ),
      })
    } catch (error) {
      console.error('Could not delete collection', error)
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue pendant la suppression, merci de réessayer ultérieurement',
      })
    }
  }

  return (
    <CustomCard id="supprimer" title="Supprimer la collection">
      <p>
        Cette action est irréversible et entraîne la suppression définitive de
        la collection. Utilisez cette fonction avec précaution.
      </p>
      <Button
        className="fr-btn--danger"
        data-testid="delete-collection-button"
        {...deleteModalNativeButtonProps}
      >
        Supprimer la collection
      </Button>
      <ConfirmDeleteModal
        title="Supprimer la collection"
        message="Êtes-vous sûr de vouloir supprimer votre collection ?"
        description="Cette action est irréversible et entraîne la suppression définitive de
          toutes les ressources de la Collection."
        confirmText={collection.title}
        Component={DeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDeleteCollection}
      />
    </CustomCard>
  )
}

export default withTrpc(CollectionDeletion)
