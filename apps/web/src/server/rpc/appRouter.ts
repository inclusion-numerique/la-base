import { router } from '@app/web/server/rpc/createRouter'
import { resourceRouter } from '@app/web/server/rpc/resource/resourceRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'

export const appRouter = router({
  user: userRouter,
  resource: resourceRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
