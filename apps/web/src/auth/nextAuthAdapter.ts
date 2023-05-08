import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prismaClient } from '@app/web/prismaClient'
import type { Adapter, AdapterUser } from 'next-auth/adapters'
import { inclusionConnectProviderId } from '@app/web/auth/inclusionConnect'

const prismaAdapter = PrismaAdapter(prismaClient)

// ⚠️ Keycloak returns non standard fields that are expected to be ignored by the client
const removeNonStandardFields = <T extends Record<string, unknown>>(
  data: T,
): T => ({
  ...data,
  refresh_expires_in: undefined,
  'not-before-policy': undefined,
})

export const nextAuthAdapter: Adapter = {
  ...prismaAdapter,
  createUser: async (user) => {
    const { provider, ...rest } = user as Omit<AdapterUser, 'id'> & {
      // We pass the provider along from Keycloak provider to be able to detect if the user comes from Inclusion Connect
      provider?: typeof inclusionConnectProviderId
    }
    if (provider === inclusionConnectProviderId) {
      return prismaAdapter.createUser({ ...rest, emailVerified: new Date() })
    }
    return prismaAdapter.createUser(rest)
  },
  // Better handle case of missing session when deleting. It should not crash auth process.
  deleteSession: async (sessionToken) => {
    try {
      await prismaAdapter.deleteSession(sessionToken)
    } catch (error) {
      // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
      if (
        !!error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        // Ok, the session was already destroyed by another process
        return
      }
      throw error
    }
  },
  // Custom link acount
  linkAccount: (account) =>
    prismaAdapter.linkAccount(removeNonStandardFields(account)),
}
