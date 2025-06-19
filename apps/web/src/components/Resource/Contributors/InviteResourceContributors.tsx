'use client'

import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import InviteUsers from '@app/web/features/base/invitation/components/InviteUsers'
import {
  type InviteContributorCommand,
  InviteContributorCommandValidation,
} from '@app/web/server/resourceContributors/inviteContributors'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './InviteResourceContributors.module.css'

const InviteResourceContributors = ({
  resource,
  onSuccess,
}: {
  resource: ResourceListItem | ResourceProjectionWithContext
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
      await deleteMutate.mutateAsync({
        resourceId: resource.id,
        contributorId,
      })
      router.refresh()
      await refetch()
    } catch {
      // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
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
  const handleOnChange = (options: SelectOptionValid[]) => {
    const resourceContributors = options.map((opt) => opt.value)
    return form.setValue('contributors', resourceContributors)
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onInvit)}>
        <div className={styles.inviteInput}>
          <div className={styles.input}>
            <Controller
              control={form.control}
              name="contributors"
              render={({ fieldState: { error } }) => (
                <InviteUsers
                  label="Ajouter un membre"
                  setEmailsError={setEmailsError}
                  error={error}
                  onChange={handleOnChange}
                  resourceId={resource.id}
                  selectedMemberType="member"
                  canAddAdmin={false}
                  withAddButton={false}
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
      {resource.base?.title && (
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
