import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import type { AlertProps } from '@codegouvfr/react-dsfr/src/Alert'
import { feedbackBadgeStatus } from './feedbackBadge.Status'

export const FeedbackBadge = ({
  value,
  customThresholds,
}: {
  value: number
  customThresholds?: [number, number, number, number]
}) => {
  const badgeStatus = feedbackBadgeStatus(value, customThresholds)

  return (
    <Badge
      noIcon
      small
      severity={badgeStatus?.severity as AlertProps.Severity}
      className="fr-pl-1v fr-text--center fr-text--transform-uppercase fr-text--nowrap"
    >
      <span className={`${badgeStatus?.emoticon} ri-lg fr-mr-1v`} aria-hidden />
      {badgeStatus?.label}
    </Badge>
  )
}
