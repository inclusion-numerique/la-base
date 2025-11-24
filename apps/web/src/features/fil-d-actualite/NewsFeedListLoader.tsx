import {
  getNewsFeedPageContext,
  NewsFeedPageContext,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import NewsFeedList from '@app/web/features/fil-d-actualite/NewsFeedList'
import { NewsFeedFilters } from '@app/web/server/newsFeed/getNewsFeedResources'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { getServerBaseUrl } from '@app/web/utils/baseUrl'

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
  const baseUrl = getServerBaseUrl({ absolutePath: true })

  return (
    <NewsFeedList
      newsFeedPageContext={newsFeedPageContext}
      params={params}
      baseUrl={baseUrl}
    />
  )
}

export default NewsFeedListLoader
