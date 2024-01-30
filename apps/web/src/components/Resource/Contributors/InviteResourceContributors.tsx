'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  InviteContributorCommand,
  InviteContributorCommandValidation,
} from '@app/web/server/resourceContributors/inviteContributors'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import InviteUsers from '../../InviteUsers'
import styles from './InviteResourceContributors.module.css'

const InviteResourceContributors = ({
  resource,
  onSuccess,
}: {
  resource: Resource | ResourceProjectionWithContext
  onSuccess?: () => void
}) => {
  const router = useRouter()
  const form = useForm<InviteContributorCommand>({
    resolver: zodResolver(InviteContributorCommandValidation),
    defaultValues: { resourceId: resource.id },
  })

  const [emailErrors, setEmailsError] = useState(false)

  const deleteMutate = trpc.resourceContributor.delete.useMutation()
  const invitationMutate = trpc.resourceContributor.invite.useMutation()

  const { data: contributors, refetch } =
    trpc.resourceContributor.getContributors.useQuery({
      resourceId: resource.id,
    })

  const onDelete = async (contributorId: string) => {
    try {
      await deleteMutate.mutateAsync({ resourceId: resource.id, contributorId })
      router.refresh()
      await refetch()
    } catch {
      console.error('Something went wrong')
    }
  }

  const onInvit = async (data: InviteContributorCommand) => {
    if (emailErrors) {
      form.setError('contributors', {
        message:
          'Merci de vérifier la liste des profils que vous souhaitez inviter.',
      })
      return
    }
    try {
      await invitationMutate.mutateAsync(data)
      await refetch()
      if (onSuccess) {
        onSuccess()
      }
      createToast({
        priority: 'success',
        message: (
          <>
            Un email d’invitation à été envoyé aux profils que vous souhaitez
            inviter.
          </>
        ),
      })
      router.refresh()
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onInvit)}>
        <div className={styles.inviteInput}>
          <div className={styles.input}>
            <Controller
              control={form.control}
              name="contributors"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <InviteUsers
                  label="Ajouter un membre"
                  setEmailsError={setEmailsError}
                  error={error}
                  onChange={onChange}
                  resourceId={resource.id}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            nativeButtonProps={{
              'data-testid': 'invite-member-modal-button',
            }}
            {...buttonLoadingClassname(
              form.formState.isSubmitting,
              styles.inviteButton,
            )}
          >
            Inviter
          </Button>
        </div>
      </form>
      <p className="fr-mt-4w fr-mb-1w">
        Liste des contributeurs de la ressource
      </p>
      {resource.base && (
        <div className={styles.contributors}>
          <span className="fr-icon-team-line" />
          Tous les membres de <b>‘{resource.base.title}’</b> sont contributeurs
        </div>
      )}
      {resource.createdBy && (
        <div className={classNames('fr-mt-2w', styles.contributor)}>
          <div className={styles.user} data-testid="contributors-creator">
            <RoundProfileImage className="fr-mr-1w" user={resource.createdBy} />
            {resource.createdBy.name}
          </div>
          <div className={styles.creator}>Propriétaire</div>
        </div>
      )}
      {contributors &&
        contributors.map((contributor) => (
          <div
            key={contributor.id}
            className={styles.contributor}
            data-testid="contributors-contributor"
          >
            <div className={styles.user}>
              <RoundProfileImage className="fr-mr-1w" user={contributor} />
              {contributor.name}
            </div>
            <Button
              title="Supprimer des contributeurs"
              iconId="fr-icon-close-line"
              priority="tertiary no outline"
              size="small"
              nativeButtonProps={{
                'data-testid': 'remove-contributor-button',
              }}
              onClick={() => onDelete(contributor.id)}
            />
          </div>
        ))}
    </>
  )
}

export default withTrpc(InviteResourceContributors)
