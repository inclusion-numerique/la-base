'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { BasePageData } from '@app/web/server/bases/getBase'
import {
  InviteMemberCommand,
  InviteMemberCommandValidation,
} from '@app/web/server/baseMembers/inviteMember'
import MultipleSearchableSelect from '../../MultipleSearchableSelect'
import InviteMemberCard from './InviteMemberCard'
import styles from './InviteMemberButton.module.css'

const {
  Component: InviteModal,
  buttonProps: inviteModalNativeButtonProps,
  close,
} = createModal({
  id: 'invite',
  isOpenedByDefault: false,
})

const InviteMemberButton = ({ base }: { base: BasePageData }) => {
  const form = useForm<InviteMemberCommand>({
    resolver: zodResolver(InviteMemberCommandValidation),
    defaultValues: { baseId: base.id, isAdmin: false },
  })

  const [filter, setFilter] = useState('')
  const [emailErrors, setEmailsError] = useState(false)

  // TODO : debounce
  const { data: members } = trpc.profile.getMatchingUsers.useQuery({
    filter,
    baseId: base.id,
  })

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
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }

  return (
    <>
      <Button
        priority="secondary"
        iconId="fr-icon-user-add-line"
        nativeButtonProps={{
          ...inviteModalNativeButtonProps,
          'data-testid': 'base-invite-member-button',
        }}
      >
        Inviter un membre
      </Button>
      <InviteModal title="Inviter des membres" className={styles.modal}>
        <>
          <div className="fr-mb-4w">
            Les membres peuvent voir, créer, publier et contribuer à l’ensemble
            des ressources liées à votre base. Vous pouvez également ajouter des
            administrateurs qui pourront inviter et gérer les membres de la
            base.
          </div>
          <form
            className={styles.actions}
            onSubmit={form.handleSubmit(onInvit)}
          >
            <div className={styles.search}>
              <Controller
                control={form.control}
                name="members"
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <>
                    <MultipleSearchableSelect
                      data-testid="base-invite-member-modal-input"
                      label="Ajouter un membre"
                      placeholder="Adresse email, nom de profil"
                      setSelecteds={(selections) => {
                        setEmailsError(
                          selections.some((selection) => selection.invalid),
                        )
                        onChange(selections.map((selection) => selection.value))
                      }}
                      filter={() => true}
                      setInput={setFilter}
                      options={
                        members
                          ? members.map((user) => ({
                              name: user.email,
                              value: user.id,
                              component: <InviteMemberCard member={user} />,
                            }))
                          : []
                      }
                    />
                    {error?.message && (
                      <p className="fr-error-text">{error.message}</p>
                    )}
                    <div
                      className={classNames(styles.select, {
                        [styles.selectWithError]: error,
                      })}
                    >
                      <select
                        onChange={(event) => {
                          form.setValue(
                            'isAdmin',
                            event.target.value === 'admin',
                          )
                        }}
                      >
                        <option value="member">Membre</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                  </>
                )}
              />
            </div>
            <Button
              className={classNames('fr-mt-5w', {
                'fr-btn--loading': form.formState.isSubmitting,
              })}
              type="submit"
              nativeButtonProps={{
                'data-testid': 'base-invite-member-modal-button',
              }}
            >
              Inviter
            </Button>
          </form>
        </>
      </InviteModal>
    </>
  )
}

export default withTrpc(InviteMemberButton)