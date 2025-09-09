'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { BaseMember, BasePageData } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { useRouter } from 'next/navigation'

const RemoveBaseMemberButton = ({
  member,
  base,
}: {
  member: BaseMember
  base: BasePageData
}) => {
  const {
    Component: RemoveModal,
    buttonProps: removeModalNativeButtonProps,
    close,
  } = createModal({
    id: `remove-member-${member.member.id}`,
    isOpenedByDefault: false,
  })
  const mutate = trpc.baseMember.remove.useMutation()
  const router = useRouter()

  const onRemove = async () => {
    try {
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
      })
      router.refresh()
      createToast({
        priority: 'success',
        message: <>Le membre a bien été retiré</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lorsque vous avez retiré le membre de la base, merci de réessayer ultérieurement',
      })
    }
  }
  if (!member.accepted) {
    return (
      <Button
        priority="tertiary no outline"
        title="Retirer le membre de la base"
        data-testid="remove-member-button"
        size="small"
        onClick={onRemove}
      >
        Retirer
        <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
      </Button>
    )
  }

  const memberName = `${member.member.firstName} ${member.member.lastName}`

  return (
    <div>
      <Button
        priority="tertiary no outline"
        title="Retirer le membre de la base"
        data-testid="remove-member-button"
        size="small"
        nativeButtonProps={removeModalNativeButtonProps}
      >
        Retirer
        <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
      </Button>
      <RemoveModal
        title={`Retirer ${memberName} de la base`}
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            onClick: close,
          },
          {
            children: 'Retirer de la base',
            priority: 'primary',
            onClick: onRemove,
          },
        ]}
      >
        <div className="fr-flex fr-flex-gap-8v fr-direction-column">
          <span>
            Êtes-vous sûr de vouloir retirer {memberName} des membres de la
            base&nbsp;
            {base.title}?
          </span>
          <Notice
            className="fr-notice--warning"
            title={
              <span className="fr-text--regular fr-text-label--grey">
                <span className="fr-text--bold">{memberName}</span>
                &nbsp;ne pourra plus contribuer à la base&nbsp;
                <span className="fr-text--bold fr-text-label--grey">
                  {base.title}
                </span>
                &nbsp;et à toutes les ressources qui y sont rattachées, y
                compris les ressources qu'il a créé et publié sur cette base.
              </span>
            }
          />
        </div>
      </RemoveModal>
    </div>
  )
}

export default withTrpc(RemoveBaseMemberButton)
