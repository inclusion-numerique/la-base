'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import { Dropdown } from '@app/web/components/Dropdown/Dropdown'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import HeaderUserNotificationsBadge from '@app/web/features/notifications/components/HeaderUserNotificationsBadge'
import HeaderUserNotificationsMenu from '@app/web/features/notifications/components/HeaderUserNotificationsMenu'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import styles from './HeaderUserNotificationsDropdown.module.css'

const HeaderUserNotificationsDropdown = ({ user }: { user: SessionUser }) => {
  const mutation = trpc.notifications.updateUnseenNotifications.useMutation()
  const handleOnOpenModal = () => mutation.mutate()

  return (
    <>
      <div className="fr-hidden fr-unhidden-lg">
        <Dropdown
          id="user_notifications_menu"
          aria-label="Menu de notifications"
          alignRight
          displayDropdownArrow={false}
          control={
            <div aria-label="Menu des notifications">
              <HeaderUserNotificationsBadge className="fr-position-absolute" />
              <span
                className={classNames(styles.icon, 'ri-notification-3-line')}
              />
            </div>
          }
          onClickOutside={handleOnOpenModal}
        >
          <HeaderUserNotificationsMenu />
        </Dropdown>
      </div>
    </>
  )
}

export default withTrpc(HeaderUserNotificationsDropdown)
