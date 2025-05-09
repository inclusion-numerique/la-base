import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import type { TargetAudience, Theme } from '@prisma/client'

export const searchResultThemeHref = (...themes: Theme[]) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    themes,
  })

export const searchResultTargetAudienceHref = (
  targetAudience: TargetAudience,
) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    targetAudiences: [targetAudience],
  })
