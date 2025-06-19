import type { DataTableConfiguration } from '@app/web/data-table/DataTableConfiguration'
import { stringify } from 'csv-stringify/sync'

export const generateDataTableCsv = <Data>({
  configuration,
  rows,
}: {
  rows: Data[]
  configuration: DataTableConfiguration<Data>
}) => {
  const csvHeaders = configuration.columns
    .filter((column) => column.header !== null)
    .flatMap((column) => column.csvHeaders ?? [column.header as string])

  const csvRows = rows.map((row) =>
    configuration.columns.flatMap((column) => {
      if (column.csvValues) {
        return column.csvValues(row)
      }
      return []
    }),
  )

  const csvContent = stringify([csvHeaders, ...csvRows], {
    delimiter: ';',
    bom: true,
  })

  return csvContent
}
