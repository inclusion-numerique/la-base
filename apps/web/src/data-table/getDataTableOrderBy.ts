import {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

export const getDataTableOrderBy = <
  OrderBy extends Record<string, unknown> = Record<string, unknown>,
  Configuration extends DataTableConfiguration<
    DataTableRow,
    Record<string, unknown>,
    OrderBy
  > = DataTableConfiguration<DataTableRow, Record<string, unknown>, OrderBy>,
>(
  searchParams: DataTableSearchParams<Configuration>,
  configuration: Configuration,
): OrderBy[] => {
  const direction = searchParams.ordre ?? 'asc'

  // Applying default order by
  if (!searchParams.tri) {
    const defaultOrderByColumn = configuration.columns.find(
      (column) => column.defaultSortable && column.orderBy,
    )?.orderBy
    if (!defaultOrderByColumn) {
      return []
    }

    return defaultOrderByColumn(direction)
  }
  const column = configuration.columns.find(
    (item) => item.name === searchParams.tri,
  )

  return column?.orderBy ? column.orderBy(direction) : []
}

export const getDataTableRawOrderBy = <
  OrderBy extends Record<string, unknown> = Record<string, unknown>,
  Configuration extends DataTableConfiguration<
    DataTableRow,
    Record<string, unknown>,
    OrderBy
  > = DataTableConfiguration<DataTableRow, Record<string, unknown>, OrderBy>,
>(
  searchParams: DataTableSearchParams<Configuration>,
  configuration: Configuration,
): OrderBy[] => {
  const direction = searchParams.ordre ?? 'asc'

  // Applying default order by
  if (!searchParams.tri) {
    const defaultOrderByColumn = configuration.columns.find(
      (column) => column.defaultSortable && column.orderBy,
    )?.orderBy
    if (!defaultOrderByColumn) {
      return []
    }

    return defaultOrderByColumn(direction)
  }
  const column = configuration.columns.find(
    (item) => item.name === searchParams.tri,
  )

  return column?.orderBy ? column.orderBy(direction) : []
}
