'use client'

import { createToast } from '@app/ui/toast/createToast'
import Card from '@app/web/components/Card'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ConfirmDeleteModal } from '../../ConfirmDeleteModal'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-collection',
  isOpenedByDefault: false,
})

const CollectionDeletionModal = ({
  collection,
}: {
  collection: { id: string; createdBy: { slug: string }; title: string }
}) => {
  const router = useRouter()
  const mutation = trpc.collection.delete.useMutation()

  const handleDeleteCollection = async () => {
    try {
      await mutation.mutateAsync({ id: collection.id })
      router.push(`/profils/${collection.createdBy.slug}/collections`)
      router.refresh()
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
      // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
      console.error('Could not delete collection', error)
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
      id="supprimer"
      title={
        <span className="fr-text-label--blue-france">
          Supprimer la collection
        </span>
      }
      noBorder
      className="fr-border-radius--8 fr-border"
      description={
        <div className="fr-flex fr-direction-column fr-direction-sm-row fr-justify-content-space-between fr-flex-gap-4v">
          Cette action est irréversible et entraîne la suppression définitive de
          la collection.
          <div>
            <Button
              className="fr-btn--danger fr-width-full fr-flex fr-justify-content-center"
              data-testid="delete-collection-button"
              {...deleteModalNativeButtonProps}
            >
              Supprimer
            </Button>
            <ConfirmDeleteModal
              title="Supprimer la collection"
              message="Êtes-vous sûr de vouloir supprimer votre collection ?"
              description="Cette action est irréversible et entraîne la suppression définitive de
          toutes les ressources de la Collection."
              confirmText={collection.title}
              isLoading={mutation.isPending}
              Component={DeleteModal}
              onClose={closeDeleteModal}
              onDelete={handleDeleteCollection}
            />
          </div>
        </div>
      }
    />
  )
}

export default withTrpc(CollectionDeletionModal)
