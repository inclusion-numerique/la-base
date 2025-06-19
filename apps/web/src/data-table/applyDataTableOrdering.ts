import type {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { compareMultiple } from '@app/web/utils/compareMultiple'

export const applyDataTableOrdering = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>(
  searchParams: DataTableSearchParams<Configuration>,
  data: Data[],
  configuration: Configuration,
) => {
  if (!searchParams.tri && !configuration.defaultSortableInMemory) {
    return data
  }
  const column = configuration.columns.find(
    (item) => item.name === searchParams.tri,
  )

  const orderMultiplier = searchParams.ordre === 'desc' ? -1 : 1

  return data.sort((a, b) => {
    // Default sorting if no column is specified
    if (
      (!searchParams.tri || column?.defaultSortable || !column?.sortInMemory) &&
      configuration.defaultSortableInMemory
    ) {
      return configuration.defaultSortableInMemory(a, b) * orderMultiplier
    }

    if (configuration.defaultSortableInMemory && column?.sortInMemory) {
      return (
        compareMultiple(
          column.sortInMemory(a, b),
          configuration.defaultSortableInMemory(a, b),
        ) * orderMultiplier
      )
    }

    if (column?.sortInMemory) {
      return column.sortInMemory(a, b) * orderMultiplier
    }

    throw new Error('No sorting function found')
  })
}
