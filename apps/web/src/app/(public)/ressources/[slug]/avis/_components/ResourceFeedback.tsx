import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { formatName } from '@app/web/server/rpc/user/formatName'
import { trpc } from '@app/web/trpc'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ReadMore } from './ReadMore'
import { ResourceFeedbackActions } from './ResourceFeedbackActions'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: `delete-resource-feedback`,
  isOpenedByDefault: false,
})

const ResourceFeedback = ({
  feedback,
  isOwner,
  canSendMail,
  onEdit,
}: {
  feedback: {
    resourceId: string
    created: Date
    updated: Date
    sentBy: {
      image: { id: string; altText: string | null } | null
      firstName: string | null
      lastName: string | null
      name: string | null
      email: string | null
      slug: string | null
      isPublic: boolean | null
    }
    comment: string | null
    rating: number
  }
  isOwner: boolean
  canSendMail: boolean
  onEdit: () => void
}) => {
  const router = useRouter()
  const mutate = trpc.resource.deleteFeedback.useMutation()
  const isLoading = mutate.isPending

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({ resourceId: feedback.resourceId })

      closeDeleteModal()
      router.refresh()

      createToast({
        priority: 'success',
        message: 'Avis supprimé',
      })
    } catch {
      createToast({
        priority: 'error',
        message: "Votre avis n'a pas pu être supprimé",
      })
    }
  }

  return (
    <article data-testid="resource-feedback">
      <div className="fr-border fr-border-radius--8 fr-p-3w fr-mb-3w">
        <div className="fr-flex fr-justify-content-space-between fr-direction-sm-row fr-direction-column fr-flex-gap-2v">
          <div className="fr-flex fr-align-items-sm-center fr-flex-gap-2v fr-direction-sm-row fr-direction-column">
            <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
              <RoundProfileImage user={feedback.sentBy} />
              <Link
                href={`/profils/${feedback.sentBy.slug}`}
                className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
              >
                {feedback.sentBy.name
                  ? formatName(feedback.sentBy.name)
                  : feedback.sentBy.slug}
              </Link>
            </div>
            <span className="fr-unhidden-sm fr-hidden">·</span>
            <span className="fr-text--xs fr-mb-0 fr-text-mention--grey fr-flex-grow-1">
              {feedback.created.getTime() === feedback.updated.getTime() ? (
                <>
                  Avis&nbsp;publié&nbsp;le&nbsp;
                  {dateAsDay(feedback.created)}
                </>
              ) : (
                <>
                  Avis&nbsp;mis&nbsp;à&nbsp;jour&nbsp;le&nbsp;
                  {dateAsDay(feedback.updated)}
                </>
              )}
            </span>
          </div>
          {canSendMail && feedback.sentBy.email && feedback.sentBy.isPublic && (
            <Link
              className="fr-btn fr-btn--tertiary-no-outline fr-icon-mail-line fr-btn--icon-right"
              href={`mailto:${feedback.sentBy.email}`}
            >
              Contacter
            </Link>
          )}
          <ResourceFeedbackActions
            className="fr-unhidden-sm fr-hidden"
            nativeButtonProps={deleteModalNativeButtonProps}
            isOwner={isOwner}
            onEdit={onEdit}
          />
        </div>
        <div className="fr-mt-2w">
          <FeedbackBadge value={feedback.rating} />
        </div>
        {feedback.comment && (
          <p className="fr-mt-2w fr-mb-0">
            <ReadMore limit={660}>{feedback.comment}</ReadMore>
          </p>
        )}
        <ResourceFeedbackActions
          className="fr-hidden-sm fr-mt-2w fr-flex fr-direction-row-reverse"
          nativeButtonProps={deleteModalNativeButtonProps}
          isOwner={isOwner}
          onEdit={onEdit}
        />
      </div>
      <DeleteModal
        title="Supprimer votre avis"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            disabled: isLoading,
            onClick: closeDeleteModal,
          },
          {
            children: 'Supprimer',
            ...buttonLoadingClassname(isLoading, 'fr-btn--danger'),
            onClick: () => onDelete(),
          },
        ]}
      >
        Êtes-vous sûr de vouloir supprimer votre avis sur cette ressource ?
      </DeleteModal>
    </article>
  )
}

export default withTrpc(ResourceFeedback)
