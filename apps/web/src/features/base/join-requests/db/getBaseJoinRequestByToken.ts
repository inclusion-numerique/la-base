import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export type BaseJoinRequestByToken = NonNullable<
  Awaited<ReturnType<typeof getBaseJoinRequestByToken>>
>

export const getBaseJoinRequestByToken = async (
  token: string,
  user: SessionUser | null,
) => {
  const joinRequest = await prismaClient.baseJoinRequest.findUnique({
    where: { id: token },
    select: {
      id: true,
      accepted: true,
      declined: true,
      created: true,
      applicant: {
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
      base: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          image: true,
          isPublic: true,
          members: {
            where: {
              isAdmin: true,
            },
            select: {
              member: {
                select: {
                  id: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!joinRequest) {
    return null
  }

  // Check if the current user is an admin of the base
  const isAdmin = user
    ? joinRequest.base.members.some((member) => member.member.id === user.id)
    : false

  return {
    ...joinRequest,
    isCurrentUserAdmin: isAdmin,
  }
}
