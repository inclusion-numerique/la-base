import { SessionUser } from '@app/web/auth/sessionUser'
import {
  getResourcesCount,
  getResourcesList,
} from '../resources/getResourcesList'
import { getBases, getBasesCount } from '../bases/getBasesList'
import { getProfiles, getProfilesCount } from '../profiles/getProfilesList'

const LIMIT = 3

export const quicksearch = async (query: string, user: SessionUser | null) => {
  const [
    resources,
    bases,
    profiles,
    resourcesCount,
    basesCount,
    profilesCount,
  ] = await Promise.all([
    getResourcesList({ take: LIMIT, user, query }),
    getBases({ take: LIMIT, user, query }),
    getProfiles({ take: LIMIT, user, query }),
    getResourcesCount({ user, query }),
    getBasesCount({ user, query }),
    getProfilesCount({ user, query }),
  ])

  return {
    resources,
    bases,
    profiles,
    resourcesCount,
    basesCount,
    profilesCount,
  }
}

export type QuickSearchResults = Awaited<ReturnType<typeof quicksearch>>
