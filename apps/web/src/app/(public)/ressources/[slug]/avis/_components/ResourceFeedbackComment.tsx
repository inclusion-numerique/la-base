'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { formatName } from '@app/web/server/rpc/user/formatName'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './ResourceFeedbackComment.module.css'
import { ResourceFeedbackActionsThread } from './ResourceFeedbackThread'

interface CommentAuthor {
  id: string
  name: string | null
  slug: string | null
  firstName: string | null
  lastName: string | null
  image: {
    id: string
    altText: string | null
  } | null
  isPublic: boolean | null
}

export interface Comment {
  id: string
  content: string
  created: Date
  updated: Date
  parentCommentId?: string | null
  author: CommentAuthor
  replies?: Comment[]
}

interface ResourceFeedbackCommentProps {
  comment: Comment
  user: SessionUser | null
  resource: ResourceProjection
  owner: boolean
  feedback: {
    comment: string | null
    rating: number
    sentById: string
    resourceId: string
    sentBy: {
      name: string | null
      slug: string | null
    }
  }
}

export const ResourceFeedbackComment = ({
  comment,
  user,
  resource,
  feedback,
  owner,
}: ResourceFeedbackCommentProps) => {
  const isOwnerOfComment = user?.id === comment.author.id
  const splittedContent = comment.content.split(' :')
  const replyToAuthor = splittedContent[0]
  const commentContent = splittedContent[1]

  return (
    <>
      <div className="fr-flex fr-direction-column fr-direction-sm-row fr-align-items-sm-center fr-flex-gap-2v fr-mb-1w">
        <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
          <span className="ri-reply-fill fr-text-mention--grey" />
          <RoundProfileImage user={comment.author} />
          <Link
            href={`/profils/${comment.author.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {comment.author.name
              ? formatName(comment.author.name)
              : comment.author.slug}
          </Link>
        </div>
        <span className="fr-unhidden-sm fr-hidden">·</span>
        <span className="fr-text--xs fr-mb-0 fr-text-mention--grey fr-flex-grow-1">
          {comment.created.getTime() === comment.updated.getTime() ? (
            <>
              Réponse le&nbsp;
              {dateAsDay(comment.created)}
            </>
          ) : (
            <>
              Réponse mise à jour le&nbsp;
              {dateAsDay(comment.updated)}
            </>
          )}
        </span>
      </div>

      <div
        className={classNames(
          styles.border,
          'fr-border-left fr-pl-2w fr-my-2w',
        )}
      >
        <div className="fr-text--sm fr-mb-0">
          <span className="fr-text--bold">{replyToAuthor}&nbsp;:</span>
          {commentContent}
        </div>
        <ResourceFeedbackActionsThread
          isFeedbackOwner={owner}
          isCommentOwner={isOwnerOfComment}
          isCommentThread={true}
          comment={comment}
          user={user}
          resource={resource}
          feedback={feedback}
        />

        {comment.replies && comment.replies.length > 0 && (
          <div className="fr-mt-2w">
            {comment.replies.map((reply) => (
              <ResourceFeedbackComment
                key={reply.id}
                comment={reply}
                user={user}
                resource={resource}
                feedback={feedback}
                owner={owner}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
