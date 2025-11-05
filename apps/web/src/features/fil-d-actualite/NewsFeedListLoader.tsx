import {
  getNewsFeedPageContext,
  NewsFeedPageContext,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import NewsFeedList from '@app/web/features/fil-d-actualite/NewsFeedList'
import { NewsFeedFilters } from '@app/web/server/newsFeed/getNewsFeedResources'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'

const NewsFeedListLoader = async ({
  params,
  filters,
  pagination,
}: {
  params: NewsFeedParams
  filters: NewsFeedFilters
  pagination?: PaginationParams
}) => {
  const newsFeedPageContext: NewsFeedPageContext = await getNewsFeedPageContext(
    filters,
    pagination,
  )

  return (
    <NewsFeedList newsFeedPageContext={newsFeedPageContext} params={params} />
  )
}

export default NewsFeedListLoader
