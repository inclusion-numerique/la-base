import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { Prisma } from '@prisma/client'

export const getResourcesOrderBy = (
  sortType?: PaginationParams['sort'],
): Prisma.ResourceOrderByWithRelationInput[] => {
  switch (sortType) {
    case 'recent':
      return [{ lastPublished: 'desc' }, { updated: 'desc' }]
    case 'ancien':
      return [{ lastPublished: 'asc' }, { updated: 'asc' }]
    case 'vues':
      return [
        { viewsCount: 'desc' },
        { lastPublished: 'desc' },
        { updated: 'desc' },
      ]
    case 'enregistrements':
      return [
        { collections: { _count: 'desc' } },
        { lastPublished: 'desc' },
        { updated: 'desc' },
      ]
    case 'recommandations':
      return [
        { resourceFeedback: { _count: 'desc' } },
        { lastPublished: 'desc' },
        { updated: 'desc' },
      ]
    default:
      return [{ lastPublished: 'desc' }, { updated: 'desc' }]
  }
}
