'use client'

import { createToast } from '@app/ui/toast/createToast'
import type { UserDetailsPageContext } from '@app/web/app/administration/utilisateurs/[id]/getUserDetailsPageContext'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Notice } from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const DeleteUserConfirm = createModal({
  id: 'delete-user',
  isOpenedByDefault: false,
})

const DeleteUserButton = ({
  userId,
  confirmText = 'oui',
  bases,
}: {
  userId: string
  confirmText?: string
  bases: UserDetailsPageContext['bases']
}) => {
  const [validationInput, setValidationInput] = useState('')
  const isUniqueMember = bases.find((base) => base._count.members === 1)

  const mutation = trpc.profile.delete.useMutation()
  const router = useRouter()

  const onClick = async () => {
    try {
      await mutation.mutateAsync({ userId })

      createToast({
        priority: 'success',
        message: 'Profil supprimé',
      })
      router.push('/administration/utilisateurs')
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la suppression du profil',
      })
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess
  const noticeTitle = isUniqueMember
    ? 'Ce profil est le seul membre de certaines de ses bases. En supprimant ce profil, toutes ses bases, tous ses contenus ainsi que les bases où il est seul contributeur seront supprimées.'
    : 'En supprimant ce profil, toutes ses bases et tous ses contenus seront supprimées.'
  return (
    <>
      <Button
        iconId="fr-icon-delete-line"
        className="fr-btn--danger"
        disabled={isLoading}
        size="small"
        type="button"
        onClick={DeleteUserConfirm.open}
      >
        Supprimer
      </Button>
      <DeleteUserConfirm.Component
        title="Supprimer ce profil ainsi que ses bases et ses ressources ?"
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
            disabled: isLoading,
          },
          {
            title: 'Supprimer',
            doClosesModal: false,
            children: 'Supprimer',
            disabled: validationInput !== confirmText,
            type: 'button',
            onClick,
            nativeButtonProps: {
              className: classNames(
                'fr-btn--danger',
                isLoading && 'fr-btn--loading',
              ),
            },
          },
        ]}
      >
        <Notice className="fr-my-6v fr-notice--warning" title={noticeTitle} />

        <Input
          label={`Écrivez “${confirmText}” dans le champ ci-dessous pour supprimer ce profil.`}
          nativeInputProps={{
            // @ts-ignore: wrong dsfr type
            'data-testid': 'modal-input',
            onChange: (event) => {
              setValidationInput(event.target.value)
            },
          }}
        />
      </DeleteUserConfirm.Component>
    </>
  )
}

export default withTrpc(DeleteUserButton)
