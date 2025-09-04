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
import type { Account, Profile, User } from 'next-auth'

export const signinCallback: <
  P extends Profile = Profile,
  A extends Account = Account,
>(params: {
  user: User
  account: A | null
  /**
   * If OAuth provider is used, it contains the full
   * OAuth profile returned by your provider.
   */
  profile?: P
  /**
   * If Email provider is used, on the first call, it contains a
   * `verificationRequest: true` property to indicate it is being triggered in the verification request flow.
   * When the callback is invoked after a user has clicked on a sign in link,
   * this property will not be present. You can check for the `verificationRequest` property
   * to avoid sending emails to addresses or domains on a blocklist or to only explicitly generate them
   * for email address in an allow list.
   */
  email?: {
    verificationRequest?: boolean
  }
}) => Promise<string | boolean> = async ({ account, profile, user, email }) => {
  const userEmail = user.email

  if (!userEmail) {
    // Our providers always return an email, this case is not expected
    return `/connexion?error=MissingProviderEmail`
  }

  /**
   * Only basic users can sign in with email magic link
   * Admins can sign in with ProConnect
   * Support can sign in with ProConnect
   */
  if (
    PublicWebAppConfig.isLocal ||
    PublicWebAppConfig.isMain ||
    PublicWebAppConfig.isDev
  ) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        role: true,
      },
    })

    if (!!email && existingUser && existingUser.role !== 'User') {
      return `/connexion?error=ProConnectOnly`
    }
  }

  // Update account tokens if this is a ProConnect signin
  if (account?.provider === proConnectProviderId && account.access_token) {
    updateAccountTokens({
      userId: user.id,
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
      registerLastLogin({ userId: user.id }).catch((error) => {
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

  return true
}
