import {
  CreateTRPCClientOptions,
  httpBatchLink,
  loggerLink,
} from '@trpc/client'
import { create } from 'zustand'
import { QueryClient } from '@tanstack/react-query'
import { AppRouter } from '@app/web/server/rpc/appRouter'
import { transformer } from '@app/web/utils/serialization'
import { trpc } from '@app/web/trpc'

const clientOptions: CreateTRPCClientOptions<AppRouter> = {
  links: [
    loggerLink({
      enabled: (options) =>
        process.env.NODE_ENV === 'development' ||
        (options.direction === 'down' && options.result instanceof Error),
    }),
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
  transformer,
}

export const queryClient = new QueryClient()
export const trpcClient = trpc.createClient(clientOptions)

export const useTrpcClient = create(() => ({
  queryClient,
  trpcClient,
}))
