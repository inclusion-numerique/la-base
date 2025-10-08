import { NewsFeedSearchParams } from '@app/web/app/fil-d-actualite/(fil-actualite)/page'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeedHeader } from '@app/web/features/fil-d-actualite/NewsFeedHeader'
import NewsFeedList from '@app/web/features/fil-d-actualite/NewsFeedList'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'

const NewsFeedPage = async ({
  searchParams,
  newsFeedPageContext,
}: {
  searchParams: NewsFeedSearchParams
  newsFeedPageContext: NewsFeedPageContext
  paginationParams: PaginationParams
}) => {
  const { userNewsFeed, resources, user } = newsFeedPageContext

  return (
    <>
      <Breadcrumbs
        currentPage="Mon fil d'actualité"
        className="fr-m-0 fr-py-4v"
      />
      <NewsFeedHeader searchParams={searchParams} />
      <div className="fr-flex fr-justify-content-space-between fr-col-12 fr-mt-6w">
        <div className="fr-flex fr-direction-column fr-col-8 fr-justify-content-space-between">
          <NewsFeedList
            resources={resources}
            user={user}
            userNewsFeed={userNewsFeed}
            searchParams={searchParams}
          />
        </div>
      </div>
    </>
  )
}

export default NewsFeedPage
