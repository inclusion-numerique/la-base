import { appRouter } from '@app/web/server/rpc/appRouter'
import { createContext } from '@app/web/server/rpc/createContext'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  })
export { handler as GET, handler as POST }
