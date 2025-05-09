import 'client-only'
import type { AppRouter } from '@app/web/server/rpc/appRouter'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
