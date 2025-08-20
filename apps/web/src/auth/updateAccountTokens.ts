import { prismaClient } from '@app/web/prismaClient'

const computeExpiresAt = (expiresIn?: number): number | undefined => {
  if (expiresIn === undefined) return undefined
  // If provider gave a timestamp in milliseconds
  if (expiresIn > 1_000_000_000_000) return Math.floor(expiresIn / 1000)
  // If provider gave an absolute epoch seconds timestamp
  if (expiresIn > 1_000_000_000) return Math.floor(expiresIn)
  // Otherwise it's a delta in seconds
  return Math.floor(Date.now() / 1000) + expiresIn
}

export const updateAccountTokens = async ({
  userId,
  provider,
  tokens,
}: {
  userId: string
  provider: string
  tokens: {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    id_token?: string
    scope?: string
  }
}) => {
  const expiresAt = computeExpiresAt(tokens.expires_in)

  await prismaClient.account.updateMany({
    where: {
      userId,
      provider,
    },
    data: {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
      id_token: tokens.id_token,
      scope: tokens.scope,
    },
  })
}
