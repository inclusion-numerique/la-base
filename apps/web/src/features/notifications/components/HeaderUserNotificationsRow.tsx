'use client'

import { SessionUser } from '@app/web/auth/sessionUser'
import IconInCircle from '@app/web/components/IconInCircle'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { getNotificationBadgeIcon } from '@app/web/features/notifications/utils/getNotificationBadgeIcon'
import { getNotificationRedirectionUrl } from '@app/web/features/notifications/utils/getNotificationsRedirectionUrl'
import { formatTimeAgo } from '@app/web/utils/formatTimeAgo'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import {
  getNotificationText,
  NotificationWithRelations,
} from '../utils/getNotificationText'
import styles from './HeaderUserNotificationsRow.module.css'

export const HeaderUserNotificationsRow = ({
  user,
  notification,
}: {
  user: SessionUser
  notification: NotificationWithRelations
}) => {
  const router = useRouter()

  const handleRowClick = (event: React.MouseEvent) => {
    // Don't navigate if clicking on a link
    if (
      (event.target as HTMLElement).tagName === 'A' ||
      (event.target as HTMLElement).closest('a')
    ) {
      return
    }

    const defaultUrl = getNotificationRedirectionUrl(notification)
    router.push(defaultUrl)
  }
  return (
    <div
      className="fr-flex fr-align-items-center fr-flex-gap-6v fr-position-relative"
      onClick={handleRowClick}
    >
      <div className="fr-position-relative fr-flex fr-align-items-center">
        <RoundProfileImage user={user} />
        <div className={styles.smallBadge}>
          <IconInCircle
            size="xsmall"
            // We need to cast, one of the icon isn't in the remixicon deps of the DSFR 4.2.0 but available in 4.7.0
            iconId={getNotificationBadgeIcon(notification) as RiIconClassName}
          />
        </div>
      </div>
      <div className="fr-flex fr-direction-column fr-text--left">
        <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
          <span className="fr-text-mention--grey fr-text--xs">
            {formatTimeAgo(notification.created, true)}
          </span>
          {!notification.lastSeenAt && (
            <div
              className={classNames(
                styles.unseenBadge,
                'fr-background-flat--info',
              )}
              aria-label="Non lu"
            />
          )}
        </div>

        <span className="fr-text--sm fr-text-title--grey">
          {getNotificationText(notification)}
        </span>
      </div>
    </div>
  )
}
