import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeedHeader } from '@app/web/features/fil-d-actualite/NewsFeedHeader'
import NewsFeedList from '@app/web/features/fil-d-actualite/NewsFeedList'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'

const NewsFeedPage = async ({
  params,
  newsFeedPageContext,
}: {
  params: NewsFeedParams
  newsFeedPageContext: NewsFeedPageContext
}) => {
  const { userNewsFeed, resources, user, notificationsCount } =
    newsFeedPageContext
  return (
    <>
      <NewsFeedHeader
        params={params}
        notificationsCount={notificationsCount}
        newsFeedPageContext={newsFeedPageContext}
      />
      <div className="fr-flex fr-justify-content-space-between fr-col-md-12 fr-mt-md-6w">
        <div className="fr-flex fr-direction-column fr-col-md-8 fr-justify-content-space-between">
          <NewsFeedList
            resources={resources}
            user={user}
            userNewsFeed={userNewsFeed}
            params={params}
          />
        </div>
      </div>
    </>
  )
}

export default NewsFeedPage
