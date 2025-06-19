import {
  ResourcesDataTable,
  type ResourcesDataTableSearchParams,
} from '@app/web/app/administration/ressources/ResourcesDataTable'
import type { SearchResourceResult } from '@app/web/app/administration/ressources/searchResource'
import DataTable from '@app/web/data-table/DataTable'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'

const defaultPageSize = 100

const pageSizeOptions = generatePageSizeSelectOptions([
  10, 20, 50, 100, 250, 500, 1000,
])

const ResourcesTable = ({
  data: { resources, totalPages },
  searchParams,
  baseHref,
}: {
  data: SearchResourceResult
  searchParams: ResourcesDataTableSearchParams
  baseHref: string
}) => (
  <>
    <DataTable
      className="fr-table--nowrap fr-width-full fr-mb-8v"
      rows={resources}
      configuration={ResourcesDataTable}
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

export default ResourcesTable
