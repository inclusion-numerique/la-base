'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import InviteUsers from '@app/web/components/InviteUsers'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type InviteMemberCommand,
  InviteMemberCommandValidation,
} from '@app/web/server/baseMembers/inviteMember'
import type { BasePageData } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
    defaultValues: { baseId: base.id, isAdmin: false },
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
      close()
      router.refresh()
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

  const isLoading = mutate.isSuccess || mutate.isSuccess

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
          className={classNames(styles.modal, 'fr-modal--overflow-visible')}
          buttons={[
            {
              iconId: 'fr-icon-user-setting-line',
              children: 'Inviter',
              type: 'submit',
              nativeButtonProps: {
                'data-testid': 'invite-member-modal-button',
              },
              ...buttonLoadingClassname(isLoading),
            },
          ]}
        >
          <>
            <div className="fr-mb-4w">
              Les membres peuvent voir, créer, publier et contribuer à
              l’ensemble des ressources liées à votre base. Vous pouvez
              également ajouter des administrateurs qui pourront inviter et
              gérer les membres de la base.
            </div>
            <div className={styles.actions}>
              <div className={styles.search}>
                <Controller
                  control={form.control}
                  name="members"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <>
                      <InviteUsers
                        label="Ajouter un membre"
                        setEmailsError={setEmailsError}
                        error={error}
                        onChange={onChange}
                        baseId={base.id}
                      />
                      <div
                        className={classNames(styles.select, {
                          [styles.selectWithError]: error,
                        })}
                      >
                        <select
                          data-testid="base-invite-member-role-select"
                          onChange={(event) => {
                            form.setValue(
                              'isAdmin',
                              event.target.value === 'admin',
                            )
                          }}
                        >
                          <option
                            value="member"
                            data-testid="base-invite-member-role-member"
                          >
                            Membre
                          </option>
                          {canAddAdmin && (
                            <option
                              value="admin"
                              data-testid="base-invite-member-role-admin"
                            >
                              Administrateur
                            </option>
                          )}
                        </select>
                      </div>
                    </>
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
