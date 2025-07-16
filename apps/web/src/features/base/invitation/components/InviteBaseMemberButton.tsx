'use client'

import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import InviteUsers from '@app/web/features/base/invitation/components/InviteUsers'
import {
  type InviteMemberCommand,
  InviteMemberCommandValidation,
  InviteMemberType,
} from '@app/web/features/base/invitation/db/inviteMember'
import { BasePageData } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './InviteBaseMemberButton.module.css'

const {
  Component: InviteModal,
  buttonProps: inviteModalNativeButtonProps,
  close,
} = createModal({
  id: 'invite-member',
  isOpenedByDefault: false,
})

const InviteBaseMemberButton = ({
  base,
  canAddAdmin,
  className,
}: {
  base: BasePageData
  canAddAdmin: boolean
  className?: string
}) => {
  const form = useForm<InviteMemberCommand>({
    resolver: zodResolver(InviteMemberCommandValidation),
    defaultValues: { baseId: base.id, isAdmin: false, members: [] },
  })

  const [emailErrors, setEmailsError] = useState(false)

  const mutate = trpc.baseMember.invite.useMutation()
  const router = useRouter()

  const onInvit = async (data: InviteMemberCommand) => {
    if (emailErrors) {
      form.setError('members', {
        message:
          'Merci de vérifier la liste des profils que vous souhaitez inviter.',
      })
      return
    }

    try {
      await mutate.mutateAsync(data)
      router.refresh()
      close()
      createToast({
        priority: 'success',
        message: (
          <>
            Un email d’invitation a été envoyé aux profils que vous souhaitez
            inviter
          </>
        ),
      })
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }

  const isLoading = mutate.isSuccess || mutate.isPending
  const handleSelectUserType = (type: string) =>
    form.setValue('isAdmin', type === 'admin')

  const selectedMemberType = form.watch('isAdmin') ? 'admin' : 'member'

  const handleOnChange = (options: SelectOptionValid[]) => {
    const membersWithUuids = options
      .filter((opt) => !opt.value.includes('@'))
      .map((opt) => ({ id: opt.value, type: opt.type as InviteMemberType }))
    const membersWithEmails = options
      .filter((opt) => opt.value.includes('@'))
      .map((opt) => ({ email: opt.value, type: opt.type as InviteMemberType }))
    form.setValue('members', membersWithUuids)
    form.setValue('newMembers', membersWithEmails)
  }

  return (
    <div>
      <Button
        className={className}
        priority="secondary"
        iconId="fr-icon-user-add-line"
        nativeButtonProps={{
          ...inviteModalNativeButtonProps,
          'data-testid': 'base-invite-member-button',
        }}
      >
        Inviter un membre
      </Button>
      <form onSubmit={form.handleSubmit(onInvit)}>
        <InviteModal
          title="Inviter des membres"
          className="fr-modal--overflow-visible"
        >
          <>
            <div className="fr-flex fr-direction-column fr-flex-gap-4v">
              <div>
                Les contributeurs peuvent voir, créer et contribuer à l’ensemble
                des ressources liées à la base ainsi qu’inviter d’autres
                membres. Vous pouvez également inviter des administrateurs qui
                pourront gérer les membres de la base (inviter et retirer des
                membres).
              </div>
              <div className="fr-mb-4w">
                <Link
                  className="fr-link"
                  href="/centre-d-aide/une-base#membre-base"
                >
                  En savoir plus sur les rôles et les permissions ici
                </Link>
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.search}>
                <Controller
                  control={form.control}
                  name="members"
                  render={({ fieldState: { error } }) => (
                    <div className="fr-flex fr-direction-column fr-flex-gap-4v">
                      <InviteUsers
                        disabled={isLoading}
                        label="Ajouter un membre"
                        setEmailsError={setEmailsError}
                        error={error}
                        onChange={handleOnChange}
                        baseId={base.id}
                        handleSelectUserType={handleSelectUserType}
                        selectedMemberType={selectedMemberType}
                        withBadges={false}
                        canAddAdmin={canAddAdmin}
                      />
                      <Button
                        type="submit"
                        nativeButtonProps={{
                          'data-testid': 'invite-member-modal-button',
                        }}
                        {...buttonLoadingClassname(!!isLoading, styles.button)}
                        size="large"
                      >
                        Inviter les membres
                      </Button>
                    </div>
                  )}
                />
              </div>
            </div>
          </>
        </InviteModal>
      </form>
    </div>
  )
}

export default withTrpc(InviteBaseMemberButton)
