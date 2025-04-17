import DataTable from '@app/web/data-table/DataTable'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'
import {
  BasesDataTable,
  BasesDataTableSearchParams,
} from '@app/web/app/administration/bases/BasesDataTable'
import { SearchBaseResult } from '@app/web/app/administration/bases/searchBase'

const defaultPageSize = 100

const pageSizeOptions = generatePageSizeSelectOptions([
  10, 20, 50, 100, 250, 500, 1000,
])

const BasesTable = ({
  data: { bases, totalPages },
  searchParams,
  baseHref,
}: {
  data: SearchBaseResult
  searchParams: BasesDataTableSearchParams
  baseHref: string
}) => (
  <>
    <DataTable
      className="fr-table--nowrap fr-width-full fr-mb-8v"
      rows={bases}
      configuration={BasesDataTable}
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

export default BasesTable
