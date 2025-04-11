import { feedbackBadgeStatus } from './resourceFeedbackBadge.Status'

describe('feedback badge status', () => {
  it('should be "Non recommandée" when value is less than 1.5', () => {
    const value = 1.2

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'error',
      label: 'Non recommandée',
      emoticon: 'ri-emotion-unhappy-fill',
    })
  })

  it('should be "Peu recommandée" when value is 2', () => {
    const value = 2

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'warning',
      label: 'Peu recommandée',
      emoticon: 'ri-emotion-normal-fill',
    })
  })

  it('should be "Moyennement recommandée" when value is around 3', () => {
    const value = 3

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
      emoticon: 'ri-emotion-happy-fill',
    })
  })

  it('should be "Très recommandée" when value is more than 3.5', () => {
    const value = 3.5

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'triumph',
      label: 'Très recommandée',
      emoticon: 'ri-emotion-fill',
    })
  })
})
