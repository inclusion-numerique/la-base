export const toQueryParts = ({ recherche }: { recherche?: string }) =>
  recherche?.split(' ') ?? []
