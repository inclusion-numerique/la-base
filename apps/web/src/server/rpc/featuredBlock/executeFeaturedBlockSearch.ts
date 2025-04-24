import { SessionUser } from '@app/web/auth/sessionUser'
import { quickSearchBases } from '@app/web/server/bases/searchBases'
import { quickSearchProfiles } from '@app/web/server/profiles/searchProfiles'
import { quickSearchResources } from '@app/web/server/resources/searchResources'

export const executeQuickSearch = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const [resources, bases, profiles] = await Promise.all([
    quickSearchResources(query, user),
    quickSearchBases(query, user),
    quickSearchProfiles(query, user),
  ])

  return {
    resources,
    bases,
    profiles,
  }
}
