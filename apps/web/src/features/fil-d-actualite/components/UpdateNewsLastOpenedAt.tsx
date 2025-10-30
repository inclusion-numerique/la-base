'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { useEffect } from 'react'

/**
 * Client component that trigger updateNewsLastOpenedAt
 */
const UpdateNewsLastOpenedAt = () => {
  const mutation = trpc.newsFeed.updateLastOpenedAt.useMutation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: dont need the mutation in the deps array
  useEffect(() => {
    mutation.mutate({})
  }, [])

  return null
}

export default withTrpc(UpdateNewsLastOpenedAt)
