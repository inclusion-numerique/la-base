import { SessionUser } from '@app/web/auth/sessionUser'

/**
 * To minimized mapping code we use the prisma schema for base and profile query selection
 * We join their follow but only where the connected user is a follower
 * This leads to a structure with an array of 1 or 0 follows for the connected user
 * This helper is here to help use this unpractical structure
 *
 * See baseSelect & profileSelect for more info on implementation of the queries
 */
export const isFollowedBy = (
  { followedBy }: { followedBy: { id: string }[] },
  user: Pick<SessionUser, 'id'> | null,
) => !!user && followedBy.length > 0
