import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import { basePageQuery } from '@app/web/server/bases/getBase'
import { notFound } from 'next/navigation'
import { cache } from 'react'

// Context is cached per request https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
export const getBasePageContext = cache(async (baseSlug: string) => {
  const user = await getSessionUser()
  const base = await basePageQuery(decodeURI(baseSlug), user)
  if (!base) {
    notFound()
  }

  const authorization = baseAuthorization(base, user)

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
})

export type BasePageContext = Awaited<ReturnType<typeof getBasePageContext>>
