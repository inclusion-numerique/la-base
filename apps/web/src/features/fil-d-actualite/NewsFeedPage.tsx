import { NewsFeedHeader } from '@app/web/features/fil-d-actualite/NewsFeedHeader'
import NewsFeedListLoader from '@app/web/features/fil-d-actualite/NewsFeedListLoader'
import NewsFeedListSkeleton from '@app/web/features/fil-d-actualite/NewsFeedListSkeleton'
import { NewsFeedFilters } from '@app/web/server/newsFeed/getNewsFeedResources'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { Suspense } from 'react'
import UpdateNewsLastOpenedAt from './components/UpdateNewsLastOpenedAt'

const NewsFeedPage = async ({
  params,
  filters,
  pagination,
}: {
  params: NewsFeedParams
  filters: NewsFeedFilters
  pagination?: PaginationParams
}) => (
  <>
    <NewsFeedHeader params={params} filters={filters} pagination={pagination} />
    <div className="fr-flex fr-justify-content-space-between fr-col-md-12 fr-mt-md-6w">
      <div className="fr-flex fr-direction-column fr-col-md-8 fr-justify-content-space-between">
        <Suspense fallback={<NewsFeedListSkeleton />}>
          <NewsFeedListLoader
            params={params}
            filters={filters}
            pagination={pagination}
          />
        </Suspense>
        <UpdateNewsLastOpenedAt />
      </div>
    </div>
  </>
)

export default NewsFeedPage
