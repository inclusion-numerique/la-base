'use client'

import React, { useState } from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceFeedback from './ResourceFeedback'
import { ResourceFeedbackCountByRating } from './ResourceFeedbackCountByRating'
import ResourceFeedbackForm from './ResourceFeedbackForm'

const isGivenBy =
  (user: SessionUser | null) =>
  ({ sentById }: { sentById: string }) =>
    sentById === user?.id

export const ResourceFeedbackList = ({
  resource,
  user,
  canGiveFeedback,
}: {
  resource: ResourceProjection
  user: SessionUser | null
  canGiveFeedback: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      {!resource.publicFeedback && (
        <Notice
          className="fr-mb-3w"
          title={
            <div className="fr-text-default--grey">
              <div className="fr-text--bold fr-mb-1w">
                Commentaires publics désactivés sur cette ressource
              </div>
              <p className="fr-text--regular">
                {canGiveFeedback
                  ? 'Votre avis sera uniquement visible par le créateur et les contributeurs de la ressource afin de contribuer à l’amélioration de leur ressource.'
                  : 'Les commentaires sont uniquement visibles par vous et les contributeurs de votre ressource.'}
              </p>
            </div>
          }
        />
      )}
      <h1 className="fr-sr-only">Avis - {resource.title}</h1>
      {canGiveFeedback && !resource.resourceFeedback.some(isGivenBy(user)) && (
        <div className="fr-border fr-border-radius--8 fr-pt-4w fr-px-4w fr-mb-6w">
          <h2 className="fr-sr-only">
            Quel est votre avis à propos de cette ressource ?
          </h2>
          <ResourceFeedbackForm resource={resource} />
        </div>
      )}
      <div className="fr-mb-15w">
        <h2 className="fr-h4">
          {resource.feedbackCount.total} Avis sur la ressource
        </h2>
        {resource.resourceFeedback.length === 0 && (
          <div className="fr-border fr-p-4w fr-mb-6w fr-text--center fr-text-mention--grey">
            Il n’y a pas encore d’avis sur cette ressource
            <br />
            Soyez le premier à partager votre avis.
          </div>
        )}
        {resource.resourceFeedback.map((feedback) => {
          const isOwner = feedback.sentById === user?.id

          return isOwner && isEditing ? (
            <ResourceFeedbackForm
              resource={resource}
              feedback={feedback}
              onDismiss={() => setIsEditing(false)}
            />
          ) : (
            <ResourceFeedback
              feedback={feedback}
              isOwner={isOwner}
              canSendMail={!canGiveFeedback}
              key={`${feedback.sentById}_${feedback.resourceId}`}
              onEdit={() => setIsEditing(true)}
            />
          )
        })}
        {!resource.publicFeedback && canGiveFeedback && (
          <ResourceFeedbackCountByRating
            userFeedbackRating={resource.resourceFeedback.at(0)?.rating}
            feedbackCount={resource.feedbackCount}
          />
        )}
      </div>
    </>
  )
}