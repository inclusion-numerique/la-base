import { getSessionUser } from '@app/web/auth/getSessionUser'
import { profileAuthorization } from '@app/web/authorization/models/profileAuthorization'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { notFound } from 'next/navigation'
import { cache } from 'react'

// Context is cached per request https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
export const getProfilePageContext = cache(async (profileSlug: string) => {
  const user = await getSessionUser()

  const profile = await getProfilePageQuery({ slug: decodeURI(profileSlug) })
  if (!profile) {
    notFound()
  }

  const authorization = profileAuthorization(profile, user)

  return {
    profile,
    authorization,
    user,
  }
})

export type ProfilePageContext = Awaited<
  ReturnType<typeof getProfilePageContext>
>
