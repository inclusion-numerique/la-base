'use client'

import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import EmptyUserAvatar from '@app/web/components/EmptyUserAvatar'
import type { MultipleSearchableSelectRef } from '@app/web/components/MultipleSearchableSelect'
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
import { useRef, useState } from 'react'
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
  const inviteUsersRef = useRef<MultipleSearchableSelectRef>(null)
  const form = useForm<InviteContributorCommand>({
    resolver: zodResolver(InviteContributorCommandValidation),
    defaultValues: {
      resourceId: resource.id,
      contributors: [],
      newMembers: [],
    },
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

    if (
      (!data.contributors || data.contributors.length === 0) &&
      (!data.newMembers || data.newMembers.length === 0)
    ) {
      form.setError('contributors', {
        message: 'Veuillez sélectionner au moins un contributeur à inviter',
      })
      return
    }

    try {
      await invitationMutate.mutateAsync(data)
      await refetch()
      form.reset({
        resourceId: resource.id,
        contributors: [],
        newMembers: [],
      })
      inviteUsersRef.current?.reset()
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
    const contributorsWithIds = options
      .filter((opt) => !opt.value.includes('@'))
      .map((opt) => ({ id: opt.value }))
    const contributorsWithEmails = options
      .filter((opt) => opt.value.includes('@'))
      .map((opt) => ({ email: opt.value, type: 'member' as const }))
    form.setValue('contributors', contributorsWithIds)
    form.setValue('newMembers', contributorsWithEmails)
  }

  return (
    <>
      <p className="fr-mb-2w">Liste des contributeurs de la ressource</p>
      {resource.base?.title && (
        <div className={styles.contributors}>
          <span className="fr-icon-team-line" />
          Tous les membres de <b>‘{resource.base.title}’</b> sont contributeurs
        </div>
      )}
      {resource.createdBy && (
        <>
          <div className={classNames('fr-mt-2w', styles.contributor)}>
            <div className={styles.user} data-testid="contributors-creator">
              <RoundProfileImage
                className="fr-mr-1w"
                user={resource.createdBy}
              />
              <div className="fr-flex fr-direction-column fr-width-full">
                <h3 className="fr-text--sm fr-text--medium fr-text-mention--grey fr-my-auto">
                  {resource.createdBy.name}
                </h3>
                <span className="fr-text--xs fr-mb-0 fr-hint-text">
                  {resource.createdBy.email}
                </span>
              </div>
            </div>
            <div className={styles.creator}>Propriétaire</div>
          </div>
          {contributors &&
            contributors.map((contributor) => (
              <div
                key={contributor.id}
                className={styles.contributor}
                data-testid="contributors-contributor"
              >
                <div className={styles.user}>
                  {contributor.name ? (
                    <RoundProfileImage user={contributor} />
                  ) : (
                    <EmptyUserAvatar />
                  )}
                  <div className="fr-flex fr-direction-column fr-width-full">
                    {!!contributor.name && (
                      <>
                        <span className="fr-ml-1w fr-text--sm fr-text--medium fr-text-mention--grey fr-my-auto">
                          {contributor.name}
                        </span>
                        <span className="fr-ml-1w fr-text--xs fr-mb-0 fr-hint-text">
                          {contributor.email}
                        </span>
                      </>
                    )}
                    {!!contributor.email && !contributor.name && (
                      <span className="fr-ml-1w fr-text--sm fr-text--medium fr-text-mention--grey fr-my-auto">
                        {contributor.email}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  title="Supprimer des contributeurs"
                  priority="tertiary no outline"
                  size="small"
                  nativeButtonProps={{
                    'data-testid': 'remove-contributor-button',
                  }}
                  type="button"
                  onClick={() => onDelete(contributor.id)}
                >
                  Retirer
                  <span
                    className="ri-close-circle-line fr-ml-1w"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            ))}
          <hr className="fr-mt-4w fr-pb-4w" />
        </>
      )}

      <form onSubmit={form.handleSubmit(onInvit)}>
        <div className={styles.inviteInput}>
          <div className={styles.input}>
            <Controller
              control={form.control}
              name="contributors"
              render={({ fieldState: { error } }) => (
                <InviteUsers
                  ref={inviteUsersRef}
                  withBadges={false}
                  label="Ajouter un contributeur"
                  setEmailsError={setEmailsError}
                  error={error}
                  onChange={handleOnChange}
                  resourceId={resource.id}
                  selectedMemberType="member"
                  canAddAdmin={false}
                />
              )}
            />
          </div>
          <div className="fr-width-full">
            <Button
              type="submit"
              size="large"
              nativeButtonProps={{
                'data-testid': 'invite-member-modal-button',
              }}
              {...buttonLoadingClassname(
                form.formState.isSubmitting,
                styles.inviteButton,
              )}
            >
              Inviter les contributeurs
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default withTrpc(InviteResourceContributors)
