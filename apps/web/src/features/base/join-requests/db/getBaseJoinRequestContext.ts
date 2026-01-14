import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getUserBaseJoinRequestContext = async ({
  user,
  baseId,
}: {
  user: SessionUser | null
  baseId: string
}) => {
  if (!user) {
    return {
      isAlreadyMember: false,
      hasExistingJoinRequest: false,
      joinRequest: null,
    }
  }

  const [base, joinRequest] = await Promise.all([
    prismaClient.base.findUnique({
      where: { id: baseId },
      select: {
        members: {
          where: { accepted: { not: null } },
          select: {
            member: {
              select: { id: true },
            },
          },
        },
      },
    }),
    prismaClient.baseJoinRequest.findUnique({
      where: {
        applicantId_baseId: {
          applicantId: user.id,
          baseId,
        },
      },
      select: { id: true, accepted: true, declined: true, created: true },
    }),
  ])

  if (!base) {
    return {
      isAlreadyMember: false,
      hasExistingJoinRequest: false,
    }
  }

  const isAlreadyMember = base.members.some(
    ({ member }) => member.id === user.id,
  )
  const hasPendingJoinRequest =
    !!joinRequest &&
    joinRequest.accepted === null &&
    joinRequest.declined === null

  return {
    isAlreadyMember,
    hasPendingJoinRequest,
    joinRequest,
  }
}
