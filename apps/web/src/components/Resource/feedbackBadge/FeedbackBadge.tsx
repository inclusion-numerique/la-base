import Badge from '@codegouvfr/react-dsfr/Badge'
import type { AlertProps } from '@codegouvfr/react-dsfr/src/Alert'
import classNames from 'classnames'
import { feedbackBadgeStatus } from './resourceFeedbackBadge.Status'

export const FeedbackBadge = ({
  value,
  className,
  withLabel = true,
  withCount = false,
}: {
  value: number
  className?: string
  withLabel?: boolean
  withCount?: boolean
}) => {
  const badgeStatus = feedbackBadgeStatus(value)
  return (
    <Badge
      noIcon
      small
      severity={badgeStatus?.severity as AlertProps.Severity}
      className={classNames(
        'fr-pl-1v fr-text--center fr-text--uppercase fr-text--nowrap',
        className,
      )}
    >
      <span
        className={classNames(
          badgeStatus?.emoticon,
          'ri-lg',
          (!!withLabel || !!withCount) && 'fr-mr-1v',
        )}
        aria-hidden
      />
      {!!withLabel && badgeStatus?.label}
      {!!withCount && <span className="fr-text--bold">{value}</span>}
    </Badge>
  )
}
