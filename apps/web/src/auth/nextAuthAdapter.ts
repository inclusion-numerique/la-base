import { proConnectProviderId } from '@app/web/auth/proConnect'
import {
  applyUserEmailReconciliation,
  getUserEmailReconciliation,
} from '@app/web/auth/reconcileUserEmail'
import { prismaClient } from '@app/web/prismaClient'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Awaitable } from 'next-auth'
import type { Adapter, AdapterAccount, AdapterUser } from 'next-auth/adapters'
import { v4 } from 'uuid'

/**
 * Ensuring that needed methods are defined when creating adapter
 */
const createAdapter = (): Adapter & {
  createUser: Exclude<Adapter['createUser'], undefined>
  deleteSession: Exclude<Adapter['deleteSession'], undefined>
  linkAccount: (
    account: AdapterAccount,
  ) => Promise<void> | Awaitable<AdapterAccount | null | undefined>
} => {
  const prismaAdapter = PrismaAdapter(prismaClient)

  const { createUser, deleteSession, linkAccount } = prismaAdapter

  if (!createUser) throw new Error('prismaAdapter.createUser is undefined')
  if (!deleteSession)
    throw new Error('prismaAdapter.deleteSession is undefined')
  if (!linkAccount) throw new Error('prismaAdapter.linkAccount is undefined')

  return {
    ...prismaAdapter,
    createUser,
    deleteSession,
    linkAccount: linkAccount as (
      account: AdapterAccount,
    ) => Promise<void> | Awaitable<AdapterAccount | null | undefined>,
  }
}

const prismaAdapter = createAdapter()

// ⚠️ Keycloak returns non standard fields that are expected to be ignored by the client
const removeNonStandardFields = <T extends AdapterAccount>(data: T): T => ({
  ...data,
  refresh_expires_in: undefined,
  'not-before-policy': undefined,
})

export const nextAuthAdapter = {
  ...prismaAdapter,
  createUser: async (user: Omit<AdapterUser, 'id'>) => {
    const { provider, ...rest } = user as Omit<AdapterUser, 'id'> & {
      // We pass the provider along
      provider: typeof proConnectProviderId
    }

    const emailReconciliationResult = await getUserEmailReconciliation(
      rest.email,
    )
    // We update existing user if we have a reconciliation result
    if (emailReconciliationResult) {
      if (!prismaAdapter.updateUser) {
        throw new Error('updateUser method not found in prismaAdapter')
      }

      return applyUserEmailReconciliation(emailReconciliationResult)
    }

    const slug = await createAvailableSlug(rest.name || 'p', 'users')

    const info = { id: v4(), ...rest, slug }

    if (provider === proConnectProviderId) {
      return prismaAdapter.createUser({ ...info, emailVerified: new Date() })
    }
    return prismaAdapter.createUser(info)
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
  // Custom link account
  linkAccount: (account: AdapterAccount) =>
    prismaAdapter.linkAccount(removeNonStandardFields(account)),
} satisfies Adapter
