'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const fiveMinutes = 5 * 60 * 1000

const NewsFeedBadge = ({ className }: { className?: string }) => {
  const { data } = trpc.newsFeed.newsBadgeCount.useQuery(
    {},
    {
      staleTime: fiveMinutes,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,

      // poll toutes les 5 min
      refetchInterval: fiveMinutes,
      refetchIntervalInBackground: true,
    },
  )
  if (!data || data.total <= 0) return null
  return (
    <span className={className} aria-label={`${data.total} nouveautés`}>
      {data.total}
    </span>
  )
}

export default withTrpc(NewsFeedBadge)
