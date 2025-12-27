import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/(autres)/membres/searchParams'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import { isShareToken } from '@app/web/features/base/share/utils/isShareToken'
import { resolveShareableLinkToken } from '@app/web/features/shareableLink/db/resolveShareableLinkToken'
import { basePageQuery } from '@app/web/server/bases/getBase'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { notFound } from 'next/navigation'
import { cache } from 'react'

// Context is cached per request https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
export const getBasePageContext = cache(
  async (
    baseSlug: string,
    membersSortBy?: BaseMembersSortType,
    paginationParams?: PaginationParams,
  ) => {
    const user = await getSessionUser()
    let base = await basePageQuery(decodeURI(baseSlug), user, membersSortBy, paginationParams)
    let isUsingShareToken = false

    if (isShareToken(baseSlug)) {
      const tokenResult = await resolveShareableLinkToken(baseSlug, 'base')
      if (!tokenResult || !tokenResult.base || !tokenResult) {
        notFound()
      }
      base = await basePageQuery(tokenResult.base.slug, user, membersSortBy, paginationParams)
      isUsingShareToken = true
    }

    if (!base) {
      notFound()
    }

    const authorization = baseAuthorization(base, user, isUsingShareToken)

    if (
      !authorization.hasPermission(BasePermissions.ReadGeneralBaseInformation)
    ) {
      notFound()
    }

    return {
      base,
      authorization,
      user,
    }
  },
)

export type BasePageContext = Awaited<ReturnType<typeof getBasePageContext>>
