import type {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

export const applyDataTableFilters = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>(
  searchParams: DataTableSearchParams<Configuration>,
  data: Data[],
  configuration: Configuration,
) => {
  const filterConfigurations = configuration.columns
    .map((column) => column.filters)
    .filter(isDefinedAndNotNull)
    .flat()

  const filterValues = {} as DataTableFilterValues<Configuration>
  for (const filter of filterConfigurations) {
    const name = filter.name as keyof DataTableSearchParams<Configuration>
    const queryValue = searchParams[name]

    if (queryValue) {
      filterValues[name] =
        typeof filter.fromQuery === 'function'
          ? filter.fromQuery(queryValue)
          : []
    }
  }

  let filteredData = data

  for (const filter of filterConfigurations) {
    const values = filterValues[filter.name as keyof typeof filterValues]
    if (!values || values.length === 0) {
      continue
    }

    const applyFilter = filter.applyInMemory
    if (typeof applyFilter === 'function') {
      filteredData = filteredData.filter((row) => applyFilter(row, values))
    }
  }

  return { filteredData, filterValues }
}
