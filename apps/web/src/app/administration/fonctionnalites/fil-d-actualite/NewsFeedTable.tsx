import {
  NewsFeedDataTable,
  type NewsFeedDataTableSearchParams,
} from '@app/web/app/administration/fonctionnalites/fil-d-actualite/NewsFeedDataTable'
import type { SearchNewsFeedResult } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/searchNewsFeed'
import DataTable from '@app/web/data-table/DataTable'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'

const defaultPageSize = 100

const pageSizeOptions = generatePageSizeSelectOptions([
  10, 20, 50, 100, 250, 500, 1000,
])

const NewsFeedTable = ({
  data: { newsFeeds, totalPages },
  searchParams,
  baseHref,
}: {
  data: SearchNewsFeedResult
  searchParams: NewsFeedDataTableSearchParams
  baseHref: string
}) => (
  <>
    <DataTable
      className="fr-table--nowrap fr-width-full fr-mb-8v"
      rows={newsFeeds}
      configuration={NewsFeedDataTable}
      searchParams={searchParams}
      baseHref={baseHref}
    />
    <PaginationNavWithPageSizeSelect
      defaultPageSize={defaultPageSize}
      pageSizeOptions={pageSizeOptions}
      totalPages={totalPages}
      baseHref={baseHref}
      searchParams={searchParams}
    />
  </>
)

export default NewsFeedTable
