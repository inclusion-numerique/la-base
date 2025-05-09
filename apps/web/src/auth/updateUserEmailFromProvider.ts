import { prismaClient } from '@app/web/prismaClient'
import type { Profile, User } from 'next-auth'
import type { AdapterUser } from 'next-auth/adapters'

/**
 * If user has changed email address in the provider, we need to update the user
 * No op if user has not changed email address in the provider
 */
export const updateUserEmailFromProvider: <
  U extends User | AdapterUser,
  P extends Profile = Profile,
>(params: {
  user: U
  /**
   * If OAuth provider is used, it contains the full
   * OAuth profile returned by your provider.
   */
  profile?: P
}) => Promise<U> = async ({ profile, user }) => {
  // If user has changed email address in the provider, we need to update the user
  const providerEmail = profile?.email
  const userId = user.id

  if (
    !('created' in user) ||
    !providerEmail ||
    !userId ||
    user.email === providerEmail // unchanged
  ) {
    // No op
    return user
  }

  // Update user email with provider email
  await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      email: providerEmail,
      updated: new Date(),
    },
  })

  return {
    ...user,
    email: providerEmail,
  }
}
