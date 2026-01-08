export const getResourcesSearchBy = (searchTerm?: string) => {
  return searchTerm
    ? {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
          {
            excerpt: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
        ],
      }
    : {}
}
