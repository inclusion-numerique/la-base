export const managerCollectionUrl = ({
  baseSlug,
}: { baseSlug?: string | null } = {}) =>
  baseSlug
    ? `/collections/gerer-mes-collections?base=${baseSlug}`
    : '/collections/gerer-mes-collections'
