'use client'

import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BasePageData } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import { createModal, ModalProps } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const createBaseJoinRequestModalProps = (
  baseName: string,
  onJoinRequest: () => void,
): ModalProps => ({
  title: `Demander à rejoindre la base ${baseName}`,
  buttons: [
    {
      title: 'Annuler',
      priority: 'secondary',
      doClosesModal: true,
      children: 'Annuler',
      type: 'button',
    },
    {
      title: 'Demander à rejoindre la base',
      doClosesModal: true,
      children: 'Demander à rejoindre la base',
      type: 'submit',
      onClick: onJoinRequest,
    },
  ],
  children: (
    <div className="fr-flex fr-direction-column fr-flex-gap-8v fr-text--left fr-mt-4w">
      <Notice title="Le ou les administrateurs de cette base seront informés par email de votre demande. Vous devrez attendre que votre demande soit acceptée avant de pouvoir contribuer à cette base." />
      <div>
        <p className="fr-mb-0 fr-text--uppercase fr-text--xs fr-text-default--grey fr-text--bold">
          En rejoignant cette base, vous pourrez&nbsp;:
        </p>
        <ul>
          <li>Créer & publier des ressources via cette base</li>
          <li>Contribuer aux ressources publiés sur cette base</li>
          <li>Voir les ressources privées</li>
          <li>Inviter d&apos;autres membres</li>
        </ul>
      </div>
    </div>
  ),
})

export const baseJoinRequestModalId = 'base-join-request-modal'

export const BaseJoinRequestDynamicModal = createModal({
  id: baseJoinRequestModalId,
  isOpenedByDefault: false,
})

const BaseJoinRequestFormModal = ({
  user,
  base,
}: {
  user: SessionUser | null
  base: BasePageData
}) => {
  const router = useRouter()
  const askToJoinMutation = trpc.baseJoinRequest.askToJoin.useMutation()

  const joinRequestIsInSearchParams =
    typeof useSearchParams()?.get('rejoindre-une-base') === 'string'

  const modalIsBound = useDsfrModalIsBound(baseJoinRequestModalId)

  useEffect(() => {
    if (joinRequestIsInSearchParams && modalIsBound && user) {
      BaseJoinRequestDynamicModal.open()
    }
  }, [joinRequestIsInSearchParams, modalIsBound, user])

  const onModalClose = () => {
    // Remove query parameter when modal is closed
    const url = new URL(window.location.href)
    url.searchParams.delete('rejoindre-une-base')
    router.replace(url.pathname + url.search)
  }

  useModalVisibility(baseJoinRequestModalId, {
    onClosed: onModalClose,
  })

  const handleJoinRequest = async () => {
    try {
      await askToJoinMutation.mutateAsync({ baseId: base.id })
      router.push(`/bases/${base.slug}/membres`)
      router.refresh()
      BaseJoinRequestDynamicModal.close()
      createToast({
        priority: 'success',
        message: `Votre demande pour rejoindre la base ${base.title} a bien été envoyée`,
      })
    } catch {
      createToast({
        priority: 'error',
        message: "Une erreur est survenue lors de l'envoi de votre demande",
      })
    }
  }

  // Don't render modal if user is not logged in
  if (!user) {
    return null
  }

  return (
    <BaseJoinRequestDynamicModal.Component
      {...createBaseJoinRequestModalProps(base.title, handleJoinRequest)}
      className="join-request-modal"
    />
  )
}

export default withTrpc(BaseJoinRequestFormModal)
