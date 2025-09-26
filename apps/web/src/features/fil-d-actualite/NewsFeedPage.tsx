import { getNewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeedHeader } from '@app/web/features/fil-d-actualite/NewsFeedHeader'
import { NewsFeedList } from '@app/web/features/fil-d-actualite/NewsFeedList'
import NewsFeedResults from '@app/web/features/fil-d-actualite/NewsFeedResults'
import { NewsFeedSearchFilters } from '@app/web/features/fil-d-actualite/NewsFeedSearchFilters'
import {
  paginationParamsToUrlQueryParams,
  sanitizeUrlPaginationParams,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'

const NewsFeedPage = async ({
  searchParams,
}: {
  searchParams: UrlPaginationParams
}) => {
  const paginationParams = {
    ...sanitizeUrlPaginationParams(searchParams),
    perPage: 20,
  }
  const { resources, totalCount, user, userNewsFeed } =
    await getNewsFeedPageContext({}, paginationParams)

  return (
    <>
      <NewsFeedHeader />
      <div className="fr-flex fr-justify-content-space-between fr-col-12 fr-mt-6w">
        <NewsFeedSearchFilters userNewsFeed={userNewsFeed} />
        <div className="fr-flex fr-direction-column fr-col-8 fr-justify-content-space-between">
          <NewsFeedResults
            paginationParams={paginationParams}
            count={totalCount}
            createPageLink={(page: number) => {
              const next = paginationParamsToUrlQueryParams({
                ...paginationParams,
                page,
              })
              const params = new URLSearchParams()
              if (next.page) params.set('page', next.page as string)
              const qs = params.toString()
              return qs ? `/fil-d-actualite?${qs}` : `/fil-d-actualite`
            }}
          >
            <NewsFeedList
              resources={resources}
              user={user}
              userNewsFeed={userNewsFeed}
            />
          </NewsFeedResults>
        </div>
      </div>
    </>
  )
}

export default NewsFeedPage
