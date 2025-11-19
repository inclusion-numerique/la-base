'use client'

import { createToast } from '@app/ui/toast/createToast'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { Resource } from '@app/web/server/resources/getResource'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal, ModalProps } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { useRouter } from 'next/navigation'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-reported-resource',
  isOpenedByDefault: false,
})

export const deleteReportedResourceModalProps = (
  onDelete: () => void,
): ModalProps => ({
  title: 'Supprimer la ressource',
  buttons: [
    {
      title: 'Annuler',
      priority: 'secondary',
      doClosesModal: true,
      children: 'Annuler',
      type: 'button',
    },
    {
      title: 'Supprimer la ressource',
      doClosesModal: true,
      children: 'Supprimer la ressource',
      type: 'submit',
      onClick: onDelete,
      nativeButtonProps: {
        className: 'fr-btn--danger',
      },
    },
  ],
  children: (
    <>
      Confirmez-vous la suppression de la ressource ? Tous les contenus de la
      ressource seront supprimés.
      <Notice
        className="fr-mt-2w"
        title={
          <span>
            En supprimant la ressource, le signalement sera considéré comme
            résolu et un mail automatique sera envoyé au créateur de la
            ressource pour lui notifier la suppression.
          </span>
        }
      />
    </>
  ),
})

const ReportedResourceDeletion = ({
  resource,
  user,
}: {
  resource: Pick<Resource, 'id' | 'title'>
  user: SessionUser | null
}) => {
  const router = useRouter()
  const mutate = trpc.report.deleteResource.useMutation()

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({
        resourceId: resource.id,
        moderatorName:
          (user as SessionUser).name ??
          `${(user as SessionUser).firstName} ${
            (user as SessionUser).lastName
          }`,
        moderatorEmail: (user as SessionUser).email,
      })
      closeDeleteModal()
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            La ressource <strong>{resource.title}</strong> a bien été supprimée
          </>
        ),
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression de la ressource',
      })
      mutate.reset()
    }
  }

  return (
    <>
      <Button
        className="fr-btn--danger"
        data-testid="delete-reported-resource-button"
        {...deleteModalNativeButtonProps}
      >
        Supprimer la ressource
        <span className="ri-delete-bin-6-line fr-ml-1w" />
      </Button>
      <DeleteModal {...deleteReportedResourceModalProps(onDelete)} />
    </>
  )
}

export default withTrpc(ReportedResourceDeletion)
