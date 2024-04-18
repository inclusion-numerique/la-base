import { TargetAudience, Theme } from '@prisma/client'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'

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
