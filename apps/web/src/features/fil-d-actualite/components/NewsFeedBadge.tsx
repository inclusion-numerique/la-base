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
    <span className={className}>
      <span className="fr-sr-only">Fil d'actualité</span>
      {data.total}
      <span className="fr-sr-only"> nouveautés</span>
    </span>
  )
}

export default withTrpc(NewsFeedBadge)
