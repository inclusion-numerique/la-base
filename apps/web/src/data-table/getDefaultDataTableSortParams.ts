import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

export const getDataTableSortParams = <
  Configuration extends DataTableConfiguration,
>(
  searchParams: DataTableSearchParams<Configuration>,
  configuration: Configuration,
): {
  sortBy: Configuration['columns'][number]['name']
  sortDirection: 'asc' | 'desc'
} => {
  const column =
    configuration.columns.find((item) => item.name === searchParams.tri) ??
    configuration.columns.find((item) => item.defaultSortable)

  if (!column) {
    throw new Error('No sortable column found in DataTable configuration')
  }

  return {
    sortBy: column.name,
    sortDirection:
      searchParams.ordre ?? column.defaultSortableDirection ?? ('asc' as const),
  }
}
