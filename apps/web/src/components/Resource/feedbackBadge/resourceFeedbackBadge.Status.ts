import { resourceFeedbackThresholds } from '@app/web/server/resources/resourceFeedbackThresholds'

export type ResourceFeedbackStatus = 'beaucoup' | 'oui' | 'moyen' | 'non'

type ResourceFeedbackBadgeStatus = {
  status: ResourceFeedbackStatus
  threshold: number
  content: {
    severity: 'triumph' | 'success' | 'warning' | 'error'
    label:
      | 'Très recommandée'
      | 'Recommandée'
      | 'Peu recommandée'
      | 'Non recommandée'
    emoticon:
      | 'ri-emotion-fill'
      | 'ri-emotion-happy-fill'
      | 'ri-emotion-normal-fill'
      | 'ri-emotion-unhappy-fill'
  }
}

const BADGE_STATUS: ResourceFeedbackBadgeStatus[] = [
  {
    status: 'beaucoup',
    threshold: resourceFeedbackThresholds.beaucoup,
    content: {
      severity: 'triumph',
      label: 'Très recommandée',
      emoticon: 'ri-emotion-fill',
    },
  },
  {
    status: 'oui',
    threshold: resourceFeedbackThresholds.oui,
    content: {
      severity: 'success',
      label: 'Recommandée',
      emoticon: 'ri-emotion-happy-fill',
    },
  },
  {
    status: 'moyen',
    threshold: resourceFeedbackThresholds.moyen,
    content: {
      severity: 'warning',
      label: 'Peu recommandée',
      emoticon: 'ri-emotion-normal-fill',
    },
  },
  {
    status: 'non',
    threshold: resourceFeedbackThresholds.non,
    content: {
      severity: 'error',
      label: 'Non recommandée',
      emoticon: 'ri-emotion-unhappy-fill',
    },
  },
]

const badgeStatusMatching =
  (value: number) =>
  ({ threshold }: { threshold: number }) =>
    value >= threshold

export const feedbackBadgeStatus = (value: number) =>
  BADGE_STATUS.find(badgeStatusMatching(value))?.content
