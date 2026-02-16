import { prismaClient } from '@app/web/prismaClient'
import { invalidError } from '@app/web/server/rpc/trpcErrors'

export const updateShareableLinkAccessCount = async (id: string) => {
  const shareableLink = await prismaClient.shareableLink.findUnique({
    where: { id },
  })

  if (!shareableLink) {
    throw invalidError('Shareable link not found')
  }

  return prismaClient.shareableLink.update({
    where: { id },
    data: { accessCount: { increment: 1 } },
  })
}
