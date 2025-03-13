import { collectionRouter } from '@app/web/server/rpc/collection/collectionRouter'
import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { resourceRouter } from '@app/web/server/rpc/resource/resourceRouter'
import { resourceContributorRouter } from '@app/web/server/rpc/resourceContributor/resourceContributorRouter'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { baseRouter } from '@app/web/server/rpc/base/baseRouter'
import { baseMemberRouter } from '@app/web/server/rpc/baseMember/baseMemberRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { metadataRouter } from '@app/web/server/rpc/metadata/metadataRouter'
import { searchRouter } from '@app/web/server/rpc/search/searchRouter'
import { reportRouter } from '@app/web/server/rpc/report/reportRouter'
import { followRouter } from '@app/web/server/rpc/follow/followRouter'
import { feedbackRouter } from '@app/web/server/rpc/feedback/feedbackRouter'
import { collectionResourceRouter } from '@app/web/server/rpc/collectionResource/collectionResource'

export const appRouter = router({
  user: userRouter,
  resource: resourceRouter,
  resourceContributor: resourceContributorRouter,
  base: baseRouter,
  baseMember: baseMemberRouter,
  profile: profileRouter,
  collection: collectionRouter,
  collectionResource: collectionResourceRouter,
  metaData: metadataRouter,
  upload: uploadRouter,
  image: imageRouter,
  search: searchRouter,
  report: reportRouter,
  follow: followRouter,
  feedback: feedbackRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
