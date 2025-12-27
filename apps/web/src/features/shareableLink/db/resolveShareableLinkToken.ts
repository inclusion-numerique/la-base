import { prismaClient } from '@app/web/prismaClient'

export const resolveShareableLinkToken = async (
  token: string,
  type: 'base' | 'resource',
) => {
  try {
    const shareableLink = await prismaClient.shareableLink.findFirst({
      where: {
        id: token,
        enabled: true,
      },
      select: {
        id: true,
        base: {
          select: {
            id: true,
            slug: true,
          },
        },
        resource: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    })

    return shareableLink
  } catch {
    return null
  }
}
