import { baseRouter } from '@app/web/server/rpc/base/baseRouter'
import { baseJoinRequestRouter } from '@app/web/server/rpc/baseJoinRequest/baseJoinRequest'
import { baseMemberRouter } from '@app/web/server/rpc/baseMember/baseMemberRouter'
import { collectionRouter } from '@app/web/server/rpc/collection/collectionRouter'
import { collectionResourceRouter } from '@app/web/server/rpc/collectionResource/collectionResource'
import { router } from '@app/web/server/rpc/createRouter'
import { featuredBlockRouter } from '@app/web/server/rpc/featuredBlock/featuredBlockRouter'
import { feedbackRouter } from '@app/web/server/rpc/feedback/feedbackRouter'
import { followRouter } from '@app/web/server/rpc/follow/followRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { metadataRouter } from '@app/web/server/rpc/metadata/metadataRouter'
import { newsFeedRouter } from '@app/web/server/rpc/news-feed/newsFeedRouter.router'
import { notificationsRouter } from '@app/web/server/rpc/notifications/notificationsRouter'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { reportRouter } from '@app/web/server/rpc/report/reportRouter'
import { resourceRouter } from '@app/web/server/rpc/resource/resourceRouter'
import { resourceContributorRouter } from '@app/web/server/rpc/resourceContributor/resourceContributorRouter'
import { searchRouter } from '@app/web/server/rpc/search/searchRouter'
import { shareLinkRouter } from '@app/web/server/rpc/shareableLink/shareLinkRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'

export const appRouter = router({
  user: userRouter,
  resource: resourceRouter,
  resourceContributor: resourceContributorRouter,
  base: baseRouter,
  baseMember: baseMemberRouter,
  baseJoinRequest: baseJoinRequestRouter,
  profile: profileRouter,
  collection: collectionRouter,
  collectionResource: collectionResourceRouter,
  metaData: metadataRouter,
  newsFeed: newsFeedRouter,
  notifications: notificationsRouter,
  upload: uploadRouter,
  image: imageRouter,
  search: searchRouter,
  report: reportRouter,
  follow: followRouter,
  feedback: feedbackRouter,
  featuredBlock: featuredBlockRouter,
  shareableLink: shareLinkRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
