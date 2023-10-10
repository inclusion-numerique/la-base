export const cleanSearchTerm = (query?: string | null) => {
  const trimmedSearch = query?.trim() ?? ''
  if (!trimmedSearch) {
    return null
  }
  return trimmedSearch
}
