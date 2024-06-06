import { feedbackBadgeStatus } from './feedbackBadge.Status'

describe('feedback badge status', () => {
  it('should be "Non recommandée" when value is less than 2', () => {
    const value = 1.5

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'error',
      label: 'Non recommandée',
      emoticon: 'ri-emotion-unhappy-fill',
    })
  })

  it('should be "Moyennement recommandée" when value is 2', () => {
    const value = 2

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'warning',
      label: 'Peu recommandée',
      emoticon: 'ri-emotion-normal-fill',
    })
  })

  it('should be "Moyennement recommandée" when value is more than 3 and less than 4', () => {
    const value = 3.25

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
      emoticon: 'ri-emotion-happy-fill',
    })
  })

  it('should be "Très recommandée" when value is 4', () => {
    const value = 4

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'triumph',
      label: 'Très recommandée',
      emoticon: 'ri-emotion-fill',
    })
  })
})

describe('feedback badge status with custom thresholds', () => {
  it('should be "Peu recommandée" when value is less than 2', () => {
    const value = 1.45

    const badgeStatus = feedbackBadgeStatus(value, [3.25, 2.5, 1, 0])

    expect(badgeStatus).toStrictEqual({
      severity: 'warning',
      label: 'Peu recommandée',
      emoticon: 'ri-emotion-normal-fill',
    })
  })

  it('should be "Peu recommandée" when value is 2', () => {
    const value = 2.52

    const badgeStatus = feedbackBadgeStatus(value, [3.25, 2.5, 1, 0])

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
      emoticon: 'ri-emotion-happy-fill',
    })
  })

  it('should be "Recommandée" when value is more than 2 and less than 3.25', () => {
    const value = 3.24

    const badgeStatus = feedbackBadgeStatus(value, [3.25, 2.5, 1, 0])

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
      emoticon: 'ri-emotion-happy-fill',
    })
  })

  it('should be "Très recommandée" when value is 3', () => {
    const value = 3.26

    const badgeStatus = feedbackBadgeStatus(value, [3.25, 2.5, 1, 0])

    expect(badgeStatus).toStrictEqual({
      severity: 'triumph',
      label: 'Très recommandée',
      emoticon: 'ri-emotion-fill',
    })
  })
})
