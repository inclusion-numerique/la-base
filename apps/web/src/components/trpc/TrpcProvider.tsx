import { useTrpcClient } from '@app/web/components/trpc/useTrpcClient'
import { trpc } from '@app/web/trpc'
import { QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

const TrpcProvider = ({ children }: PropsWithChildren) => {
  // We use zustand to share state across all components that may use trpc
  // AND lazily create clients only if needed
  // even if there is multiple TrpcProvider components in the application at the same time
  const { trpcClient, queryClient } = useTrpcClient()

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default TrpcProvider
