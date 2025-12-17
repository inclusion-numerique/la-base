import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { HeaderUserNotificationsRow } from '@app/web/features/notifications/components/HeaderUserNotificationsRow'
import { trpc } from '@app/web/trpc'
import Badge from '@codegouvfr/react-dsfr/Badge'
import classNames from 'classnames'
import styles from './HeaderUserNotificationsMenu.module.css'

const HeaderUserNotificationsMenu = () => {
  const { data: count } = trpc.notifications.count.useQuery()
  const { data: notifications } = trpc.notifications.getNotifications.useQuery()
  return (
    <ul
      className={classNames(
        styles.container,
        'fr-position-relative fr-border-md fr-border-radius--8',
      )}
    >
      <div className={styles.headerSeparator}>
        <li className="fr-py-md-3w fr-px-md-4w">
          <div className="fr-flex fr-direction-column fr-direction-md-row fr-justify-content-space-between fr-align-items-md-center fr-flex-gap-6v">
            <span className="fr-text-mention--grey fr-text--xs fr-text--bold fr-text--uppercase">
              Notifications
            </span>
            {!!count && (
              <Badge small severity="info">
                {count} nouvelle{sPluriel(count)} depuis votre dernière visite
              </Badge>
            )}
          </div>
        </li>
      </div>
      <div
        className={classNames(
          styles.notificationContainer,
          'fr-mt-2w fr-mb-3w',
        )}
      >
        {notifications && notifications.length > 0 ? (
          notifications?.map((notif) => (
            <li
              className={classNames(
                'fr-py-md-2w fr-px-md-4w',
                styles.notificationItem,
              )}
              key={notif.id}
            >
              <HeaderUserNotificationsRow notification={notif} />
            </li>
          ))
        ) : (
          <li className="fr-py-2w fr-px-4w fr-flex fr-justify-content-center fr-align-items-center">
            <span className="fr-text-mention--grey">Aucune notification</span>
          </li>
        )}
      </div>
    </ul>
  )
}

export default withTrpc(HeaderUserNotificationsMenu)
