'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import styles from './HeaderUserNotificationsBadge.module.css'

const fiveMinutes = 5 * 60 * 1000

const HeaderUserNotificationsBadge = ({
  className,
}: {
  className?: string
}) => {
  const { data } = trpc.notifications.count.useQuery(undefined, {
    staleTime: fiveMinutes,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    // poll toutes les 5 min
    refetchInterval: fiveMinutes,
    refetchIntervalInBackground: true,
  })

  if (!data) return null

  return (
    <div
      className={classNames(
        styles.badge,
        'fr-background-flat--info',
        className,
      )}
      aria-label="Notifications non lues"
    />
  )
}

export default withTrpc(HeaderUserNotificationsBadge)
