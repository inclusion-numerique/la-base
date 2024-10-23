import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

export type CreateDataTableHrefParams<
  Configuration extends DataTableConfiguration = DataTableConfiguration,
> = {
  baseHref: string
  searchParams: DataTableSearchParams<Configuration>
}

export const createDataTableHref = <
  Configuration extends DataTableConfiguration = DataTableConfiguration,
>({
  baseHref,
  searchParams,
}: CreateDataTableHrefParams<Configuration>) =>
  `${baseHref}?${new URLSearchParams(searchParams as Record<string, string>).toString()}`
