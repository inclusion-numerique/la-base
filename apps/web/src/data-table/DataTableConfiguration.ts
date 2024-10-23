import type { ReactNode } from 'react'
import type { SelectInputOption } from '@app/ui/components/Form/utils/options'
import type { Sql } from '@prisma/client/runtime/library'
import type { SortDirection } from '@app/web/data-table/SortLink'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableRow = any

export type DataTableFilter<
  DataRow extends DataTableRow = DataTableRow,
  Where extends Record<string, unknown> = Record<string, unknown>,
  FilterName extends string = string,
  V extends string = string,
> = {
  name: FilterName
  title: ReactNode
  options?:
    | SelectInputOption[]
    | (() => SelectInputOption[])
    | (() => Promise<SelectInputOption[]>)
  toQuery?: (value: V[]) => string
  fromQuery?: (query?: string) => V[]
  applyInMemory?: (row: DataRow, value: V[]) => boolean
  applyWhereCondition?: (query: string, value: V[]) => Where
  render?: (value: V[]) => ReactNode | Promise<ReactNode>
}

export type DataTableColumn<
  DataRow extends DataTableRow = DataTableRow,
  Where extends Record<string, unknown> = Record<string, unknown>,
  OrderBy extends Record<string, unknown> = Record<string, unknown>,
  ColumnName extends string = string,
> = {
  name: ColumnName
  header: ReactNode
  cellAsTh?: boolean
  cellClassName?: string
  headerClassName?: string
  csvHeaders?: string[]
  csvValues?: (row: DataRow) => (string | number | null | undefined)[]
  defaultSortable?: boolean
  defaultSortableDirection?: SortDirection
  sortInMemory?: (a: DataRow, b: DataRow) => number
  sortable?: boolean
  orderBy?: (direction: SortDirection) => OrderBy[]
  rawOrderBy?: (direction: SortDirection) => Sql[]
  cell?: (row: DataRow) => ReactNode
  filters?: DataTableFilter<DataRow, Where>[]
}

export type DataTableConfiguration<
  DataRow extends DataTableRow = DataTableRow,
  Where extends Record<string, unknown> = Record<string, unknown>,
  OrderBy extends Record<string, unknown> = Record<string, unknown>,
> = {
  csvFilename?: string | (() => string)
  columns: DataTableColumn<DataRow, Where, OrderBy>[]
  rowKey: (row: DataRow) => string
  rowLink?: (row: DataRow) => {
    href: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    prefetch?: boolean
  }
  rowInMemorySearchableString?: (row: DataRow) => string
  defaultSortableInMemory?: (a: DataRow, b: DataRow) => number
}

type ConfiguredFilters<Configuration extends DataTableConfiguration> = Extract<
  Configuration['columns'][number],
  { filters: Required<DataTableColumn['filters']> }
>

export type DataTableFilterValues<
  Configuration extends DataTableConfiguration = DataTableConfiguration,
> = {
  // TODO type for key in filter names and T values from config
  [key in Exclude<
    ConfiguredFilters<Configuration>['filters'],
    undefined
  >[number]['name']]: string[] | undefined
}

export type DataTableFilterSearchParams<
  Configuration extends DataTableConfiguration = DataTableConfiguration,
> = {
  // TODO type for key in filter names and T values from config
  [key in Exclude<
    ConfiguredFilters<Configuration>['filters'],
    undefined
  >[number]['name']]: string | undefined
}

type SortableColumn<Configuration extends DataTableConfiguration> = Extract<
  Configuration['columns'][number],
  { sortable: Required<DataTableColumn['sortInMemory']> }
>

export type DataTableSearchParams<
  Configuration extends DataTableConfiguration = DataTableConfiguration,
  FilterParams extends Record<string, unknown> = Record<string, unknown>,
> = {
  recherche?: string
  tri?: SortableColumn<Configuration>['name']
  ordre?: SortDirection
  page?: string // String as it is used in URL query params
  lignes?: string // Nombre de résultats par page // String as it is used in URL query params
} & DataTableFilterSearchParams<Configuration> &
  FilterParams
