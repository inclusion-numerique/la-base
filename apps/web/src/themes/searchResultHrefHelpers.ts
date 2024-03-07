import { TargetAudience, Theme } from '@prisma/client'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'

export const searchResultThemeHref = (theme: Theme) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    themes: [theme],
  })

export const searchResultTargetAudienceHref = (
  targetAudience: TargetAudience,
) =>
  searchUrl('ressources', {
    ...defaultSearchParams,
    targetAudiences: [targetAudience],
  })
