import { proConnectProviderId } from '@app/web/auth/proConnect'
import {
  applyUserEmailReconciliation,
  getUserEmailReconciliation,
} from '@app/web/auth/reconcileUserEmail'
import { updateAccountTokens } from '@app/web/auth/updateAccountTokens'
import { updateUserEmailFromProvider } from '@app/web/auth/updateUserEmailFromProvider'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { prismaClient } from '@app/web/prismaClient'
import { registerLastLogin } from '@app/web/security/registerLastLogin'
import * as Sentry from '@sentry/nextjs'
import type { NextAuthConfig } from 'next-auth'

/**
 * v5 widens `user` to `AdapterUser | User`, makes `account` optional and adds `credentials`,
 * so we take the callback signature straight from the config instead of restating it.
 */
type SignInCallback = NonNullable<
  NonNullable<NextAuthConfig['callbacks']>['signIn']
>

export const signinCallback: SignInCallback = async ({
  account,
  profile,
  user,
  email,
}) => {
  const userEmail = user.email

  if (!userEmail) {
    // Our providers always return an email, this case is not expected
    return `/connexion?error=MissingProviderEmail`
  }

  const userId = user.id

  if (!userId) {
    // Our adapter always returns a persisted user, this case is not expected
    return `/connexion?error=MissingProviderUserId`
  }

  const existingUser = await prismaClient.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      role: true,
      firstName: true,
      emailVerified: true,
      lastName: true,
    },
  })

  /**
   * Basic users and moderators can sign in with email magic link
   * Admins and Support can only sign in with ProConnect
   */
  if (
    PublicWebAppConfig.isLocal ||
    PublicWebAppConfig.isMain ||
    PublicWebAppConfig.isDev
  ) {
    if (
      email &&
      existingUser &&
      !['User', 'Moderator'].includes(existingUser.role)
    ) {
      return `/connexion?error=ProConnectOnly`
    }
  }

  // Update account tokens if this is a ProConnect signin
  if (account?.provider === proConnectProviderId && account.access_token) {
    if (existingUser && profile) {
      const profileFirstName =
        'given_name' in profile ? (profile.given_name as string) : undefined
      const profileLastName =
        'usual_name' in profile ? (profile.usual_name as string) : undefined
      const profileName =
        'given_name' in profile && 'usual_name' in profile
          ? `${profile.given_name} ${profile.usual_name}`.trim()
          : undefined

      const shouldUpdateUserInfo =
        (profileFirstName && profileFirstName !== existingUser.firstName) ||
        (profileLastName && profileLastName !== existingUser.lastName) ||
        !existingUser.emailVerified

      if (shouldUpdateUserInfo) {
        await prismaClient.user.update({
          where: { id: existingUser.id },
          data: {
            firstName: profileFirstName || existingUser.firstName,
            lastName: profileLastName || existingUser.lastName,
            name:
              profileName ||
              `${profileFirstName || ''} ${profileLastName || ''}`.trim() ||
              undefined,
            emailVerified: new Date(),
            updated: new Date(),
          },
        })
      }
    }
    updateAccountTokens({
      userId,
      provider: proConnectProviderId,
      tokens: {
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_in: account.expires_at,
        id_token: account.id_token,
        scope: account.scope,
      },
    }).catch((error) => {
      Sentry.captureException(error)
    })
  }

  // User that should be reconciled can sign in
  const emailReconciliationResult = await getUserEmailReconciliation(userEmail)

  if (emailReconciliationResult) {
    await applyUserEmailReconciliation(emailReconciliationResult)
    return true
  }

  const isUserCreatedInDatabase =
    'created' in user &&
    !!user.created &&
    'updated' in user &&
    !!user.updated &&
    // we need to check that the user has signed up at least once (in case of an user been invited to join a base)
    'signedUpAt' in user &&
    !!user.signedUpAt

  // Manage signin for magic link
  if (account?.type !== 'oauth') {
    // If user has not already created account, he cannot sign in
    // We check this with existence of prisma fields
    if (isUserCreatedInDatabase) {
      // User exists, signin is ok
      registerLastLogin({ userId }).catch((error) => {
        Sentry.captureException(error)
      })
      return true
    }

    // Cannot login unregistered email user, redirect to account creation
    return `/creer-un-compte?raison=connexion-sans-compte&email=${
      user?.email ?? ''
    }`
  }

  await updateUserEmailFromProvider({ user, profile })
  registerLastLogin({ userId }).catch((error) => {
    Sentry.captureException(error)
  })
  return true
}
