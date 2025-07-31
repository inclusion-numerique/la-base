import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'

const FeedbackWithCount = ({
  feedbackCount,
  rating,
}: {
  feedbackCount: number
  rating: number
}) => (
  <div
    data-testid="feedback-count"
    className="fr-flex fr-justify-content-space-between fr-direction-md-column fr-direction-row"
  >
    <FeedbackBadge value={rating} />
    <div className="fr-text--sm fr-mb-0">{feedbackCount} Avis</div>
  </div>
)

export const ResourceFeedbackCountByRating = ({
  resource: { feedbackCount, _count },
  userFeedbackRating = 0,
}: {
  resource: {
    feedbackCount: {
      notRecommended: number
      moderatelyRecommended: number
      recommended: number
      highlyRecommended: number
    }
    _count: {
      resourceFeedback: number
    }
  }
  userFeedbackRating?: number
}) =>
  ((userFeedbackRating > 1 && _count.resourceFeedback > 1) ||
    (userFeedbackRating < 1 && _count.resourceFeedback > 0)) && (
    <div className="fr-border fr-border-radius--8 fr-p-3w fr-mb-6w fr-flex fr-flex-gap-4v fr-justify-content-space-between fr-flex-wrap fr-direction-md-row fr-direction-column">
      <FeedbackWithCount
        rating={2}
        feedbackCount={
          feedbackCount.moderatelyRecommended + feedbackCount.notRecommended
        }
      />
      <FeedbackWithCount rating={3} feedbackCount={feedbackCount.recommended} />
      <FeedbackWithCount
        rating={4}
        feedbackCount={feedbackCount.highlyRecommended}
      />
    </div>
  )
