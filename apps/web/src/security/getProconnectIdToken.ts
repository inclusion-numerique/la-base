import { proConnectProviderId } from '@app/web/auth/proConnect'
import { prismaClient } from '@app/web/prismaClient'
import type { SessionUser } from '@app/web/auth/sessionUser'

export const getProconnectIdToken = ({
  id,
}: Pick<SessionUser, 'id'>): Promise<string | null> =>
  prismaClient.account
    .findFirst({
      where: {
        userId: id,
        provider: proConnectProviderId,
        id_token: { not: null },
      },
      select: {
        id_token: true,
      },
    })
    .then((result) => result?.id_token ?? null)
