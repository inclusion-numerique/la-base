import type {
  DataTableConfiguration,
  DataTableRow,
} from '@app/web/data-table/DataTableConfiguration'

const normalizeSearchString = (searchQuery: string) =>
  searchQuery
    .normalize('NFD')
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: this works 🤷
    .replaceAll(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .trim()

export const getSearchTokens = (searchQuery?: string) =>
  searchQuery?.trim()
    ? normalizeSearchString(searchQuery)
        .split(' ')
        .map((token) => token.toLowerCase().trim())
        .filter(Boolean)
    : undefined

export const applyDataTableSearch = <Data extends DataTableRow>(
  search: string | undefined,
  data: Data[],
  configuration: DataTableConfiguration<Data>,
) => {
  const toSearchableString = configuration.rowInMemorySearchableString

  if (!toSearchableString || !search?.trim()) {
    return data
  }

  const searchTokens = getSearchTokens(search)
  if (!searchTokens || searchTokens.length === 0) {
    return data
  }

  return data.filter((row) => {
    const searchableString =
      normalizeSearchString(toSearchableString(row)) ?? ''

    return searchTokens.some((token) => searchableString.includes(token))
  })
}
