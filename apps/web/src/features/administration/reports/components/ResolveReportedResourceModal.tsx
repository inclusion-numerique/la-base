'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal, ModalProps } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'

export const resolveReportedResourceModalProps = (
  onResolve: () => void,
): ModalProps => ({
  title: 'Signalement résolu',
  buttons: [
    {
      title: 'Annuler',
      priority: 'secondary',
      doClosesModal: true,
      children: 'Annuler',
      type: 'button',
    },
    {
      title: 'Signalement résolu',
      doClosesModal: true,
      children: 'Signalement résolu',
      type: 'submit',
      onClick: onResolve,
    },
  ],
  children: (
    <>
      Confirmez-vous que le signalement a bien été pris en compte et que vous
      avez réalisé les actions nécessaires ?
    </>
  ),
})

const ResolveReportedResourceModal = ({ reportId }: { reportId: string }) => {
  const {
    Component: ResolveModal,
    close: closeResolveModal,
    buttonProps: resolveModalNativeButtonProps,
  } = createModal({
    id: `resolve-reported-resource-${reportId}`,
    isOpenedByDefault: false,
  })
  const router = useRouter()
  const mutate = trpc.report.resolveReport.useMutation()

  const onResolve = async () => {
    try {
      await mutate.mutateAsync({
        reportId,
      })
      closeResolveModal()
      router.refresh()
      createToast({
        priority: 'success',
        message: 'Le signalement a bien été marqué comme résolu',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la résolution du signalement',
      })
      mutate.reset()
    }
  }

  return (
    <>
      <Button
        data-testid="resolve-reported-resource-button"
        {...resolveModalNativeButtonProps}
      >
        Signalement résolu
        <span className="ri-check-line fr-ml-1w" />
      </Button>
      <ResolveModal {...resolveReportedResourceModalProps(onResolve)} />
    </>
  )
}

export default withTrpc(ResolveReportedResourceModal)
