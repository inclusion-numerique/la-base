type FeedbackBadgeStatus = {
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

const BADGE_STATUS: FeedbackBadgeStatus[] = [
  {
    threshold: 4,
    content: {
      severity: 'triumph',
      label: 'Très recommandée',
      emoticon: 'ri-emotion-fill',
    },
  },
  {
    threshold: 3,
    content: {
      severity: 'success',
      label: 'Recommandée',
      emoticon: 'ri-emotion-happy-fill',
    },
  },
  {
    threshold: 2,
    content: {
      severity: 'warning',
      label: 'Peu recommandée',
      emoticon: 'ri-emotion-normal-fill',
    },
  },
  {
    threshold: 1,
    content: {
      severity: 'error',
      label: 'Non recommandée',
      emoticon: 'ri-emotion-unhappy-fill',
    },
  },
]

const applyCustomThresholds =
  (customThresholds?: [number, number, number, number]) =>
  (badgeStatus: FeedbackBadgeStatus, index: number) => ({
    ...badgeStatus,
    threshold: customThresholds?.[index] ?? badgeStatus.threshold,
  })

const byDesc = (a: number, b: number) => b - a

const badgeStatusMatching =
  (value: number) =>
  ({ threshold }: { threshold: number }) =>
    value >= threshold

export const feedbackBadgeStatus = (
  value: number,
  thresholds?: [number, number, number, number],
) =>
  BADGE_STATUS.map(applyCustomThresholds(thresholds?.sort(byDesc))).find(
    badgeStatusMatching(value),
  )?.content
