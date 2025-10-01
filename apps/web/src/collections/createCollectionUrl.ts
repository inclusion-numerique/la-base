export const createCollectionUrl = ({
  baseId,
}: {
  baseId?: string | null
} = {}) => (baseId ? `/collections/creer?base=${baseId}` : '/collections/creer')
