'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { useEffect } from 'react'

const NewsFeedBadgeInvalidation = () => {
  const utils = trpc.useUtils()

  useEffect(() => {
    utils.newsFeed.newsBadgeCount.invalidate()
  }, [utils.newsFeed.newsBadgeCount])

  return null
}

export default withTrpc(NewsFeedBadgeInvalidation)
