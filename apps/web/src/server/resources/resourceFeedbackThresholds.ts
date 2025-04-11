import type { ResourceFeedbackStatus } from '@app/web/components/Resource/feedbackBadge/resourceFeedbackBadge.Status'

export const resourceFeedbackThresholds: {
  [key in ResourceFeedbackStatus]: number
} = {
  // Ratings can be [1, 2, 3, 4], so e.g. "non" is applied to an average of 1 to 1.5
  beaucoup: 3.5,
  oui: 2.5,
  moyen: 1.5,
  non: 0,
}
