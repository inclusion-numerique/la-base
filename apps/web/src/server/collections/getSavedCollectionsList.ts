import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  collectionSelect,
  computeCollectionsListWhereForUser,
} from '@app/web/server/collections/getCollectionsList'

export const getProfileSavedCollections = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) =>
  prismaClient.savedCollection.findMany({
    where: {
      base: null,
      savedById: profileId,
      collection: computeCollectionsListWhereForUser(user),
    },
    select: {
      id: true,
      saved: true,
      collection: { select: collectionSelect(user) },
    },
    orderBy: {
      saved: 'desc',
    },
  })
