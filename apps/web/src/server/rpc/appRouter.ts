import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { resourceRouter } from '@app/web/server/rpc/resource/resourceRouter'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { baseRouter } from '@app/web/server/rpc/base/baseRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { metadataRouter } from '@app/web/server/rpc/metadata/metadataRouter'

export const appRouter = router({
  user: userRouter,
  resource: resourceRouter,
  base: baseRouter,
  profile: profileRouter,
  metaData: metadataRouter,
  upload: uploadRouter,
  image: imageRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
