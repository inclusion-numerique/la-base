import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'

// Dedupe based on base.id
export const getBasesFromSessionUser = (user: SessionUser) =>
  [...user.ownedBases, ...user.bases.map(({ base }) => base)].reduce(
    (accumulator, base) => {
      if (accumulator.some((b) => b.id === base.id)) {
        return accumulator
      }
      return [...accumulator, base]
    },
    [] as SessionUserBase[],
  )
